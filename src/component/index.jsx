import React, { useCallback, useRef, useState } from 'react';
import axios from "axios";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import '../index.css';

const initialNodes = [
  {
    id: '0',
    type: 'input',
    data: { label: 'send mail' },
    position: { x: 0, y: 50 },
  },
];

let id = 1;
const getId = () => `${id++}`;

export const AddNodeOnEdgeDrop = () => {
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [modalVisible, setModalVisible] = useState(false);
  const [newNodeData, setNewNodeData] = useState({ To: '', Subject: '', body: '', afterTime: '' });
  const [newNodePosition, setNewNodePosition] = useState({ x: 0, y: 0 });

  const onConnect = useCallback(
    (params) => {
      // reset the start node on connections
      connectingNodeId.current = null;
      setEdges((eds) => addEdge(params, eds));
    },
    [],
  );

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      if (!connectingNodeId.current) return;

      const targetIsPane = event.target.classList.contains('react-flow__pane');

      if (targetIsPane) {
        // Show the modal form to get the new node data
        setNewNodePosition(screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        }));
        setModalVisible(true);
      }
    },
    [screenToFlowPosition],
  );

  const handleModalSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://backendsalesblink.onrender.com/api/emails/sendemail", {
        to: newNodeData.To,
        subject: newNodeData.Subject,
        text: newNodeData.body,
        time: parseInt(newNodeData.afterTime)
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const id = getId();
      console.log(res);

      const newNode = {
        id,
        position: newNodePosition,
        data: { label: `Email send after ${newNodeData.afterTime} minute(s)` },
        origin: [0.5, 0.0],
      };

      setNodes((nds) => nds.concat(newNode));
      setEdges((eds) =>
        eds.concat({ id, source: connectingNodeId.current, target: id }),
      );

      // Reset modal state
      setNewNodeData({ To: '', Subject: '', body: '', afterTime: '' });
      setModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ height: 500 }} className='bg-red' ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        fitView
        fitViewOptions={{ padding: 2 }}
        nodeOrigin={[0.5, 0]}
      />

      {modalVisible && (
        <div className="">
          <form onSubmit={handleModalSubmit} >
            <div className='block'>
            <label className='mx-2 mt-2   text-lg font-semibold'>
              To:
              <input
              className='border-2  border-gray-500 rounded-md mt-2 mx-2'
                type="text"
                value={newNodeData.To}
                onChange={(e) =>
                  setNewNodeData((prevData) => ({ ...prevData, To: e.target.value }))
                }
                required
              />
            </label>
            <label className='mx-2 mt-2  text-lg font-semibold'>
              Subject:
              <input
              className='border-2 mx-2 mt-2 border-gray-500 rounded-md '
                type="text"
                value={newNodeData.Subject}
                onChange={(e) => 
                  setNewNodeData((prevData) => ({ ...prevData, Subject: e.target.value }))
                }
                required
              />
            </label>
            </div>
            <div><label className='mx-2  text-lg font-semibold'>
              Body:
              <input
              className='border-2 mx-2  border-gray-500 rounded-md '
                type="text"
                value={newNodeData.body}
                onChange={(e) =>
                  setNewNodeData((prevData) => ({ ...prevData, body: e.target.value }))
                }
                required
              />
            </label>
            <label className='mx-2 mt-2  text-lg font-semibold'>
              After Time:
              <input
              className='border-2 mx-2 mt-2  border-gray-500 rounded-md'
                type="text"
                value={newNodeData.afterTime}
                onChange={(e) =>
                  setNewNodeData((prevData) => ({ ...prevData, afterTime: e.target.value }))
                }
                required
              />
            </label></div>
            <button className='border-2 bg-gray-500 w-24 rounded-lg mt-2' type="submit">Add Node</button>
          </form>
        </div>
      )}
    </div>
  );
};

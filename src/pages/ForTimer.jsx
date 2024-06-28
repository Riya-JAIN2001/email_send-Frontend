import React from 'react'
import { ReactFlowProvider } from 'reactflow'
import { AddNodeOnEdgeDrop } from '../component/index'
const ForTimer = () => {
  return (
    <>
    <div >
    <ReactFlowProvider >
      
      <AddNodeOnEdgeDrop />
          </ReactFlowProvider>
   
    </div>
    </>
  )
}

export default ForTimer
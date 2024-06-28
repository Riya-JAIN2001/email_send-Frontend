

import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import  Signup  from './pages/Register'
import  Signin  from './pages/Login'
import ForTimer from './pages/ForTimer'
import Imediate from './pages/Imediate'
import SendEmail from './pages/SendEmail'
function App() {
  

  return (
    <>
    {/* <ReactFlowProvider >
      
<AddNodeOnEdgeDrop />
    </ReactFlowProvider> */}
    <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/sendEmail" element={<SendEmail/>} />
       
          <Route path="/immediate" element={<Imediate />} />
          <Route path="/after" element={<ForTimer />} />
          </Routes>
          </BrowserRouter>
      
    </>
  )
}

export default App

import React from 'react'
import { useNavigate } from 'react-router-dom';

const Strting = () => {
    const navigate= useNavigate()
    
  return (
    <>
    <div className="flex justify-center bg-black text-white  items-center   h-screen">
        <div className="lg:w-64" >
            
        
        
        
        <h1>Hello, User</h1>
        
       
        
        <div className="mt-6">
        <button onClick={()=>navigate("/signup")} type="button" className="text-black w-full bg-gradient-to-br bg-white hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">SignUp</button>

        </div>
        <div className="mt-6">
        <button onClick={()=>navigate("/signin")} type="button" className="text-black w-full bg-gradient-to-br bg-white hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">SignIn</button>

        </div>
        </div>
       
        
    </div>
    </>
  )
}

export default Strting
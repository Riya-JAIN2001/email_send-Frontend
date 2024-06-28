import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Imediate = () => {
    const navigate=useNavigate()
    const [to, setTo]=useState("")
    const [subject, setSubject]=useState("")
    const [body, setBody]=useState("")
    const buttonHandler=async(e)=>{
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/api/emails/sendemail", {
              to: to,
              subject: subject,
              text: body,
              time: 0
            },
            {
              headers: {
                'Content-Type': 'application/json'
              }
            });
      
        alert("email sent")
        navigate("/sendEmail")
        }
        catch(error){
            console.log(error)
            alert("ther is some error")
            navigate("/sendEmail")

        }}
  return (
    <>
    <div className="flex justify-center bg-black text-white  items-center   h-screen">
        <div className="lg:w-64" >
            
        
        
        
        <h1>Send Email</h1>
        <div className="mt-3">
            

  <label htmlFor="to" className="block mb-2  font-medium text-white">
   To:
    </label>
  <input type="text"  onChange={(e)=>setTo(e.target.value)} aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-500 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="sending email"/>

  


        </div>
        <div className="mt-3">
            

            <label htmlFor="subject" className="block mb-2  font-medium text-white">
             Subject:
              </label>
            <input type="text"  onChange={(e)=>setSubject(e.target.value)} aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-500 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="subject"/>
          
            
          
          
                  </div>
                  <div className="mt-3">
            

            <label htmlFor="body" className="block mb-2  font-medium text-white">
             body:
              </label>
<textarea name="body" id="" className='bg-gray-50 border border-gray-500 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'  rows="3" cols="30" onChange={(e)=>setBody(e.target.value)}></textarea>          
            
          
          
                  </div>
                          
        
        <div className="mt-6">
        <button onClick={buttonHandler} type="button" className="text-black w-full bg-gradient-to-br bg-slate-500 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Send Immidately</button>

        </div>
        
        </div>
        </div>
       
        
    
    </>
  )
}

export default Imediate
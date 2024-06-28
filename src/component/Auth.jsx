
import axios from "axios";
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"



function Auth ({type})  {
    
    const navigate= useNavigate()
    const [postInputs, setPostInputs]=useState({
           
            email:"",
            password:""
         })
    async function buttonHandler(){
        try{
           
            const res= await axios.post(`http://localhost:8000/api/users/${type}`,postInputs);
            const jwt=res.data.token
            
            localStorage.setItem("token", jwt)
            
            navigate("/sendEmail")
        }catch(e){
            console.log(e)
            navigate("/sendEmail")
        }
        
    }
  return (
    <div className="flex justify-center bg-black text-white  items-center   h-screen">
        <div className="lg:w-64" >
            <div>
            <h1 className="text-3xl font-medium">
           { type==="signup"?"Create ":"Login " }An User
        </h1>
        <p className="text-sm text-gray-500">{type==="signup"?"Already ": "Don't "}have an account {type==="signup"?<Link to="/signin" className="underline">Login</Link>:<Link className="underline" to="/signup">register</Link> }</p>
            </div>
        
        
        <div>
        <LabeledInputblock label="Email" type="text" id ="email" placeholder="Enter the email" onchange={(e)=>{
            setPostInputs({
                ...postInputs,
                email:e.target.value
            })
        }} />
        </div>
        
        
        <div>
        <LabeledInputblock label="Password" type="password" id ="password" placeholder="Enter the password" onchange={(e)=>{
            setPostInputs({
                ...postInputs,
                password:e.target.value
            })
        }} /></div>
        
        <div className="mt-6">
        <button onClick={buttonHandler} type="button" className="text-black w-full bg-gradient-to-br bg-white hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">{type==="signin"?"SignIn":"SignUp"}</button>

        </div>
        </div>
       
        
    </div>
  )
}


function LabeledInputblock({label,type,id,onchange,placeholder}){
    return (
        <div className="mt-3">
            

  <label htmlFor={id} className="block mb-2  font-medium text-white">
    {label}
    </label>
  <input type={type} id={id} onChange={onchange} aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-500 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder}/>

  


        </div>
    )
}

export default Auth
import axios from "axios"
import { useState } from "react"
import { Navigate } from "react-router-dom"

function ParentSignIn(){
    const [username,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const submitHandler = (e) =>{
        e.preventDefault()
        axios.post('http://localhost:8080/ParentSignIn',{username: username, password:password}).then((data)=>{
            if(data.data.length!=0&&data.data[0].email==username){
                window.localStorage.setItem("user",username)
                window.localStorage.setItem("name", data.data[0].first_name+' '+data.data[0].last_name)
                window.localStorage.setItem("uType","parent")
                setPassword('')
                setUserName('')
            }
        })
    }
    return(
        <div>
            <form onSubmit={submitHandler} className='mx-auto border-2 p-9 md:p-12 w-72 md:w-92 border-sky-700 mt-36 h-84 bg-indigo-50'>
                <h3 className="color bg-sage-300 text-2xl pb-5">Parent Sign In</h3>
                <label className="text-xl mb-1">Username</label>
                <input type="text" onChange={(e)=>setUserName(e.target.value)} value={username}></input>
                <label className="text-xl mb-2">Password</label>
                <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password}></input>
                <div>
                    <button type='submit' className="rounded bg-neutral-50 mt-2 text-sm w-20 h-5"> Submit</button>
                </div>
                {window.localStorage.getItem("uType")=="parent" && <Navigate to="/ViewChild" replace = {true}/>}
            </form>
        </div>
    )
}
export default ParentSignIn
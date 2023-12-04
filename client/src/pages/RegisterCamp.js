import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"

function RegisterCamp(){
    const parentid=window.localStorage.getItem('id')
    const [camps,setCamps] = useState([])
    const [getChild,setChildren] = useState([])
    const [registerCamp,setCamp] = useState({
        child_id:'',
        camp_id:''
    })
    const handleRegistriation =(e)=>{
        axios.post('http://localhost:8080/getCamps',{registerCamp}).then((data)=>{
            console.log(data)
        }
        )
    }
    useEffect(()=>{
        const fetchData = async() =>{
            try{
                const data= await axios('http://localhost:8080/getCamps')
                setCamps(data.data)
            }
            catch(error){
                console.log(error)
            }
        const fetchChild = async() =>{
            try{
                const data = await axios('http://localhost:8080/getChildren')
                setChildren(data.data)
            }catch(error){
                console.log(error)
            }
        }
        fetchData()
        fetchChild()
        }
    },[])
    useEffect(()=>{},[])
    return(
        <>
        <h1 className="text-2xl text-center">Camp Registeration</h1>
        <div className="container mx-auto md:p8 mt-36 border-2 p-9 space-x-3">
            {window.localStorage.getItem("uType")!="parent"&&<Navigate to='/ViewParticipants'/>}
            <select onChange={(e)=>setCamp({...registerCamp,child_id:e.target.id})} className="w-1/3 p-1 border-2 rounded">
                {getChild.map((child)=>{
                    return <option id={child.id} value={child.first_name}>{child.first_name+' '+child.last_name}</option>
                })}
            </select>
            <select onChange={(e)=>setCamp({...registerCamp,camp_id:e.target.id})} className="w-1/3 p-1 border-2 rounded">
                {camps.map((camp)=>{
                    return <option id={camp.camp_id} value={camp.camp_name}>{camp.camp_name}</option>
                })}
            </select>
            <button type="submit" onClick={handleRegistriation} className="inline-flex w-1/4 justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Register</button>
        </div>
        </>
    )
}

export default RegisterCamp

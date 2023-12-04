import axios from "axios";
import { useEffect, useState } from "react";

function ViewStaff(){
    const[campList, setCampList] = useState([])
    useEffect(()=>{
        const fetchData = async(campID) =>{
        try{
                const response = await axios.get('http://localhost:8080/viewCamps',{params:{
                    id:campID
                }})
                setCampList(response.data)
        }
        catch(error){
            console.log(error)
        }
        fetchData()
    }
    },[])
    const[campSelection, setCampSelection] = useState('Select')
    const handleCampSelection = (e) =>{
        setCampSelection(e.target.value)
        console.log(e.target.value)
    }
    const[employees,setEmployees] = useState([])
    useEffect(()=>{
        const fetchData = async() =>{
            try{
                const response = await axios.get('http://localhost:8080/allEmployees')
                setEmployees(response.data)
            }catch(error){
                console.log(error)
            }
        }
        fetchData()
    },[])
    return(
        // <>
        // <select onChange={e=>handleCampSelection(e)}>
        //     {campSelection=='Select'&&<option>Select</option>}
        //     {campList.map((camp)=>{
        //         return <option id={camp.id} value={camp.name}>{camp.name}</option>
        //     })}
        // </select>
        // </>
        <table className='table table-fixed w-full mt-3 border-seperate border border-spacing-2 mx-3'>
        <thead>
            <tr className='flex space-x-4 border border-spacing-2'>
                <th className='w-1/6 text-center'>First Name</th>
                <th className='w-1/6 text-center'>Last Name</th>
                <th className='w-1/6 text-center'>Phone</th>
                <th className='w-1/6 text-center'>Email</th>
                <th className='w-1/6 text-center'>Position</th>
            </tr>
        </thead>
        <tbody>
            {employees.map((employee)=>{
                return <tr className='flex space-x-4 border border-spcaing-2'>
                    <td className='w-1/6 text-center'>{employee.first_name}</td>
                    <td className='w-1/6 text-center'>{employee.last_name}</td>
                    <td className='w-1/6 text-center'>{employee.phone}</td>
                    <td className='w-1/6 text-center'>{employee.email}</td>
                    <td className='w-1/12 text-center'>{employee.position_id}</td>
                </tr>
            })}
        </tbody>
    </table>
    )
}

export default ViewStaff;
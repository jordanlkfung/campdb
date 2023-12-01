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
    return(
        <>
        <select onChange={handleCampSelection(e)}>
            {campSelection=='Select'&&<option>Select</option>}
            {campList.map((camp)=>{
                return <option id={camp.id} value={camp.name}>{camp.name}</option>
            })}
        </select>
        </>
    )
}

export default ViewStaff;
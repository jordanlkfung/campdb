import { useState } from "react"
import axios from "axios"
function AddChild(){
    const [formData,setFormData] = useState({
        first_name:'',
        last_name:'',
        age:''


})
    const sumbitHandler = (e) =>{
        e.preventDefault()
        axios.post('http://localhost:8080/AddChild',{formData}).then((data)=>{

        })
    }
    const handleChange = (e)=>{
        setFormData({ ...formData,
        [e.target.name]:e.target.value})
    }
    return(
    <div className="mx-auto border-2 md:p-12 mt-20 p-9 ml">
        <form onSubmit={sumbitHandler} className="space-x-3 justifiy-center items-center">
            <label>First Name</label>
            <input type='text' name ='first_name' value={formData.first_name} onChange={handleChange} className="border-2 rounded"></input>
            <label>Last Name</label>
            <input type='text' name ='last_name' value={formData.last_name} onChange={handleChange} className="border-2 rounded"></input>
            {/* <label>DOB</label>
            <input type='date' name ='dob' value={formData.dob} onChange={(e)=>{
                setFormData({...formData, dob: new Date(e.target.value)})
            }}></input> */}
            <label>Age</label>
            <input type='number' name='age' onChange={handleChange} className="border-2 rounded"></input>
            <button type="submit" className="rounded bg-indigo-100 w-20">Submit</button>
        </form>
    </div>
    )
}
export default AddChild
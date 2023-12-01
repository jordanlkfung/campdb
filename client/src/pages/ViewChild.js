import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";

function ViewChild(){
    const [getData,setData] = useState([])
    useEffect(()=>{
        const fetchData = async() =>{
            try{
                    const response = await axios.get('http://localhost:8080/viewChildCamps',{params:{id:window.localStorage.getItem('user')}})
                    setData(response.data)
                    console.log(response)
                }
            catch(error){
                console.log(error)
            }
    }
    fetchData()
},[])
    
    return(
        <div>
            {window.localStorage.getItem('uType')!=='parent' && <Navigate to='/ViewParticipants' replace={true}/>}
            {getData.length!==0 ?
            <table className="table-auto">
                <thead>
                    <tr className="flex space-x-4">
                        <th>First Name</th>
                        <th>Last Name</th>
                        {/* <th>Age</th> */}
                        <th>Camp Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                    </tr>
                </thead>
                <tbody>
                    {getData.map((child)=>{
                          const parsedDate = new Date(child.start_date);

                          // Format the date as MM/DD/YY
                          const formattedDate = parsedDate.toLocaleDateString('en-US', {
                            year: '2-digit',
                            month: '2-digit',
                            day: '2-digit',
                            timeZone: 'UTC', // Adjust the time zone as needed
                          });
                          const endDateParse = new Date(child.start_date);

                          // Format the date as MM/DD/YY
                          const endDate = endDateParse.toLocaleDateString('en-US', {
                            year: '2-digit',
                            month: '2-digit',
                            day: '2-digit',
                            timeZone: 'UTC', // Adjust the time zone as needed
                          });
                        return <tr className="flex space-x-4">
                            <td>{child.first_name}</td>
                            <td>{child.last_name}</td>
                            <td>{child.camp_name}</td>
                            <td>{formattedDate}</td>
                            <td>{endDate}</td>
                        </tr>
                    })}
                </tbody>
            </table>
            :
            <div className="mx-auto border-2 p-9 md:p-12 w-72 md:w-92 border-sky-700 mt-36 h-84 bg-indigo-50 space-y-2">
                <h2 className="text-2xl flex justify-center p-3">No Camps Found</h2>
                <h3 className="text-xl flex justify-center bg-green-200"><Link to='/RegisterCamp'>Click Here To Register</Link></h3>
                <h3 className="text-xl flex justify-center bg-green-200"><Link to='/AddChild'>Click Here To Add A Child</Link></h3>
            </div>
            }
        </div>
    )
}

export default ViewChild
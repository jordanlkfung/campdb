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
                <table className="min-w-full divide-y divide-gray-200">
  <thead className="bg-gray-50">
    <tr className="text-left text-gray-600">
      <th scope="col" className="py-2 px-4">
        First Name
      </th>
      <th scope="col" className="py-2 px-4">
        Last Name
      </th>
      <th scope="col" className="py-2 px-4">
        Camp Name
      </th>
      <th scope="col" className="py-2 px-4">
        Start Date
      </th>
      <th scope="col" className="py-2 px-4">
        End Date
      </th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {getData.map((child) => {
      const parsedStartDate = new Date(child.start_date);
      const formattedStartDate = parsedStartDate.toLocaleDateString('en-US', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'UTC',
      });

      const parsedEndDate = new Date(child.end_date);
      const formattedEndDate = parsedEndDate.toLocaleDateString('en-US', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'UTC',
      });

      return (
        <tr key={child.id} className="text-gray-800">
          <td className="py-3 px-4">{child.first_name}</td>
          <td className="py-3 px-4">{child.last_name}</td>
          <td className="py-3 px-4">{child.camp_name}</td>
          <td className="py-3 px-4">{formattedStartDate}</td>
          <td className="py-3 px-4">{formattedEndDate}</td>
        </tr>
      );
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
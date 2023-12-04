import axios from "axios";
import { useEffect, useState } from "react";

function ViewCamps(){
    const [campList, setCampList] = useState([])
    useEffect(()=>{
        const fetchData = async() =>{
            try{
                const response = await axios.get('http://localhost:8080/getCamps')
                setCampList(response.data)
            }catch(error){
                console.log(error)
            }
        }
        fetchData()
    },[])

    return(
        <div>
            <table className="table-fixed border border-seperate border-spacing-2 mt-2 ml-2 mr-2">
                <thead className="border border-seperate">
                    <tr>
                        <th className="w-1/5">Camp Name</th>
                        <th className="w-1/3">Location</th>
                        <th className="w-1/12 text-centered">Start Date</th>
                        <th className="w-1/12">End Date</th>
                        <th className="w-1/12">Max Capacity</th>
                    </tr>
                </thead>
                <tbody>
                    {campList.map((camp)=>{
                        const parsedDate = new Date(camp.start_date);

                        // Format the date as MM/DD/YY
                        const startDate = parsedDate.toLocaleDateString('en-US', {
                            year: '2-digit',
                            month: '2-digit',
                            day: '2-digit',
                            timeZone: 'UTC', // Adjust the time zone as needed
                        });
                        const endDateParse = new Date(camp.end_date);

                        // Format the date as MM/DD/YY
                        const endDate = endDateParse.toLocaleDateString('en-US', {
                            year: '2-digit',
                            month: '2-digit',
                            day: '2-digit',
                            timeZone: 'UTC', // Adjust the time zone as needed
                        });
                        return <tr className="">
                            <td className="w-1/5 text-centered">{camp.camp_name}</td>
                            <td className="w-1/3">{camp.address + ' '+camp.city+' '+camp.state+" "+camp.zip}</td>
                            <td className="w-1/12 text-centered">{startDate}</td>
                            <td className="w-1/12 text-centered">{endDate}</td>
                            <td className="w-1/12">{camp.max_capacity}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ViewCamps
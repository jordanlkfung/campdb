import axios from "axios";
import { useEffect } from "react";

function ViewChild(){
    const [getData,setData] = useState([])
    const parentid=1
    useEffect(()=>{
        try{
            const fetchData = async() =>{
                const response = axios.get('http://localhost:8080/viewCHildCamps',{params:{id:parentid}})
                setData(response.data)
            }
        }catch(error){
            console.log(error)
        }
    })
    
    return(
        <div>
            <table>
                <thead>
                    <tr>
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
                        return <tr>
                            <td>{child.first_name}</td>
                            <td>{child.last_name}</td>
                            <td>{child.name}</td>
                            <td>{child.start_date}</td>
                            <td>{child.end_date}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ViewChild
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function ViewParticipants(){
    // const user = useSelector((state)=>state.auth.user)
    const [selectedCamp, setCamp] = useState()
    const handleDropDownChange = (e) => {
        setCamp(e.target.value)
        console.log(e.target.value)
        fetchCampersList(e.target.value)
    }
    const [campersList, setCampersList] = useState([])
    const fetchCampersList = async (campID) => {
        try{
            const response = await axios.get('http://localhost:8080/viewCampers',{
                params:{campID: campID}
            });
            setCampersList(response.data)
        }
        catch(error){
            console.log(error)
        }
    }
    const [camplist, setcamplist] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:8080/campsAssignedTo',{
                params:{ empId:2}
            });
           setcamplist(response.data);
           console.log(response.data)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
    return(
        <div>
            <h4 class='whitespace-pre-wrap'>Select Camp
            <select class=''name='campList' id='camp' onChange={e=>handleDropDownChange(e)}>
                {selectedCamp==null && <option>Select</option>}
                {camplist.map((camp)=>{
                    return <option value={camp.id}>{camp.camp_name}</option>
                })}
            </select>
            </h4>
            {selectedCamp !==null&&
            <table class='table table-fixed'>
                <thead>
                    <tr class='flex space-x-4 text-left'>
                        <th class='col-xs-1'>#</th>
                        <th class='col-xs-3'>First Name</th>
                        <th class='col-xs-3'>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {campersList.map((campers)=>{
                        return <tr>
                            <td class='col-xs-1'>1</td>
                            <td class='col-xs-3'>{campers.first_name}</td>
                            <td class='col-xs-3'>{campers.last_name}</td>
                        </tr>
                    })}
                </tbody>
            </table>
            }
        </div>
    )
}

export default ViewParticipants;
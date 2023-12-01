import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function ViewParticipants(){
    const user = window.localStorage.getItem('user')
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
                params:{ empId:user}
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
            <h4 class='whitespace-pre-wrap'>Select Camp:
            <select className='mt-1'name='campList' id='camp' onChange={e=>handleDropDownChange(e)}>
                {selectedCamp==null && <option>Select</option>}
                {camplist.map((camp)=>{
                    return <option value={camp.id}>{camp.camp_name}</option>
                })}
            </select>
            </h4>
            {selectedCamp !==null&&
            <table className='table table-fixed w-full mt-3 border-seperate border border-spacing-2'>
                <thead>
                    <tr className='flex space-x-4 border border-spacing-2'>
                        <th className='w-1/12 text-center'>#</th>
                        <th className='w-1/6 text-center'>First Name</th>
                        <th className='w-1/6 text-center'>Last Name</th>
                        <th className='w-1/6 text-center'>Parent First Name</th>
                        <th className='w-1/6 text-center'>Parent Last Name</th>
                        <th className='w-1/6 text-center'>Contact Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {campersList.map((campers)=>{
                        return <tr className='flex space-x-4 border border-spcaing-2'>
                            <td className='w-1/12 text-center'>1</td>
                            <td className='w-1/6 text-center'>{campers.first_name}</td>
                            <td className='w-1/6 text-center'>{campers.last_name}</td>
                        </tr>
                    })}
                </tbody>
            </table>
            }
        </div>
    )
}

export default ViewParticipants;
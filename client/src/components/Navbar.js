import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { logout } from '../store/authSlice'
export default function Navbar(){
    // const user = useSelector((state)=>state.auth.user)
    // const dispatch = useDispatch()
    const location =useLocation();
    const [forceRender,setForce]=useState(false)
    const handleLogout=()=>{
        window.localStorage.removeItem("user")
        window.localStorage.removeItem("name")
        window.localStorage.removeItem('uType')
        setForce(!forceRender)
    }
    useEffect(() => {
        // Extract the current page pathname
        const currentPage = location.pathname;
    
        // Update the active page in the state
        // setActivePage(currentPage);
        setForce(!forceRender)
      }, [location.pathname]);
    return(
        <nav class='bg-sky-600 max-w-screen'>
            {/* <Link to='/'>
                Home
            </Link> */}
            <ul className='flex flex-row font medium space-x-8 mt-0 rtl:space-x-reverse'>
                <li><Link to='/'>Home</Link></li>
                {window.localStorage.getItem("uType")=="staff"&&<li><Link to='/ViewCamps'>View Camps</Link></li>}
                {window.localStorage.getItem("uType")=="staff"&&<li><Link to='/ViewParticipants'>View Campers</Link></li>}
                {window.localStorage.getItem("uType")=="staff"&&<li><Link to='/ViewStaff'>View Staff</Link></li>}
                {window.localStorage.getItem("uType")=="staff"&&<li><Link to='/AddStaff'>Add Staff</Link></li>}
                {window.localStorage.getItem("uType")=="parent"&&<li><Link to='/ViewChild'>View Camps</Link></li>}
                {window.localStorage.getItem("uType")=="parent"&&<li><Link to='/RegisterCamp'>Register Camps</Link></li>}
                {window.localStorage.getItem("uType")=="parent"&&<li><Link to='/AddChild'>Add Child</Link></li>}
                <li>{window.localStorage.getItem("user") && <Link to='/' onClick={handleLogout}>Logout</Link>}</li>
            </ul>
        </nav>
    )
}
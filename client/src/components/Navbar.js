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
        <nav class='bg-green-400 max-w-screen'>
            {/* <Link to='/'>
                Home
            </Link> */}
            <ul className='flex flex-row font medium space-x-8 mt-0 rtl:space-x-reverse'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/ViewParticipants'>View</Link></li>
                <li>{window.localStorage.getItem("user") ? <Link to='/' onClick={handleLogout}>Logout</Link>:<Link to='/signin'>signin</Link>}</li>
            </ul>
        </nav>
    )
}
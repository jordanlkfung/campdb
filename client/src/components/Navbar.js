import { Link } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import { logout } from '../store/authSlice'
export default function Navbar(){
    const user = useSelector((state)=>state.auth.user)
    const dispatch = useDispatch()
    return(
        <nav class='bg-green-400 max-w-screen'>
            {/* <Link to='/'>
                Home
            </Link> */}
            <ul className='flex flex-row font medium space-x-8 mt-0 rtl:space-x-reverse'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/ViewParticipants'>View</Link></li>
                {/* <li><Link to ='/signin'>Sign In</Link></li> */}
                <li>{user!=='' ? <Link to='/' onClick={logout()}>Logout</Link>:<Link to='/signin'>signin</Link>}</li>
            </ul>
        </nav>
    )
}
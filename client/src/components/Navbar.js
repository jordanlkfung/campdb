import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

export default function Navbar() {
  const location = useLocation();
  const [forceRender, setForce] = useState(false);

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('name');
    window.localStorage.removeItem('uType');
    setForce(!forceRender);
  };

  useEffect(() => {
    const currentPage = location.pathname;
    setForce(!forceRender);
  }, [location.pathname]);

  return (
    <nav className="bg-sky-600 max-w-screen p-4">
      <ul className="flex flex-row font-medium space-x-8 mt-0 rtl:space-x-reverse">
        <li>
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
        </li>
        {window.localStorage.getItem('uType') === 'staff' && (
          <>
            <li>
              <Link to="/ViewCamps" className="text-white hover:text-gray-300">
                View Camps
              </Link>
            </li>
            <li>
              <Link to="/ViewParticipants" className="text-white hover:text-gray-300">
                View Campers
              </Link>
            </li>
            <li>
              <Link to="/ViewStaff" className="text-white hover:text-gray-300">
                View Staff
              </Link>
            </li>
            <li>
              <Link to="/AddStaff" className="text-white hover:text-gray-300">
                Add Staff
              </Link>
            </li>
          </>
        )}
        {window.localStorage.getItem('uType') === 'parent' && (
          <>
            <li>
              <Link to="/ViewChild" className="text-white hover:text-gray-300">
                View Camps
              </Link>
            </li>
            <li>
              <Link to="/RegisterCamp" className="text-white hover:text-gray-300">
                Register Camps
              </Link>
            </li>
            <li>
              <Link to="/AddChild" className="text-white hover:text-gray-300">
                Add Child
              </Link>
            </li>
          </>
        )}
        <li>
          {window.localStorage.getItem('user') && (
            <Link to="/" onClick={handleLogout} className="text-white hover:text-gray-300">
              Logout
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

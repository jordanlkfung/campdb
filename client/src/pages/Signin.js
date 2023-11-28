import axios from 'axios';
import { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { signin } from '../store/authSlice';
import { Navigate } from 'react-router-dom';
import '../index.css';

function Signin() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector((state) => state.auth.user)
  const error = useSelector ((state) => state.auth.err)
  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault();
   dispatch(signin({username,password}))
      .then((response) => {
        console.log(response.payload);
        setUserName('');
        setPassword('');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const apiCall = () => {
    axios.get('http://localhost:8080').then((data) => {
      console.log(data);
    });
  };

  return (
    <div>
      <form className='mx-auto border-2 p-9 md:p-12 w-72 md:w-92 border-green-400 mt-36 h-84'onSubmit={submitHandler}>
        <h3 className='pb-5 text-2xl text-center text-green-400  '>Sign In</h3>
        <label className='block mb-1 text-xl text-green-400'htmlFor='username'>Username</label>
        <input className='bg-slate-300'
          id='username'
          type='text'
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label className='block mb-1 text-xl text-green-400' htmlFor='password'>Password</label>
        <input className='bg-slate-300'
          id='password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <button type='submit'>Submit</button>
        </div>
        {user ? <Navigate to="/ViewParticipants" replace = {true}/>:console.log('user '+user)}
      </form>
    </div>
  );
}

export default Signin;

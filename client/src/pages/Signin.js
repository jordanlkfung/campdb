import axios from 'axios';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../index.css';

function Signin() {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault();
  axios.post('http://localhost:8080/signin',{username: username,password: password}).then((data)=>{
    if(data.data.length!=0&&data.data[0].id==username){
      window.localStorage.setItem("user", data.data[0].id)
      window.localStorage.setItem("name",data.data[0].first_name+' '+data.data[0].last_name)
      window.localStorage.setItem("uType","staff")
      console.log(data.data[0].id)
      setUserName('')
      setPassword('')
    }
  })
  };

  return (
    <div>
      <form className='mx-auto border-2 p-9 md:p-12 w-72 md:w-92 border-sky-700 mt-36 h-84 bg-indigo-50'onSubmit={submitHandler}>
        <h3 className='pb-5 text-2xl text-center text-sky-600'>Staff Sign In</h3>
        <label className='block mb-1 text-xl text-sky-600'htmlFor='username'>Username</label>
        <input className='bg-zinc-100 rounded border-2'
          id='username'
          type='text'
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label className='block mb-1 text-xl text-sky-600' htmlFor='password'>Password</label>
        <input className='bg-zinc-100 rounded border-2'
          id='password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <button type='submit'>Submit</button>
        </div>
        {window.localStorage.getItem("uType")=="staff" && <Navigate to="/ViewParticipants" replace = {true}/>}
      </form> 
    </div>
  );
}

export default Signin;

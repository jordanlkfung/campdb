import axios from 'axios';
import { Link } from 'react-router-dom';

function App() {
  const apiCall = () =>{
    axios.get('http://localhost:8080').then((data) =>{
      console.log(data);
    })
  }
  return (
    <div class='flex flex-col items-center justify-center content-center h-screen'>
      <div class='flex-initial h-15 w-60 bg-green-400 p-5 rounded-md text-center mt-6 flex items-center justify-center h-full'>Parent Login</div>
      <div class='flex-initial h-15 w-60 bg-green-400 p-5 rounded-md text-center mt-6 flex items-center justify-center h-full'><Link to='/signin'>Staff Login</Link></div>
    </div>
  );
}

export default App;

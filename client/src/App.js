import { Link } from 'react-router-dom';

function App() {
  return (
    <div class='flex flex-col items-center justify-center content-center h-screen'>
      <div class='flex-initial h-20 w-1/3 bg-sky-400 p-5 rounded-md text-center mt-6 flex items-center justify-center'><Link to='ParentSignIn'>Parent Login</Link></div>
      <div class='flex-initial h-20 w-1/3 bg-sky-400 p-5 rounded-md text-center mt-6 flex items-center justify-center'><Link to='Signin'>Staff Login</Link></div>
    </div>
  );
}

export default App;

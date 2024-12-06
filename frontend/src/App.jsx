import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Home from './pages/home/Home';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';

function App() {

  const { authUser } = useAuthContext();  //useAuthContext() will provide authUser value. If it is not null, then user is authenticated and will be known as logged in
  
  return (
  <div className='p-4 h-screen flex items-center justify-center'>
    <Routes>
      <Route path='/' element={authUser ? <Home /> : <Navigate to={'/login'}/>} />
      <Route path='/signup' element={authUser ? <Navigate to='/' /> : <Signup />} />   {/*if authUser is authenticated redirect to Home page else stay in Signup page */} 
      <Route path='/login' element={authUser ? <Navigate to='/' /> :<Login />} />
    </Routes>
    <Toaster/>
  </div>
  );
}

export default App

import { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import ReactLoading from "react-loading";
import { Link, Navigate } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';

function Login() {
    const { setUser, setToken, user, token } = useStateContext();
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });

    if (token) {
      return <Navigate to="/" />;
    }

    const onSubmit = async (ev) => {
      ev.preventDefault();
      await axiosClient
      .post("/login", formData)
      .then(({ data }) => {
          setUser(data.user);
          setToken(data.token);
 
      })
      .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
              setErrors(response.data.errors);
          }
  });
    }
   
  return (
    <>
    <Navbar/>
    <div className="absolute inset-0 -z-10 h-full w-full bg-primary-base [background:radial-gradient(125%_125%_at_50%_10%,#265073_40%,#2D9596_100%)] overflow-y-scroll no-scrollbar">
    <div className='flex flex-col justify-center w-full h-screen'>
            <div className='flex flex-col justify-center items-center'>
                <h1 className="text-white font-open md:text-5xl sm:text-3xl xs:text-2xl mx-auto my-5">Unesite vaše podatke</h1>
                <input className="font-open text-2xl px-2 py-4 lg:w-1/3 md:w-1/2 sm:w-3/4 rounded-lg mx-auto my-5 shadow-md" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="text" placeholder='Email' />
                <input className="font-open text-2xl px-2 py-4 lg:w-1/3 md:w-1/2 sm:w-3/4 rounded-lg mx-auto my-5 shadow-md" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} type="password" placeholder='Lozinka' />
                <button className="text-gray-100 font-open text-center md:text-2xl xs:text-lg bg-secondary-base shadow-md hover:text-white px-3 py-2 md:w-1/6 xs:w-2/5 rounded-md font-medium mb-5" onClick={onSubmit}>Prijavi se</button>
                <Link to="/register" className="text-gray-100 font-open text-center text-2xl hover:text-white px-3 py-2 w-full  rounded-md font-medium">Nemate račun? Registrirajte se</Link>
            </div> 
            </div> 
          </div> 
    </>
  )
}

export default Login

import { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useStateContext } from '../../context/ContextProvider';
import photo from "../../assets/noPhoto.avif";
import axiosClient from '../../axios-client';

function EmployerNavbar() {

  const [isClicked, setIsClicked] = useState(false);
  const { user, token, setUser, setToken, } = useStateContext();

  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
        setUser(data);
    });
}, []);

  const onLogout = (e) => {
    e.preventDefault();

    axiosClient.post("/logout").then(() => {
        setUser({});
        setToken(null);
        <Navigate to="/" />;
    });
};


  
  function handleToggle(){
      setIsClicked(!isClicked)
  }

  return (
    <>
    <div className="bg-primary-base shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-gray-100 font-content text-center font-bold text-lg">JOB BOARD</h1>
          <div className="flex items-center">
            <span className="text-gray-100 mr-2">Logged in as {user.name}</span>
            <div className="relative">
              <button onClick={handleToggle} className="rounded-full overflow-hidden h-10 w-10 bg-gray-300 flex items-center justify-center">
                <img src={user.avatar ? `http://127.0.0.1:8000/api/images/${user.avatar}` : photo} alt="User Avatar" className="h-full w-full object-cover" />
              </button>
              {isClicked && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">MOJ PROFIL</Link>
                  <Link to="/about" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">NAPRAVI OGLAS</Link>
                  <Link to="/logout" onClick={onLogout} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">LOGOUT</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default EmployerNavbar

import { useState, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useStateContext } from '../../context/ContextProvider';
import photo from "../../assets/noPhoto.avif";
import axiosClient from '../../axios-client';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiSearch } from 'react-icons/fi';

function AdminNavbar() {

  const [isClicked, setIsClicked] = useState(false);
  const { user, token, setUser, setToken, } = useStateContext();
  const [applications, setApplications] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
        setUser(data);
    });
    fetchApplications();
}, []);

  const fetchApplications = async () => {

  await axiosClient.get("/applications").then(({ data }) => {
      setApplications(data.data.filter(app => app.opened == false));
  });
  
  };

  const onLogout = (e) => {
    e.preventDefault();

    axiosClient.post("/logout").then(() => {
        setUser(null);
        setToken(null);
        toast.success("Odjavili ste se", {
          position: "bottom-right",
          theme: "dark",
      });
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
        <div className='flex justify-center items-center hover:cursor-pointer' onClick={() => {
          navigate("/")
        }}>
        <FiSearch className='text-white text-2xl mr-2' />
          <h1 className="text-gray-100 font-content text-center font-bold text-lg">TražimPosao</h1>
        </div>
          <div className="flex items-center">
            <span className="text-gray-100 mr-2">Prijavljeni ste kao {user.name}</span>
            <div className="relative">
              <button onClick={handleToggle} className="rounded-full overflow-hidden h-10 w-10 bg-gray-300 flex items-center justify-center">
                <img src={user.avatar ? `http://127.0.0.1:8000/api/images/${user.avatar}` : photo} alt="User Avatar" className="h-full w-full object-cover" />
              </button>
              {isClicked && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">MOJ PROFIL</Link>
                  <Link to="/workers" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">PRETRAGA RADNIKA</Link>
                  <Link to="/offers" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">OGLASI</Link>
                  <Link to="/admin/users" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">ADMIN PANEL</Link>
                  <Link to="/logout" onClick={onLogout} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">ODJAVA</Link>
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

export default AdminNavbar

import DisplayNavbar from '../components/Navbar/DisplayNavbar';
import { FiSearch } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import { useEffect, useState } from 'react';
import 'animate.css'; // Import the Animate.css library

function LandingPage() {
  const { user } = useStateContext();
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    if (user?.token) {
      setUserLoggedIn(true);
    }
  }, [user]);

  return (
    <>
      <DisplayNavbar />
      <div className="absolute inset-0 -z-10 h-full w-full bg-primary-base [background:radial-gradient(125%_125%_at_50%_10%,#265073_40%,#2D9596_100%)]">
        <div className='flex flex-col justify-center w-full h-screen gap-y-32'>
          <div className='flex justify-center items-center animate__animated animate__fadeIn animate__delay-1s'>
            <FiSearch className='text-white text-5xl mr-2' />
            <h1 className='font-content text-white text-5xl'>TražimPosao</h1>
          </div>
          <h3 className='text-center font-content text-white text-xl m-3 animate__animated animate__fadeIn animate__delay-2s'>
            Vaša potraga za savršenim poslom počinje ovdje. Pronađite idealnu priliku već danas!
          </h3>
          <div className='flex justify-center items-center gap-x-5 animate__animated animate__fadeIn animate__delay-3s'>
            <Link className="text-white bg-secondary-base px-4 lg:px-6 py-2 rounded-md font-open text-xl my-2 lg:my-10 mx-2 lg:mx-5" to="/offers">Pregledaj Oglase</Link>
            {userLoggedIn ? (
              <Link className="text-white bg-secondary-base px-4 lg:px-6 py-2 rounded-md font-open text-xl my-2 lg:my-10 mx-2 lg:mx-5" to="/register">Pronađi posao ili radnika</Link>
            ) : (
              <Link className="text-white bg-secondary-base px-4 lg:px-6 py-2 rounded-md font-open text-xl my-2 lg:my-10 mx-2 lg:mx-5" to="/workers">Pronađi posao ili radnika</Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;

import { useEffect, useState } from 'react'
import { useStateContext } from '../../context/ContextProvider';
import axiosClient from '../../axios-client';
import WorkerNavbar from './WorkerNavbar';
import EmployerNavbar from './EmployerNavbar';
import Navbar from './Navbar';
import { ThreeDots } from 'react-loader-spinner';
import AdminNavbar from './AdminNavbar';


function DisplayNavbar() {

    const { user, setUser } = useStateContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserData();
    }, [])

    const fetchUserData = async () => {
        try {
            await axiosClient.get("/user").then(({ data }) => {
                setUser(data);
            });}
            catch (error) {

            } finally {
                setLoading(false);
            }
    }

    return (
        <>
            {loading ? (
                 <div className="bg-primary-base shadow-lg w-full flex justify-center items-center h-16">                  
                    <ThreeDots
                        visible={true}
                        height="80"
                        width="80"
                        color="white"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            ) :
            user?.role == "poslodavac" ? <EmployerNavbar /> : user?.role == "radnik" ? <WorkerNavbar/> : user?.role == "administrator" ? <AdminNavbar/> : <Navbar/>}
        </>
    )
}

export default DisplayNavbar

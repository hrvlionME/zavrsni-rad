import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner';
import { useStateContext } from "../context/ContextProvider";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import axiosClient from "../axios-client";
import DisplayNavbar from "../components/Navbar/DisplayNavbar";

function Notifications() {
    const { user, setUser } = useStateContext();
    const [applications, setApplications] = useState([]);
    const [employers, setEmployers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedApplicationId, setSelectedApplicationId] = useState(null);

    useEffect(() => {
        fetchApplications();
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        await axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    };

    const fetchApplications = async () => {
        setLoading(true);

        await axiosClient.get("/applications").then(({ data }) => {
            setApplications(data.data.sort((a, b) => b.id - a.id));
        });

        await axiosClient.get("/users").then(({ data }) => {
            setEmployers(data.data);
        });
        
        setLoading(false);
    };

    const getEmployerName = (employerId) => {
        const employer = employers.find(emp => emp.id === employerId);
        return employer ? employer.name : 'Loading...';
    };

    const confirmDeleteOffer = (applicationId) => {
        setSelectedApplicationId(applicationId);
        setShowModal(true);
    };

    const deleteApplication = () => {
        axiosClient.delete(`/application/${selectedApplicationId}`).then(() => {
            fetchApplications();
            setShowModal(false);
        });
    };

    return (
        <>
            <DisplayNavbar />
            <div className="fixed inset-0 -z-10 bg-primary-base [background:radial-gradient(125%_125%_at_50%_10%,#265073_40%,#2D9596_100%)]"></div>
            <div className='flex flex-col justify-start w-full h-screen'>
                {loading ? 
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2">
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
                    </div>
                    : 
                    <div>
                        <ul className="mt-24">
                            <li className='bg-primary-base py-4 my-4 px-20 mx-10 lg:mx-32 rounded-md flex justify-center lg:justify-between'> 
                                <p className='text-white font-open text-2xl'>Naslov oglasa</p>
                                <div className="w-1/4 hidden lg:flex justify-around items-center">
                                    <p className='text-white font-open text-2xl'>Korisnik</p>
                                    {user.role === "poslodavac" ? <p className='text-white font-open text-2xl'>Akcije</p> : null}
                                </div>
                            </li>
                            {applications.map((application, index) => (
                             <li key={index} className={`py-4 my-4 px-20 mx-10 lg:mx-32 rounded-md shadow-md flex justify-center lg:justify-between ${application.opened ? 'bg-gray-200' : 'bg-blue-200'}`}>
                                    <Link to={`/applications/${application.id}`} className='text-primary-base font-open text-2xl hover:underline'>{application.title}</Link>
                                    <div className="w-1/4 hidden lg:flex lg:justify-around">
                                        <p className='text-primary-base font-open text-2xl'>{getEmployerName(application.user_id)}</p>
                                      
                                            <div className='bg-red-500 rounded-full hover:bg-red-700 cursor-pointer h-8 w-8 flex items-center justify-center' onClick={() => confirmDeleteOffer(application.id)}>
                                                <FiMinusCircle className='text-white font-open text-2xl' /> 
                                            </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                }
            </div>
           
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-xl mb-4">Jeste li sigurni da želite izbrisati ovu prijavu?</h2>
                        <div className="flex justify-end">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                                onClick={deleteApplication}
                            >
                                Da
                            </button>
                            <button
                                className="bg-gray-300 text-black px-4 py-2 rounded"
                                onClick={() => setShowModal(false)}
                            >
                                NE
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Notifications;

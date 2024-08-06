import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import DisplayNavbar from "../../components/Navbar/DisplayNavbar";
import { Link } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner';
import { useStateContext } from "../../context/ContextProvider";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";

function MyOffers() {
    const { user, setUser } = useStateContext();
    const [offers, setOffers] = useState([]);
    const [employers, setEmployers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedOfferId, setSelectedOfferId] = useState(null);

    useEffect(() => {
        fetchOffers();
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        await axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    };

    const fetchOffers = async () => {
        setLoading(true);
        await axiosClient.get("/offers").then(({ data }) => {
            setOffers(data.data.filter(offer => offer.employer_id === user.id));
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

    const confirmDeleteOffer = (offerId) => {
        setSelectedOfferId(offerId);
        setShowModal(true);
    };

    const deleteOffer = () => {
        axiosClient.delete(`/offer/${selectedOfferId}`).then(() => {
            fetchOffers();
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
                                    <p className='text-white font-open text-2xl'>Poslodavac</p>
                                    <span className='text-white font-open text-2xl'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    </span>
                                    <span className='text-white font-open text-2xl'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                    </span>
                                    {user.role === "poslodavac" ? <p className='text-white font-open text-2xl'>Akcije</p> : null}
                                </div>
                            </li>
                            {offers.map((offer, index) => (
                                <li key={index} className='bg-gray-200 py-4 my-4 px-20 mx-10 lg:mx-32 rounded-md shadow-md flex justify-center lg:justify-between'> 
                                    <Link to={`/offers/${offer.id}`} className='text-primary-base font-open text-2xl hover:underline'>{offer.title}</Link>
                                    <div className="w-1/4 hidden lg:flex lg:justify-around">
                                        <p className='text-primary-base font-open text-2xl'>{getEmployerName(offer.employer_id)}</p>
                                        <span className='text-primary-base font-open text-2xl'>{offer.followers}</span>
                                        <span className='text-primary-base font-open text-2xl'>{offer.applications}</span>
                                        {user.role === "poslodavac" && user.id === offer.employer_id ? (
                                            <div className='bg-red-500 rounded-full hover:bg-red-700 cursor-pointer h-8 w-8 flex items-center justify-center' onClick={() => confirmDeleteOffer(offer.id)}>
                                                <FiMinusCircle className='text-white font-open text-2xl' /> 
                                            </div>
                                        ) : null}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                }
            </div>
            {user.role === "poslodavac" ?
                <div className="fixed bottom-4 right-4 z-50">
                    <div className="relative group">
                        <Link
                            to={'/addjob/'}
                            className="flex items-center justify-center w-12 h-12 bg-primary-base text-white rounded-full hover:rounded-l-none transition-all duration-300 group-hover:w-auto group-hover:pr-12 group-hover:pl-4"
                            style={{ overflow: 'hidden', whiteSpace: 'nowrap', transition: 'width 0.3s ease, padding 0.3s ease' }}
                        >
                            <span className="hidden group-hover:inline transition-display duration-300">
                                Dodaj novi oglas
                            </span>
                            <FiPlusCircle 
                                className="text-3xl absolute"
                                style={{ right: '10px' }}
                            />
                        </Link>
                    </div>
                </div>
            : null}

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-xl mb-4">Are you sure you want to delete this offer?</h2>
                        <div className="flex justify-end">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                                onClick={deleteOffer}
                            >
                                Yes
                            </button>
                            <button
                                className="bg-gray-300 text-black px-4 py-2 rounded"
                                onClick={() => setShowModal(false)}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default MyOffers;

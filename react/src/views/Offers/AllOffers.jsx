import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import DisplayNavbar from "../../components/Navbar/DisplayNavbar";
import { Link } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner';
import { useStateContext } from "../../context/ContextProvider";
import { FiMinusCircle, FiPlusCircle, FiSearch } from "react-icons/fi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AllOffers() {
    const { user, setUser } = useStateContext();
    const [offers, setOffers] = useState([]);
    const [employers, setEmployers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedOfferId, setSelectedOfferId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

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
            const sortedOffers = data.data.sort((a, b) => b.id - a.id);
            setOffers(sortedOffers);
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
            toast.success("Oglas izbrisan", {
                position: "bottom-right",
                theme: "dark",
            });
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
                            {offers.length > 0 ? <div>
                        <div className="flex justify-center mt-14">
                            <div className="relative w-3/4 lg:w-1/2">
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 pl-10 pr-4 text-2xl bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary-base"
                                    placeholder="Pretraži oglase..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <FiSearch className="absolute left-3 top-2/4 transform -translate-y-2/4 text-primary-base text-2xl" />
                            </div>
                        </div>
                    
                        <ul className="mt-8">
                            <li className='bg-primary-base py-4 my-4 px-20 mx-10 lg:mx-32 rounded-md flex justify-center lg:justify-between'> 
                                <p className='text-white font-open text-2xl'>Naslov oglasa</p>
                                <div className="w-1/2 hidden lg:flex justify-around items-center">
                                    <p className='text-white font-open text-2xl'>Poslodavac</p>
                                    <div className='flex items-center'>
                                                <span className='text-white font-open text-2xl ml-2'>Pratitelji</span>
                                            </div>
                                            <div className='flex items-center'>
                                                <span className='text-white font-open text-2xl ml-2'>Prijave</span>
                                            </div>
                                    {user?.role === "poslodavac" ? <p className='text-white font-open text-2xl'>Akcije</p> : null}
                                </div>
                            </li>
                  
                        
                            {offers.filter(offer => {
                                const titleMatch = offer.title.toLowerCase().includes(searchTerm.toLowerCase());
                                const tagMatch = offer.tags.some(tag => tag.name.toLowerCase().includes(searchTerm.toLowerCase()));
                                return titleMatch || tagMatch;
                            }).map((offer, index) => (
                                <li key={index} className='bg-gray-200 py-4 my-4 px-20 mx-10 lg:mx-32 rounded-md shadow-md flex justify-center lg:justify-between'> 
                                    <Link to={`/offers/${offer.id}`} className='text-primary-base font-open text-2xl hover:underline'>{offer.title}</Link>
                                    <div className="w-1/2 hidden lg:flex lg:justify-around">
                                        <p className='text-primary-base font-open text-2xl max-w-[100px] break-words'>{getEmployerName(offer.employer_id)}</p>
                                        <span className='text-primary-base font-open text-2xl'>{offer.followers}</span>
                                        <span className='text-primary-base font-open text-2xl'>{offer.applications}</span>
                                        {user?.role === "poslodavac" && user.id === offer.employer_id ? (
                                            <div className='bg-red-500 rounded-full hover:bg-red-700 cursor-pointer h-8 w-8 flex items-center justify-center' onClick={() => confirmDeleteOffer(offer.id)}>
                                                <FiMinusCircle className='text-white font-open text-2xl' /> 
                                            </div>
                                        ) : <div className="h-8 w-8"></div>}
                                    </div>
                                </li>
                            ))}
                        </ul></div> : <p className='text-white font-open text-2xl text-center my-20'>Nema oglasa</p>}
                    </div>
                }
            </div>
            {user?.role === "poslodavac" ?
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
                        <h2 className="text-xl mb-4">Jeste li sigurni da želite izbrisati ovaj oglas?</h2>
                        <div className="flex justify-end">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                                onClick={deleteOffer}
                            >
                                Da
                            </button>
                            <button
                                className="bg-gray-300 text-black px-4 py-2 rounded"
                                onClick={() => setShowModal(false)}
                            >
                                Ne
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AllOffers;

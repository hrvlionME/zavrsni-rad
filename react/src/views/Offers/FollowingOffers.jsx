import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import DisplayNavbar from "../../components/Navbar/DisplayNavbar"
import { Link } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner';

function FollowingOffers() {

    const [offers, setOffers] = useState([])
    const [employers, setEmployers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOffers();
    }, [])

    const fetchOffers = async () => {
        await axiosClient.get("/showfollowingoffers").then(({ data }) => {
            setOffers(data.data);
        });
        await axiosClient.get("/users").then(({ data }) => {
            setEmployers(data.data);
        });
        setLoading(false);
    }

    const getEmployerName = (employerId) => {
        const employer = employers.find(emp => emp.id === employerId);
        return employer ? employer.name : 'Loading...';
    };

    return (
        <>
        <DisplayNavbar/>
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
                            <div className="w-1/2 hidden lg:flex justify-around items-center">
                                    <div className='flex items-center'>
                                                <span className='text-white font-open text-2xl ml-2'>Pratitelji</span>
                                            </div>
                                            <div className='flex items-center'>
                                                <span className='text-white font-open text-2xl ml-2'>Prijave</span>
                                            </div>
                                </div>
                            </div>
                        </li>
                        {offers.map((offer, index) => (
                        <li key={index} className='bg-gray-200 py-4 my-4 px-20 mx-10 lg:mx-32 rounded-md shadow-md flex justify-center lg:justify-between'> 
                             <Link to={`/offers/${offer.id}`} className='text-primary-base font-open text-2xl hover:underline'>{offer.title}</Link>
                            <div className="w-1/4 hidden lg:flex lg:justify-around">
                                <p className='text-primary-base font-open text-2xl max-w-[100px] break-words'>{getEmployerName(offer.employer_id)}</p>
                                <span className='text-primary-base font-open text-2xl'>{offer.followers}</span>
                                <span className='text-primary-base font-open text-2xl'>{offer.applications}</span>
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>}
            </div>
        </>
    )
}

export default FollowingOffers

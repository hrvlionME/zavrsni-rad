import { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import photo from "../assets/noPhoto.avif";
import backgroundSVG from "../assets/wave.svg"; 
import DisplayNavbar from '../components/Navbar/DisplayNavbar';
import { ThreeDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

function Profile() {
    const [user, setUser] = useState({});
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await fetchUserData(); 
        };
        
        fetchData();
    }, []);
    
    const fetchUserData = async () => {
        try {
            const response = await axiosClient.get("/user");
            setUser(response.data);
            
            if (response.data.id) {
                await fetchTags(response.data.id);
                await fetchOffers(response.data.id, response.data.role);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
        setLoading(false);
    };

    const fetchOffers = async (userId, role) => {
        try {
            const response = role === "poslodavac" ? 
                await axiosClient.get(`/getuseroffers/${userId}`) : 
                await axiosClient.get(`/getfollowingoffers/${userId}`);
            
            setOffers(response.data.data);
        } catch (error) {
            console.error("Error fetching offers:", error);
        }
    };

    const fetchTags = async (userId) => {
        try {
            const response = await axiosClient.get(`/usertags/${userId}`);
            setTags(response.data.tags);
        } catch (error) {
            console.error("Error fetching tags:", error);
        }
    };
    
    return (
        <>
            <DisplayNavbar />
            <div className="absolute inset-0 -z-10 h-full w-full bg-primary-base [background:radial-gradient(125%_125%_at_50%_10%,#265073_40%,#2D9596_100%)] overflow-y-scroll no-scrollbar">
                <div className="absolute inset-0 w-full bg-cover" style={{ backgroundImage: `url(${backgroundSVG})`, backgroundRepeat: "no-repeat", backgroundSize: 'cover', backgroundPosition: 'center calc(0% - 200px)'}}>
                    {loading ? 
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
                        : 
                        <div className='flex items-center justify-center my-32'>
                            <img src={user.avatar ? `http://127.0.0.1:8000/api/images/${user.avatar}` : photo} alt="Pogreska kod ucitavanja slike" className="w-36 h-36 rounded-full ml-8 object-cover"/>
                            <div className="flex flex-col mx-10">
                                <h1 className='text-white font-open text-xl font-semibold'>{user.name}</h1>
                                <h2 className='text-white font-open text-md'>{user.description}</h2>
                                <ul className='flex flex-col list-disc'>
                                    {Object.values(tags).map(item => (
                                        <li className='text-white font-open text-md' key={item.id}>{item.name}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    }
                    <div className='flex items-center justify-around'>
                        <div className='bg-gray-200 py-4 w-1/2 px-8 rounded-md shadow-md'> 
                        <p className='text-primary-base font-bold text-2xl text-center'>{user.role === "poslodavac" ? "Oglasi" : "Praćeni Oglasi"}</p>
                            <div className='flex flex-col items-start'>
                                {offers.map(offer => (
                                    <Link key={offer.id} to={`/offers/${offer.id}`} className='text-primary-base text-lg text-left py-3 hover:underline'>
                                        {offer.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;

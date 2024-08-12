import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import DisplayNavbar from "../components/Navbar/DisplayNavbar";
import { Link } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner';
import { useStateContext } from "../context/ContextProvider";
import { FiMinusCircle, FiPlusCircle, FiSearch } from "react-icons/fi";

function Workers() {
    const { user, setUser } = useStateContext();
    const [employers, setEmployers] = useState([]);
    const [loading, setLoading] = useState(true);
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

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    };

    const fetchOffers = async () => {
        setLoading(true);
        await axiosClient.get("/users").then(({ data }) => {
            const filteredEmployers = data.data.filter(employer => employer.role === "radnik").sort((a, b) => b.id - a.id);
            setEmployers(filteredEmployers);
        });
        setLoading(false);
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
                        {employers.length > 0 ? <div>
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
                                <p className='text-white font-open text-2xl'>Naziv radnika</p>
                                <div className="w-1/4 hidden lg:flex justify-around items-center">
                                    <p className='text-white font-open text-2xl'>Opis</p>
                                </div>
                            </li>
                            {employers.filter(employer => {
                                const name = employer.name.toLowerCase().includes(searchTerm.toLowerCase());
                                const tagMatch = employer.tags.some(tag => tag.name.toLowerCase().includes(searchTerm.toLowerCase()));
                                return name || tagMatch;
                            }).map((employer, index) => (
                                <li key={index} className='bg-gray-200 py-4 my-4 px-20 mx-10 lg:mx-32 rounded-md shadow-md flex justify-center lg:justify-between'> 
                                    <Link to={`/profile/${employer.id}`} className='text-primary-base font-open text-2xl hover:underline'>{employer.name}</Link>
                                    <div className="w-1/4 hidden lg:flex lg:justify-around">
                                        <p className='text-primary-base font-open text-2xl'> {truncateText(employer.description, 30)}</p>
                                    </div>
                                </li>
                            ))}
                        </ul> </div> : <p className='text-white font-open text-2xl text-center my-20'>Nema radnika</p>}
                    </div>
                }
            </div>
        </>
    );
}

export default Workers;

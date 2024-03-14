import { useState, useEffect } from 'react'
import axiosClient from '../axios-client';
import photo from "../assets/noPhoto.avif";
import Navbar from '../components/Navbar/Navbar';

function Profile() {
    const [user, setUser] = useState({})

    useEffect(() => {
        fetchUserData();
    }, [])

    const fetchUserData = async () => {
        await axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }

    return (
        <>
        <Navbar/>
        <div className="absolute inset-0 -z-10 h-full w-full bg-primary-base [background:radial-gradient(125%_125%_at_50%_10%,#265073_40%,#2D9596_100%)] overflow-y-scroll no-scrollbar">
                <div className='flex items-center justify-center my-32'>
                <img src={user.avatar ? `http://127.0.0.1:8000/api/images/${user.avatar}` : photo} alt="Pogreska kod ucitavanja slike" className="w-36 h-36 rounded-full"/>
                <div className="flex flex-col mx-10">
                    <h1>Hrvoje</h1>
                    <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, nisi!</h2>
                    <ul className='flex'>
                        <li>tag1</li>
                        <li>tag2</li>
                        <li>tag3</li>
                    </ul>
                </div>
                </div>
                <div className='flex items-center justify-around'>
                    <div>
                        Objave
                    </div>
                    <div>
                        Prijave
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile

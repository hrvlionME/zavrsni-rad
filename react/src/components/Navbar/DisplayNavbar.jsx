import { useState, useEffect } from 'react'
import { useStateContext } from '../../context/ContextProvider';
import axiosClient from '../../axios-client';
import WorkerNavbar from './WorkerNavbar';
import EmployerNavbar from './EmployerNavbar';
import Navbar from './Navbar';


function DisplayNavbar() {

    const { user, token, setUser, setToken, } = useStateContext();

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
            {user.role == "radnik" ? <WorkerNavbar/> : user.role == "poslodavac" ? <EmployerNavbar/> : <Navbar/>}
        </>
    )
}

export default DisplayNavbar

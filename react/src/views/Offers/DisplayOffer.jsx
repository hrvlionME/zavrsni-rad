import { useEffect } from 'react'
import { useStateContext } from '../../context/ContextProvider';
import axiosClient from '../../axios-client';
import WorkerOffer from './WorkerOffer';
import EmployerOffer from './EmployerOffer';
import GuestOffer from './GuestOffers';



function DisplayOffer() {

    const { user, setUser } = useStateContext();

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
            {user.role == "radnik" ? <WorkerOffer/> : user.role == "poslodavac" ? <EmployerOffer/> : <GuestOffer/>}
        </>
    )
}

export default DisplayOffer

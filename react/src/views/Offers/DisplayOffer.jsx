import { useEffect, useState } from 'react'
import { useStateContext } from '../../context/ContextProvider';
import axiosClient from '../../axios-client';
import WorkerOffer from './WorkerOffer';
import EmployerOffer from './EmployerOffer';
import GuestOffer from './GuestOffer';
import { useParams } from 'react-router-dom';



function DisplayOffer() {

    const { user, setUser } = useStateContext();
    const { id } = useParams();
    const [offer, setOffer] = useState({});
    const [employers, setEmployers] = useState([]);

    useEffect(() => {
        fetchUserData();
        fetchOffer();
    }, [])

    const fetchOffer = async () => {
        try {
          const offersResponse = await axiosClient.get(`/offer/${id}`);
          setOffer(offersResponse.data.data);
    
          const usersResponse = await axiosClient.get("/users");
          setEmployers(usersResponse.data.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

    const fetchUserData = async () => {
        await axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }



    return (
        <>
            {user.role == "radnik" ? <WorkerOffer/> : user.role == "poslodavac" && offer.employer_id == user.id ? <EmployerOffer/> : <GuestOffer/>}
        </>
    )
}

export default DisplayOffer

import { useState, useEffect } from 'react'
import DisplayNavbar from '../components/Navbar/DisplayNavbar'
import { useStateContext } from '../context/ContextProvider';
import axiosClient from '../axios-client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddJob() {

  const { user, setUser } = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
      fetchUserData();
  }, [])

  const fetchUserData = async () => {
      await axiosClient.get("/user").then(({ data }) => {
          setUser(data);
      });
  }
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    user_id: user.id,
    tags: '',
  });

  const onSubmit = async (ev) => {
    ev.preventDefault()
    await axiosClient
    .post("/addoffer", formData)
    .then(() => {
      toast.success("Uspješno ste se postavili oglas", {
        position: "bottom-right",
        theme: "dark",
    });
    })
    .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          toast.error("Greška: " + err, {
            position: "bottom-right",
            theme: "dark",
        });
        }})
    navigate(`/offers`);
  }

  return (
    <>
    <DisplayNavbar/>
    <div className="absolute inset-0 -z-10 h-full w-full bg-primary-base [background:radial-gradient(125%_125%_at_50%_10%,#265073_40%,#2D9596_100%)] overflow-y-scroll no-scrollbar">
    <div className='flex flex-col justify-center w-full h-screen'>
            <div className='flex flex-col justify-center items-center'>
                <h1 className="text-white font-open md:text-5xl sm:text-3xl xs:text-2xl mx-auto my-5">Napravite oglas</h1>
                <input className="font-open text-2xl px-2 py-4 lg:w-1/3 md:w-1/2 sm:w-3/4 rounded-lg mx-auto my-5 shadow-md"  value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} type="text" placeholder='Naslov posla' />
                <textarea className="font-open text-2xl px-2 py-4 lg:w-1/3 md:w-1/2 sm:w-3/4 rounded-lg mx-auto my-5 shadow-md" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} type="text" placeholder='Dodajte opis posla' rows={6} />
                <input className="font-open text-1xl px-2 py-4 lg:w-1/3 md:w-1/2 sm:w-3/4 rounded-lg mx-auto my-5 shadow-md"  value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} type="text" placeholder='Unesite vaše vještine odvojene razmakom npr: vozač kuhar nastavnik'/>
                <button className="text-gray-100 font-open text-center md:text-2xl xs:text-lg bg-secondary-base shadow-md hover:text-white px-3 py-2 md:w-1/6 xs:w-2/5 rounded-md font-medium mb-5" onClick={onSubmit}>Dodaj oglas</button>
            </div> 
            </div> 
          </div> 
    </>
  )
}

export default AddJob

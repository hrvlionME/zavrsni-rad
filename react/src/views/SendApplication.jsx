import { useState, useEffect } from 'react'
import DisplayNavbar from '../components/Navbar/DisplayNavbar'
import { useStateContext } from '../context/ContextProvider';
import axiosClient from '../axios-client';
import { useNavigate, useParams } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function SendApplication() {

  const { user, setUser } = useStateContext();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    offer_id: 0,
    user_id: 0,
  });
  
  useEffect(() => {
      fetchData();
  }, [])

  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [userResponse, offerResponse] = await Promise.all([
        axiosClient.get("/user"),
        axiosClient.get(`/offer/${id}`),
      ]);

      setUser(userResponse.data);

      const offerData = offerResponse.data.data;

      setFormData({
        title: offerData.title,
        offer_id: offerData.id,
        user_id: userResponse.data.id,
      });

    } catch (error) {
        toast.error("Greška: " + error, {
        position: "bottom-right",
        theme: "dark",
    });
    
    }
    setLoading(false);
  };

  const onSubmit = async (ev) => {
    ev.preventDefault()
    await axiosClient
    .post(`/offer/${id}/apply`, formData)
    .then(() => {
      toast.success("Prijava poslana", {
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
    
    navigate(`/offers/${id}`);
  }
  return (
    <>
    <DisplayNavbar/>
    <div className="absolute inset-0 -z-10 h-full w-full bg-primary-base [background:radial-gradient(125%_125%_at_50%_10%,#265073_40%,#2D9596_100%)] overflow-y-scroll no-scrollbar">
    <div className='flex flex-col justify-center w-full h-screen'>
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
            <div className='flex flex-col justify-center items-center'>
                <h1 className="text-white font-open md:text-5xl sm:text-3xl xs:text-2xl mx-auto my-5">Prijavite se na oglas</h1>
                <textarea className="font-open text-2xl px-2 py-4 lg:w-1/3 md:w-1/2 sm:w-3/4 rounded-lg mx-auto my-5 shadow-md" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} type="text" placeholder='Napišite poruku' rows={6} />
                <button className="text-gray-100 font-open text-center md:text-2xl xs:text-lg bg-secondary-base shadow-md hover:text-white px-3 py-2 md:w-1/6 xs:w-2/5 rounded-md font-medium mb-5" onClick={onSubmit}>Pošalji</button>
            </div> }
            </div> 
          </div> 
    </>
  )
}

export default SendApplication

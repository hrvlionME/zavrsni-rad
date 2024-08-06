import { useState, useEffect } from 'react'
import DisplayNavbar from '../components/Navbar/DisplayNavbar'
import { useStateContext } from '../context/ContextProvider';
import axiosClient from '../axios-client';
import { useNavigate, useParams } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';

function EditJob() {

  const { user, setUser } = useStateContext();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
  });

  useEffect(() => {
      fetchData();
  }, [])

  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [userResponse, offerResponse, offerTagsResponse] = await Promise.all([
        axiosClient.get("/user"),
        axiosClient.get(`/offer/${id}`),
        axiosClient.get(`/getoffertags/${id}`)
      ]);

      setUser(userResponse.data);

      const offerData = offerResponse.data.data;
      const tagNames = offerTagsResponse.data.tags.map(tag => tag.name);
      const tagsString = tagNames.join(' ');

      setFormData({
        title: offerData.title,
        description: offerData.description,
        tags: tagsString,
      });

    } catch (error) {
      console.error("Error fetching data:", error);
    
    }
    setLoading(false);
  };

  const onSubmit = async (ev) => {
    ev.preventDefault()
    await axiosClient
    .patch(`/offer/${id}`, formData)
    .then()
    .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
            setErrors(response.data.errors);
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
                <h1 className="text-white font-open md:text-5xl sm:text-3xl xs:text-2xl mx-auto my-5">Uredite oglas</h1>
                <input className="font-open text-2xl px-2 py-4 lg:w-1/3 md:w-1/2 sm:w-3/4 rounded-lg mx-auto my-5 shadow-md"  value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} type="text" placeholder='Naslov posla' />
                <textarea className="font-open text-2xl px-2 py-4 lg:w-1/3 md:w-1/2 sm:w-3/4 rounded-lg mx-auto my-5 shadow-md" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} type="text" placeholder='Dodajte opis posla' rows={6} />
                <input className="font-open text-1xl px-2 py-4 lg:w-1/3 md:w-1/2 sm:w-3/4 rounded-lg mx-auto my-5 shadow-md"  value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} type="text" placeholder='Unesite vaše vještine odvojene razmakom npr: vozač kuhar nastavnik'/>
                <button className="text-gray-100 font-open text-center md:text-2xl xs:text-lg bg-secondary-base shadow-md hover:text-white px-3 py-2 md:w-1/6 xs:w-2/5 rounded-md font-medium mb-5" onClick={onSubmit}>Promjeni oglas</button>
            </div> }
            </div> 
          </div> 
    </>
  )
}

export default EditJob

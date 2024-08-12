import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DisplayNavbar from "../../components/Navbar/DisplayNavbar";
import axiosClient from "../../axios-client";
import photo from "../../assets/noPhoto.avif";
import { ThreeDots } from "react-loader-spinner";

function GuestOffer() {

    const [offer, setOffer] = useState([]);
    const [employers, setEmployers] = useState([]);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
  
    useEffect(() => {
      fetchOffer();
    }, []);
  
    const fetchOffer = async () => {
      try {
        const offersResponse = await axiosClient.get(`/offer/${id}`);
        setOffer(offersResponse.data.data);
  
        const usersResponse = await axiosClient.get("/users");
        setEmployers(usersResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
  
    const findEmployerById = (userId) => {
      return employers.find((employer) => employer.id === userId);
    };
  
    const employer = offer ? findEmployerById(offer.employer_id) : null;
  
    return (
      <>
        <DisplayNavbar />
        <div className="fixed inset-0 -z-10 bg-primary-base [background:radial-gradient(125%_125%_at_50%_10%,#265073_40%,#2D9596_100%)]"></div>
        <div className="flex flex-col justify-start w-full min-h-screen gap-y-2">
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
                        </div> : <div>
          {offer ? (
            <div
              key={offer.id}
              className="mt-36 min-h-[700px] bg-gray-200 py-4 my-4 px-20 mx-10 lg:mx-32 rounded-md shadow-md flex flex-col lg:flex-row justify-between"
            >
              <div className="w-full lg:w-3/6 mb-4 lg:mb-0">
                <p className="text-primary-base font-bold text-2xl my-10">
                  {offer.title}
                </p>
                <p className="text-primary-base font-open text-lg max-w-full lg:max-w-md text-justify my-10">
                  {offer.description}
                </p>
              </div>
              <div className="lg:relative w-full lg:w-2/6 flex flex-col lg:items-end lg:gap-y-8">
                <div className="lg:absolute flex lg:flex-col flex-col md:flex-row items-center lg:items-end py-5">
                  <div className="flex items-center" onClick={() => navigate(`/profile/${offer.employer_id}`)}>
                    <img
                      src={employer && employer.avatar ? `http://127.0.0.1:8000/api/images/${employer.avatar}` : photo}
                      alt="Pogreska kod ucitavanja slike"
                      className="w-24 h-24 rounded-full object-cover"
                    />
                    <div className="flex flex-col mx-4 text-left">
                      <h1 className="text-black font-open text-xl font-semibold">
                        {employer ? employer.name : "Unknown"}
                      </h1>
                      <h2 className="text-black font-open text-md">
                        {employer ? employer.description : "Details not available"}
                      </h2>
                    </div>
                  </div>
                  <div className="w-4/6 flex justify-end lg:justify-start">
                    <div className="flex flex-col items-center m-5">
                  <span className='text-primary-base font-open text-2xl'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                </span>
                        <span className='text-primary-base font-open text-2xl text-center'>{offer.followers} {offer.followers == 1 ? "Pratitelj" : "Pratitelja"}</span>
                </div>
                <div className="flex flex-col items-center m-5">
                <span className='text-primary-base font-open text-2xl'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </span>
                        <span className='text-primary-base font-open text-2xl text-center'>{offer.applications} Prijava</span>
                </div>
                </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-primary-base font-open text-lg mt-10">Offer not found</p>
          )}
        </div>}
        </div>
      </>
    );
}

export default GuestOffer

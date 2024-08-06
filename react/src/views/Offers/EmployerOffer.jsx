import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import DisplayNavbar from "../../components/Navbar/DisplayNavbar";
import photo from "../../assets/noPhoto.avif";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner';

function EmployerOffer() {
  const [offer, setOffer] = useState([]);
  const [employers, setEmployers] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
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

  const confirmDeleteOffer = () => {
    setShowModal(true);
};

const deleteOffer = () => {
    axiosClient.delete(`/offer/${id}`).then(() => {
        navigate("/offers/");
    });
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
              <div className="flex justify-center lg:justify-end">
                <Link to={`/offers/${id}/edit`} className="text-white bg-secondary-base px-4 lg:px-6 py-2 rounded-md font-open text-xl my-2 lg:my-10 mx-2 lg:mx-5">
                  Uredi oglas
                </Link>
                <button className="text-white bg-red-500 px-4 lg:px-6 py-2 rounded-md font-open text-xl my-2 lg:my-10 mx-2 lg:mx-5" onClick={confirmDeleteOffer}>
                  Ukloni oglas
                </button>
              </div>
              <div className="lg:absolute lg:bottom-4 flex flex-col items-center lg:items-end py-5">
                <div className="flex items-center" onClick={() => navigate(`/profile/${offer.employer_id}`)}>
                  <img
                    src={employer && employer.avatar ? `http://127.0.0.1:8000/api/images/${employer.avatar}` : photo}
                    alt="Pogreska kod ucitavanja slike"
                    className="w-24 h-24 rounded-full"
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
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-primary-base font-open text-lg mt-10">Offer not found</p>
        )}
        </div>}
      </div>
      {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-xl mb-4">Are you sure you want to delete this offer?</h2>
                        <div className="flex justify-end">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                                onClick={deleteOffer}
                            >
                                Yes
                            </button>
                            <button
                                className="bg-gray-300 text-black px-4 py-2 rounded"
                                onClick={() => setShowModal(false)}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
    </>
  );
}


export default EmployerOffer;

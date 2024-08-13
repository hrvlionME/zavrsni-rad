import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import DisplayNavbar from "../components/Navbar/DisplayNavbar";
import photo from "../assets/noPhoto.avif";
import { useParams } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner';

function ShowApplication() {
  const [application, setApplication] = useState([]);
  const [employers, setEmployers] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOffer();
  }, []);

  const fetchOffer = async () => {
    try {
      const applicationsResponse = await axiosClient.get(`/application/${id}`);
      setApplication(applicationsResponse.data.data);

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

  const employer = application ? findEmployerById(application.user_id) : null;

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
          {application ? (
            <div
              key={application.id}
              className="mt-36 min-h-[700px] bg-gray-200 py-4 my-4 px-20 mx-10 lg:mx-32 rounded-md shadow-md flex flex-col lg:flex-row justify-between"
            >
              <div className="w-full lg:w-3/6 mb-4 lg:mb-0">
                <p className="text-primary-base font-bold text-2xl my-10">
                  Oglas: "{application.title}"
                </p>
                <p className="text-primary-base font-semibold text-xl max-w-full lg:max-w-md text-justify">
                  Poruka korisnika: 
                </p>
                <p className="text-primary-base font-open text-lg max-w-full lg:max-w-md text-justify">
                {application.description}
                </p>
              </div>
              <div className="lg:relative w-full lg:w-2/6 flex flex-col lg:items-end lg:gap-y-8">
                <div className="lg:absolute flex lg:flex-col flex-col md:flex-row items-center lg:items-end py-5">
                  <div className="flex items-center">
                    <img
                      src={employer && employer.avatar ? `http://127.0.0.1:8000/api/images/${employer.avatar}` : photo}
                      alt="Pogreska kod ucitavanja slike"
                      className="w-36 h-36 rounded-full object-cover"
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
                  <div className="w-5/6 flex justify-end gap-12 lg:justify-start my-10">
                    <p className="text-primary-base font-open text-lg"><b>Email:</b> {employer ? employer.email : "Unknown"}</p>
                    <p className="text-primary-base font-open text-lg"><b>Phone:</b> {employer ? employer.phone : "Unknown"}</p>
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


export default ShowApplication;

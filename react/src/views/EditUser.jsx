import { useState, useEffect } from 'react';
import DisplayNavbar from '../components/Navbar/DisplayNavbar';
import { useStateContext } from '../context/ContextProvider';
import axiosClient from '../axios-client';
import { useNavigate, useParams } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';

function EditUser() {
  const { user, setUser } = useStateContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tags: '',
  });
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [loggedUser, userResponse, userTagsResponse] = await Promise.all([
        axiosClient.get("/user"),
        axiosClient.get(`/user/${id}`),
        axiosClient.get(`/getusertags/${id}`),
      ]);

      const tagNames = userTagsResponse.data.tags.map(tag => tag.name);
      const tagsString = tagNames.join(' ');

      setUser(loggedUser.data);
      setFormData({
        name: userResponse.data.data.name,
        email: userResponse.data.data.email,
        phone: userResponse.data.data.phone,
        tags: tagsString,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrors("Failed to fetch user data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setErrors(null);
    try {
      await axiosClient.patch(`/user/${id}`, formData);
      navigate(`/admin/users`);
    } catch (err) {
      const response = err.response;
      if (response && response.status === 422) {
        setErrors(response.data.errors);
      } else {
        setErrors("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <DisplayNavbar />
      <div className="absolute inset-0 -z-10 h-full w-full bg-primary-base [background:radial-gradient(125%_125%_at_50%_10%,#265073_40%,#2D9596_100%)] overflow-y-scroll no-scrollbar">
        <div className='flex flex-col justify-center w-full h-screen'>
          {loading ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <ThreeDots 
                visible={true}
                height="80"
                width="80"
                color="white"
                ariaLabel="three-dots-loading"
              />
            </div>
          ) : (
            <div className='flex flex-col justify-center items-center'>
              <h1 className="text-white font-open md:text-5xl sm:text-3xl xs:text-2xl mx-auto my-5">Uredite korisnika</h1>
              {errors && <p className="text-red-500 mb-4">{errors}</p>}
              <input
                className="font-open text-2xl px-2 py-4 lg:w-1/3 md:w-1/2 sm:w-3/4 rounded-lg mx-auto my-5 shadow-md"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                type="text"
                placeholder='Ime korisnika'
              />
              <input
                className="font-open text-2xl px-2 py-4 lg:w-1/3 md:w-1/2 sm:w-3/4 rounded-lg mx-auto my-5 shadow-md"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                type="email"
                placeholder='Email adresa'
              />
              <input
                className="font-open text-2xl px-2 py-4 lg:w-1/3 md:w-1/2 sm:w-3/4 rounded-lg mx-auto my-5 shadow-md"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                type="text"
                placeholder='Broj telefona'
              />
              <input
                className="font-open text-1xl px-2 py-4 lg:w-1/3 md:w-1/2 sm:w-3/4 rounded-lg mx-auto my-5 shadow-md"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                type="text"
                placeholder='Unesite vaše vještine odvojene razmakom npr: vozač kuhar nastavnik'
              />
              <button
                className="text-gray-100 font-open text-center md:text-2xl xs:text-lg bg-secondary-base shadow-md hover:text-white px-3 py-2 md:w-1/6 xs:w-2/5 rounded-md font-medium mb-5"
                onClick={onSubmit}
              >
                Promjeni korisnika
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default EditUser;

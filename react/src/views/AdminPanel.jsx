import { useEffect, useState } from "react";
import DisplayNavbar from "../components/Navbar/DisplayNavbar";
import Sidebar from "../components/Sidebar";
import axiosClient from "../axios-client";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import MobileSidebar from "../components/MobileSidebar";

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [offers, setOffers] = useState([]);
  const [userOrOffer, setUserOrOffer] = useState("");
  const { content } = useParams();

  useEffect(() => {
    if (content === "users") {
      fetchUsers();
    } else if (content === "offers") {
      fetchOffers();
    } else {
      fetchUsers();
    }

    console.log(userOrOffer);
  }, [content]);

  const deleteUser = (id) => {
    axiosClient
      .delete(`/user/${id}`)
      .then(() => {
        fetchUsers();
        toast.success("Uspješno ste se izbrisali korisnika", {
          position: "bottom-right",
          theme: "dark",
      });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteOffer = (id) => {
    axiosClient
      .delete(`/offer/${id}`)
      .then(() => {
        fetchOffers();
        toast.success("Uspješno ste se izbrisali oglas", {
          position: "bottom-right",
          theme: "dark",
      });
      })
      .catch((error) => {
        console.log(error);
      });
  };	

  const fetchUsers = () => {
    axiosClient
      .get("/users")
      .then((response) => {
        setUsers(response.data.data);
        setUserOrOffer("users");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchOffers = () => {
    axiosClient
      .get("/offers")
      .then((response) => {
        setOffers(response.data.data);
        setUserOrOffer("offers");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <DisplayNavbar />
      <div className="flex flex-col lg:flex-row"> 
        <Sidebar/>
        <MobileSidebar/>
        <div className="flex-1 relative">
          <div className="fixed inset-0 -z-10 bg-primary-base [background:radial-gradient(125%_125%_at_50%_10%,#265073_40%,#2D9596_100%)]"></div>
          <div className="flex flex-col justify-start w-full h-screen">
            {userOrOffer === "users" ? (
            <ul className="list-none p-0 m-0 max-h-[95vh] overflow-y-auto">
              <li className="mb-5 py-4 my-4 px-20 mx-10 lg:mx-32 rounded-md flex justify-between">
                <p className="text-2xl text-white">Ime i prezime</p>
                <p className="text-2xl text-white">Email</p>
                <p className="text-2xl text-white">Uloga</p>
                <p className="text-2xl text-white">Akcije</p>
              </li>
              {users.map((user) => (
                <li
                  key={user.id}
                  className="bg-gray-200 mb-5 py-4 my-4 pl-20 pr-10 mx-10 lg:mx-32 rounded-md flex justify-between items-center"
                >
                  <p className="text-xl text-primary-base max-w-[110px] break-words">{user.name}</p>
                  <p className="text-xl text-primary-base">{user.email}</p>
                  <p className="text-xl text-primary-base">{user.role}</p>
                  <div className="flex gap-x-3 justify-center items-center">
                    <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded" onClick={() => deleteUser(user.id)}>Izbriši</button>
                    <Link to={`${user.id}/edit`} className="bg-secondary-base hover:bg-secondary-shadow text-white py-2 px-4 rounded">Uredi</Link>
                  </div>
                </li>
              ))}
            </ul>) : (
              <ul className="list-none p-0 m-0 max-h-[95vh] overflow-y-auto">
                <li className="mb-5 py-4 my-4 px-20 mx-10 lg:mx-32 rounded-md flex justify-between">
                <p className="text-2xl text-white">Naslov</p>
                <p className="text-2xl text-white">Opis</p>
                <p className="text-2xl text-white">Prijave</p>
                <p className="text-2xl text-white">Akcije</p>
              </li>
              {offers.map((offer) => (
                <li
                  key={offer.id}
                  className="bg-gray-200 mb-5 py-4 my-4 pl-20 pr-10 mx-10 lg:mx-32 rounded-md flex justify-between items-center"
                >
                  <p className="text-xl text-primary-base max-w-[100px] break-words">{offer.title}</p>
                  <p className="text-xl text-primary-base ">{offer.description.length > 20 ? offer.description.substring(0, 20) + "..." : offer.description} </p>
                  <p className="text-xl text-primary-base">{offer.applications}</p>
                  <div className="flex gap-x-3 justify-center items-center">
                    <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded" onClick={() => deleteOffer(offer.id)}>Izbriši</button>
                    <Link to={`${offer.id}/edit`} className="bg-secondary-base hover:bg-secondary-shadow text-white py-2 px-4 rounded">Uredi</Link>
                  </div>
                </li>
              ))}
            </ul>)}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminPanel;

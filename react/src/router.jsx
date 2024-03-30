import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import Register from "./views/Register";
import Login from "./views/Login";
import About from "./views/About";
import AddJob from "./views/AddJob";
import Profile from "./views/Profile";
import AllOffers from "./views/Offers/AllOffers";

const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage/>
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/about',
        element: <About/>
    },
    {
        path: '/addjob',
        element: <AddJob/>
    },
    {
        path: '/profile',
        element: <Profile/>
    },
    {
        path: '/offers',
        element: <AllOffers/>
    },
])

export default router;
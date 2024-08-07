import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import Register from "./views/Register";
import Login from "./views/Login";
import About from "./views/About";
import AddJob from "./views/AddJob";
import Profile from "./views/Profile";
import AllOffers from "./views/Offers/AllOffers";
import DisplayOffer from "./views/Offers/DisplayOffer";
import FollowingOffers from "./views/Offers/FollowingOffers";
import MyOffers from "./views/Offers/MyOffers";
import SendApplication from "./views/SendApplication";
import EditJob from "./views/EditJob";
import Notifications from "./views/Notifications";
import ShowApplication from "./views/ShowApplication";
import Workers from "./views/Workers";
import UserProfile from "./views/UserProfile";
import { AuthRoute, NonAuthRoute, RoleRoute } from "./ProtectedRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />
    },
    {
        path: '*',
        element: <LandingPage />
    },
    {
        path: '/about',
        element: <About />
    },
    {
        path: '/offers',
        element: <AllOffers />
    },
    {
        path: '/',
        element: <AuthRoute />,
        children: [
            { path: 'profile', element: <Profile /> },
            { path: 'myoffers', element: <MyOffers /> },
            { path: 'offers/:id', element: <DisplayOffer /> },
            { path: 'profile/:id', element: <UserProfile /> },
            { 
                path: '/',
                element: <RoleRoute role="poslodavac" />,
                children: [
                    { path: 'addjob', element: <AddJob /> },
                    { path: 'offers/:id/edit', element: <EditJob /> },
                    { path: 'notifications', element: <Notifications /> },
                    { path: 'applications/:id', element: <ShowApplication /> },
                    { path: 'workers', element: <Workers /> },
                ]
            },
            { 
                path: '/',
                element: <RoleRoute role="radnik" />,
                children: [
                    { path: 'offers/following', element: <FollowingOffers /> },
                    { path: 'offers/:id/apply', element: <SendApplication /> },
                ]
            }
        ]
    },
    {
        path: '/',
        element: <NonAuthRoute />,
        children: [
            { path: 'register', element: <Register /> },
            { path: 'login', element: <Login /> },
        ]
    }
]);

export default router;

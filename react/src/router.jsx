import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import Register from "./views/Register";
import Login from "./views/Login";
import About from "./views/About";

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
])

export default router;
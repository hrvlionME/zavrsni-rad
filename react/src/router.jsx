import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import Register from "./views/Register";

const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage/>
    },
    {
        path: '/register',
        element: <Register/>
    },
])

export default router;
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "./context/ContextProvider";

export const AuthRoute = () => {
  const { token } = useStateContext();
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export const RoleRoute = ({ role }) => {
  const { user } = useStateContext();
  return user?.role === role ? <Outlet /> : <Navigate to="/" />;
};

export const NonAuthRoute = () => {
    const { token } = useStateContext();
    return !token ? <Outlet /> : <Navigate to="/" />;
};
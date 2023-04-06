import { Navigate, useRoutes } from "react-router-dom";
import { Login } from "./Login";
import { Home } from "./Home";
import { Signup } from "./Signup";

export const PageRoutes = () => {
  return useRoutes([
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/home", element: <Home /> },
    { path: "*", element: <Navigate to="/home" /> },
  ]);
};

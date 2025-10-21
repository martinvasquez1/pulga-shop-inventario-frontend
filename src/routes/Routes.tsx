import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "./Loadable";

/* ***Layouts**** */
const BlankLayout = Loadable(
  lazy(() => import("../layouts/blank-layout/BlankLayout"))
);
const AuthLayout = Loadable(lazy(() => import("../layouts/auth/AuthLayout")));
const MainLayout = Loadable(
  lazy(() => import("../layouts/dashboardLayout/MainLayout"))
);

/* ***End Layouts**** */
const Error = Loadable(lazy(() => import("../views/authentication/Error")));

/* ****Pages***** */
const Home = Loadable(lazy(() => import("../views/home/Home")));
const Login = Loadable(lazy(() => import("../views/authentication/Login")));
const Register = Loadable(
  lazy(() => import("../views/authentication/Register"))
);
const ResetPass = Loadable(
  lazy(() => import("../views/authentication/ResetPass"))
);

import AuthRoutes from "./../components/AuthRoutes";
import AppHome from "./../views/app/appHome";
import StorePage from "../views/app/storePage";

/* ****End Pages***** */

const Router = [
  {
    path: "/error",
    element: <BlankLayout />,
    children: [{ path: "404", element: <Error /> }],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "", exact: true, element: <Navigate to="/auth/login" /> },
      { path: "login", exact: true, element: <Login /> },
      {
        path: "register",
        exact: true,
        element: <Register />,
      },
      { path: "*", element: <Navigate to="/error/404" /> },
      { path: "404", exact: true, element: <Error /> },
    ],
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/app",
    element: <AuthRoutes />,
    children: [
      { path: "", exact: true, element: <AppHome /> },
      { path: "tiendas/:tiendaId", exact: true, element: <StorePage /> },
    ],
  },
  {
    path: "/error",
    element: <BlankLayout />,
    children: [
      { path: "*", element: <Navigate to="/error/404" /> },
      { path: "404", exact: true, element: <Error /> },
    ],
  },
];

export default Router;

import { Navigate, createBrowserRouter, redirect } from "react-router-dom";

import {
  Page404,
  Login,
  Register,
  User,
  Dashboard,
  Layout,
  UserProfile,
  Role,
  Menu,
} from "./routes";
import { getToken } from "@/utils/auth";
import { getUserInfo } from "@/store/user";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/index" />,
  },
  {
    path: "/index",
    loader: async () => {
      if (!getToken()) return redirect("/login");

      await getUserInfo();
      return <Layout />;
    },
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "user",
        children: [
          {
            path: "profile",
            element: <UserProfile />,
          },
        ],
      },
      {
        path: "system",
        children: [
          {
            path: "user",
            element: <User />,
          },
          {
            path: "role",
            element: <Role />,
          },
          {
            path: "menu",
            element: <Menu />,
          },
          {
            path: "dept",
            element: <User />,
          },
          {
            path: "post",
            element: <User />,
          },
          {
            path: "dict",
            element: <User />,
          },
          {
            path: "config",
            element: <User />,
          },
          {
            path: "notice",
            element: <User />,
          },
          {
            path: "operlog",
            element: <User />,
          },
          {
            path: "logininfor",
            element: <User />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

export default router;

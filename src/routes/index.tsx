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
  Dept,
  Post,
  Config,
  Notice,
  Operlog,
  Logininfor,
  Dict,
  DictData,
} from "./routes";
import { getToken } from "@/utils/auth";
import { getUserInfo } from "@/store/user";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/index/" />,
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
        element: <Navigate to="/index/" />,
      },
      {
        path: "index",
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
            element: <Dept />,
          },
          {
            path: "post",
            element: <Post />,
          },
          {
            path: "dict",
            element: <Dict />,
          },
          {
            path: "dict-type/:dictType",
            element: <DictData />,
          },
          {
            path: "config",
            element: <Config />,
          },
          {
            path: "notice",
            element: <Notice />,
          },
          {
            path: "operlog",
            element: <Operlog />,
          },
          {
            path: "logininfor",
            element: <Logininfor />,
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

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
  OnLine,
  Job,
  JobLog,
  Server,
  Swagger,
  UserNotice,
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
      getUserInfo();
      return <Layout />;
    },
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Navigate to="/index/dashboard" />,
      },
      {
        path: "dashboard",
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
        path: "userNotice",
        element: <UserNotice />,
      },
      {
        path: "userNotice/:id",
        element: <UserNotice />,
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
            path: "log/operlog",
            element: <Operlog />,
          },
          {
            path: "log/logininfor",
            element: <Logininfor />,
          },
        ],
      },
      {
        path: "monitor",
        children: [
          {
            path: "online",
            element: <OnLine />,
          },
          {
            path: "job",
            element: <Job />,
          },
          {
            path: "job-log/:jobLogId",
            element: <JobLog />,
          },
          {
            path: "server",
            element: <Server />,
          },
        ],
      },
      {
        path: "tool",
        children: [
          {
            path: "swagger",
            element: <Swagger />,
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

export const constantRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/index" />,
  },
  {
    path: "/index",
    loader: async () => {
      if (!getToken()) return redirect("/login");
      getUserInfo();
      return <Layout />;
    },
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Navigate to="/index/dashboard" />,
      },
      {
        path: "dashboard",
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
    ],
  },
  {
    path: "/login",
    Component: Login,
    // hidden: true
  },
  {
    path: "/register",
    Component: Register,
    // hidden: true
  },
  {
    path: "*",
    Component: Page404,
    // hidden: true
  },
]);

export default router;

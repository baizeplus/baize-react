import { Navigate, RouteObject, redirect } from "react-router-dom";

import {
  Page404,
  Login,
  Register,
  Dashboard,
  Layout,
  UserProfile,
  DictData,
  JobLog,
} from "./routes";
import { getToken } from "@/utils/auth";
import { Skeleton } from "antd";

export const constantRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/index" />,
  },
  {
    path: "/index",
    loader: async () => {
      if (!getToken()) return redirect("/login");
      // getUserInfo();
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
        path: "system/dict-type/:dictType",
        element: <DictData />,
      },
      {
        path: "monitor/job-log/:jobLogId",
        element: <JobLog />,
      },
      {
        path: "*",
        Component: Skeleton,
        // hidden: true
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
];

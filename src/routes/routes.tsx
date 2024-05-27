import { FC, Suspense, lazy } from "react";

export const WFC =
  (WrappedComponent: FC) => (props: JSX.IntrinsicAttributes) => {
    return (
      <Suspense>
        <WrappedComponent {...props} />
      </Suspense>
    );
  };

export const Login = WFC(lazy(() => import("@/pages/login/Login")));
export const Register = WFC(lazy(() => import("@/pages/login/Register")));

export const Layout = WFC(lazy(() => import("@/layout")));
export const UserProfile = WFC(lazy(() => import("@/pages/home/userProfile")));
export const UserNotice = WFC(
  lazy(() => import("@/pages/home/userNotice/UserNotice")),
);
export const Dashboard = WFC(lazy(() => import("@/pages/home/Dashboard")));

export const User = WFC(lazy(() => import("@/pages/system/user")));
export const DictData = WFC(lazy(() => import("@/pages/system/dict/DictData")));
export const JobLog = WFC(lazy(() => import("@/pages/monitor/job/JobLog")));

export const Page404 = WFC(lazy(() => import("@/pages/error/404")));

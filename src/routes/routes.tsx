// import { Spin } from 'antd';
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
export const Role = WFC(lazy(() => import("@/pages/system/role/Role")));
export const Menu = WFC(lazy(() => import("@/pages/system/menu/Menu")));
export const Dept = WFC(lazy(() => import("@/pages/system/dept/Dept")));
export const Post = WFC(lazy(() => import("@/pages/system/post/Post")));
export const Dict = WFC(lazy(() => import("@/pages/system/dict/Dict")));
export const DictData = WFC(lazy(() => import("@/pages/system/dict/DictData")));
export const Config = WFC(lazy(() => import("@/pages/system/config/Config")));
export const Notice = WFC(lazy(() => import("@/pages/system/notice/Notice")));

export const Operlog = WFC(
  lazy(() => import("@/pages/monitor/operlog/Operlog")),
);
export const Logininfor = WFC(
  lazy(() => import("@/pages/monitor/logininfor/Logininfor")),
);

export const OnLine = WFC(lazy(() => import("@/pages/monitor/onLine/OnLine")));
export const Job = WFC(lazy(() => import("@/pages/monitor/job/Job")));
export const JobLog = WFC(lazy(() => import("@/pages/monitor/job/JobLog")));
export const Server = WFC(lazy(() => import("@/pages/monitor/server/Server")));

export const Swagger = WFC(lazy(() => import("@/pages/tool/swagger/Swagger")));

export const Page404 = WFC(lazy(() => import("@/pages/error/404")));

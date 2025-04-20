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

export const routes = [
  {
    name: "System",
    path: "/system",
    hidden: false,
    component: () => import("@/layout"),
    // alwaysShow: true,
    permissions: ["system"],
    meta: { title: "系统管理", icon: "system", noCache: false },
  },
  {
    name: "Monitor",
    path: "/monitor",
    hidden: false,
    component: () => import("@/layout"),
    // alwaysShow: true,
    permissions: ["monitor"],
    meta: { title: "系统监控", icon: "monitor", noCache: false },
  },
  {
    name: "Tool",
    path: "/tool",
    hidden: false,
    component: () => import("@/layout"),
    // alwaysShow: true,
    permissions: ["tool"],
    meta: { title: "系统工具", icon: "tool", noCache: false },
  },
  {
    name: "User",
    parentName: "System",
    path: "user",
    hidden: false,
    component: () => import("@/pages/system/user"),
    permissions: ["system:user"],
    // alwaysShow: false,
    meta: { title: "用户管理", icon: "user", noCache: false },
  },
  {
    name: "Role",
    parentName: "System",
    path: "role",
    component: () => import("@/pages/system/role"),
    permissions: ["system:role"],
    meta: { title: "角色管理", icon: "peoples", noCache: false },
  },
  {
    name: "RoleAuth",
    parentName: "System",
    path: "role-auth/user/:roleId",
    component: () => import("@/pages/system/role/AuthUser"),
    hidden: true,
    permissions: ["system:role"],
    meta: { title: "分配用户", icon: "dict", noCache: false },
  },
  {
    name: "Permission",
    parentName: "System",
    path: "permission",
    hidden: false,
    component: () => import("@/pages/system/permission"),
    permissions: ["system:permission"],
    // alwaysShow: false,
    meta: { title: "权限管理", icon: "tree-table", noCache: false },
  },
  {
    name: "Dept",
    parentName: "System",
    path: "dept",
    hidden: false,
    component: () => import("@/pages/system/dept"),
    permissions: ["system:dept"],
    meta: { title: "部门管理", icon: "tree", noCache: false },
  },
  {
    name: "Post",
    parentName: "System",
    path: "post",
    hidden: false,
    component: () => import("@/pages/system/post"),
    permissions: ["system:post"],
    meta: { title: "岗位管理", icon: "post", noCache: false },
  },
  {
    name: "Dict",
    parentName: "System",
    path: "dict",
    hidden: false,
    component: () => import("@/pages/system/dict"),
    permissions: ["system:dict"],
    meta: { title: "字典管理", icon: "dict", noCache: false },
  },
  {
    name: "DictData",
    parentName: "System",
    path: "/dict-type/:dictType",
    component: () => import("@/pages/system/dict/DictData"),
    hidden: true,
    permissions: ["system:dict"],
    meta: { title: "字典数据", icon: "dict", noCache: false },
  },
  {
    name: "Config",
    path: "config",
    hidden: false,
    component: () => import("@/pages/system/config"),
    permissions: ["system:config"],
    meta: { title: "参数设置", icon: "edit", noCache: false },
  },
  {
    name: "Notice",
    parentName: "System",
    path: "notice",
    hidden: false,
    component: () => import("@/pages/system/notice"),
    permissions: ["system:notice"],
    meta: { title: "通知公告", icon: "message", noCache: false },
  },
  {
    name: "Log",
    parentName: "System",
    path: "log",
    hidden: false,
    component: () => import("@/layout"),
    permissions: ["system:monitor"],
    meta: { title: "日志管理", icon: "log", noCache: false },
  },
  {
    name: "Operlog",
    parentName: "Log",
    path: "operlog",
    hidden: false,
    component: () => import("@/pages/monitor/operlog"),
    permissions: ["system:monitor:operlog"],
    meta: { title: "操作日志", icon: "form", noCache: false },
  },
  {
    name: "Logininfor",
    parentName: "Log",
    path: "logininfor",
    hidden: false,
    component: () => import("@/pages/monitor/logininfor"),
    permissions: ["system:monitor:operlog"],
    meta: { title: "登录日志", icon: "logininfor", noCache: false },
  },
  {
    name: "Online",
    parentName: "Monitor",
    path: "online",
    hidden: false,
    component: () => import("@/pages/monitor/online"),
    permissions: ["monitor:online"],
    meta: { title: "在线用户", icon: "online", noCache: false },
  },
  {
    name: "Job",
    parentName: "Monitor",
    path: "job",
    hidden: false,
    component: () => import("@/pages/monitor/job"),
    permissions: ["monitor:job"],
    meta: { title: "定时任务", icon: "job", noCache: false },
  },
  {
    name: "Server",
    parentName: "Monitor",
    path: "server",
    hidden: false,
    component: () => import("@/pages/monitor/server"),
    permissions: ["monitor:server"],
    meta: { title: "服务监控", icon: "server", noCache: false },
  },
  {
    name: "Swagger",
    parentName: "Tool",
    path: "swagger",
    hidden: false,
    component: () => import("@/pages/tool/swagger"),
    permissions: ["tool:swagger"],
    meta: { title: "系统接口", icon: "swagger", noCache: false },
  },
];

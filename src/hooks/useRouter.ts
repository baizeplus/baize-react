/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { getRouters } from "@/api/router";

const modules = import.meta.glob([
  "../pages/**/*.tsx",
  "!../pages/**/components/*.tsx",
]);

export function useRouter() {
  const [sidebarRoutes, setSidebarRoutes] = useState([]);
  const getData = async () => {
    const { data } = await getRouters();
    console.log("meta", data);
    const sidebarRoutes = filterAsyncRouter(data);
    setSidebarRoutes(sidebarRoutes);
    console.log("sidebarRoutes", sidebarRoutes);
  };

  useEffect(() => {
    getData();
    // console.log('modules', modules)
  }, []);

  return { sidebarRoutes };
}

function filterAsyncRouter(asyncRouterMap: any) {
  return asyncRouterMap.map((route: Record<string, any>) => {
    if (route.children) {
      delete route.alwaysShow;
      return {
        ...route,
        label: route.meta.title,
        key: String(route.name).toLowerCase(),
        children: filterChildren(
          route.children,
          true,
          String(route.name).toLowerCase(),
        ),
      };
    }

    if (route.component) {
      if (route.component === "Layout") {
        return false;
      }
      route.component = loadView(route.component);
    }

    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children);
    } else {
      delete route["children"];
      delete route["redirect"];
    }
  });
}

function filterChildren(
  childrenMap: any,
  lastRouter = false,
  fatherKey?: string,
) {
  let children: any = [];
  childrenMap.forEach((el: any) => {
    if (el.hidden) return;
    // el.path = el.path
    delete el.alwaysShow;
    el.key = `${fatherKey}/${el.path}`;
    el.label = el.meta.title;
    if (el.children && el.children.length) {
      if (el.component === "ParentView") {
        el.children.forEach((c: any) => {
          delete c.alwaysShow;
          c.path = `${el.path}/${c.path}`;
          c.key = `${fatherKey}/${c.path}`;
          c.label = c.meta.title;
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c));
            return;
          }
          children.push(c);
        });
        return;
      }
    }
    if (lastRouter) {
      // console.log('什么来这', lastRouter)
      el.key = `${fatherKey}/${el.path}`;
      el.name = lastRouter?.meta?.title;
      if (el.children && el.children.length) {
        children = children.concat(filterChildren(el.children, el));
        return;
      }
    }
    children = children.concat(el);
  });
  return children;
}

const loadView = (view: string) => {
  let res;
  for (const path in modules) {
    const dir = path?.split("pages/")[1]?.split(".tsx")[0];
    // console.log(view)
    if (dir === view) {
      res = () => modules[path]();
    }
  }
  return res;
};

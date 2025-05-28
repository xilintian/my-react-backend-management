import { createBrowserRouter, Navigate } from "react-router-dom";
import Main from "../pages/main";
import Home from "../pages/home";
import User from "../pages/user";
import Mall from "../pages/mall";
import PageOne from "../pages/other/pageOne";
import PageTwo from "../pages/other/pageTwo";
import Login from "../pages/login";

// 路由组件映射表
const componentMap = {
  home: Home,
  user: User,
  mall: Mall,
  pageOne: PageOne,
  pageTwo: PageTwo,
};

// 将菜单数据转换为路由配置
const generateRoutes = (menuData) => {
  const routes = [];

  const processMenuItem = (item) => {
    if (item.children) {
      return {
        path: item.path,
        children: item.children.map(processMenuItem),
      };
    }

    const Component = componentMap[item.name];
    if (Component) {
      return {
        path: item.path,
        Component,
      };
    }
    return null;
  };

  menuData.forEach((item) => {
    const route = processMenuItem(item);
    if (route) {
      routes.push(route);
    }
  });

  return routes;
};

// 基础路由配置
const baseRoutes = [
  {
    path: "/",
    Component: Main,
    children: [
      {
        path: "/",
        element: <Navigate to="/home" />,
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
];

// 创建路由
const createRoutes = (menuData) => {
  const dynamicRoutes = generateRoutes(menuData);
  console.log("dynamicRoutes", dynamicRoutes);
  baseRoutes[0].children.push(...dynamicRoutes);
  console.log("baseRoutes", baseRoutes);
  return createBrowserRouter(baseRoutes);
};

export { createRoutes };
export default createRoutes([]); // 默认导出空路由配置

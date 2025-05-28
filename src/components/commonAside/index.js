import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Layout, Menu } from "antd";
import * as Icons from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { addTag, clearTags } from "../../store/reducers/tag";
import { useDispatch, useSelector } from "react-redux";

const { Sider } = Layout;

const whiteList = ["/login"];

// 将菜单配置转换为 Menu 组件需要的格式
const getMenuItems = (data) => {
  return data.map((item) => ({
    key: item.path,
    icon: item.icon ? React.createElement(Icons[item.icon]) : null,
    label: item.label,
    children: item.children ? getMenuItems(item.children) : null,
  }));
};

// 获取菜单项的标签文本
const getMenuLabel = (key, menuItems) => {
  const findLabel = (items) => {
    for (const item of items) {
      if (item.key === key) return item.label;
      if (item.children) {
        const label = findLabel(item.children);
        if (label) return label;
      }
    }
    return null;
  };
  return findLabel(menuItems);
};

const CommonAside = ({ isCollapse, tags }) => {
  const [currentPath, setCurrentPath] = useState("/home");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState([]);
  
  // 从 Redux 获取菜单数据
  const menuData = useSelector((state) => state.permission.menu);

  // 使用 useMemo 缓存菜单项，避免重复计算
  const menuItems = useMemo(() => getMenuItems(menuData), [menuData]);

  // 更新当前路径
  useEffect(() => {
    setCurrentPath(location.pathname);

    if (whiteList.includes(location.pathname)) return;

    // 处理 openKeys
    const pathSegments = location.pathname.split("/").filter(Boolean);
    if (pathSegments.length > 1) {
      setOpenKeys([`/${pathSegments[0]}`]);
    }

    const isCurrentPathInTags = tags.some(
      (tag) => tag.path === location.pathname
    );
    if (isCurrentPathInTags) return;

    if (location.pathname === "/") return;

    dispatch(
      addTag({
        path: location.pathname,
        label: getMenuLabel(location.pathname, menuItems),
      })
    );
  }, [location.pathname, menuItems]);

  // 处理菜单点击
  const handleMenuClick = useCallback(
    ({ key }) => {
      try {
        const label = getMenuLabel(key, menuItems);
        if (label) {
          navigate(key);
          dispatch(addTag({ path: key, label }));
        }
      } catch (error) {
        console.error("Menu click error:", error);
      }
    },
    [navigate, dispatch, menuItems]
  );

  // 处理菜单展开/收起
  const handleOpenChange = useCallback((keys) => {
    setOpenKeys(keys);
  }, []);

  return (
    <Sider trigger={null} collapsible collapsed={isCollapse}>
      <h3 className="app-name">{isCollapse ? "后台" : "通用后台管理系统"}</h3>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[currentPath]}
        defaultSelectedKeys={["/home"]}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        style={{ height: "100%" }}
        items={menuItems}
        onClick={handleMenuClick}
      />
    </Sider>
  );
};

export default CommonAside;

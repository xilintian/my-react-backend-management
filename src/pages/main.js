import { Outlet } from "react-router-dom";
import React from "react";
import { Layout, theme } from "antd";
import CommonTag from "../components/commonTag";
import CommonAside from "../components/commonAside";
import CommonHeader from "../components/commonHeader";
import { useSelector } from "react-redux";
import RouterAuth from "../router/routerAuth";

const { Content } = Layout;

const Main = () => {
  const isCollapse = useSelector((state) => state.tab.isCollapse);
  const tags = useSelector((state) => state.tag.tags);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <RouterAuth>
      <Layout>
        <CommonAside tags={tags} isCollapse={isCollapse} />
        <Layout>
          <CommonHeader isCollapse={isCollapse} />
          <CommonTag tags={tags} />
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </RouterAuth>
  );
};

export default Main;

import React from "react";
import { Button, Layout, Avatar } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useDispatch } from "react-redux";
import { setIsCollapse } from "../../store/reducers/tab";
import { local, session } from "../../utils/storage";
import { useNavigate } from "react-router-dom";
import { setToken, setMenu } from "../../store/reducers/permission";
import { clearTags } from "../../store/reducers/tag";

const { Header } = Layout;

const CommonHeader = ({ isCollapse }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    console.log("退出");
    local.clear();
    session.clear();
    dispatch(setToken(""));
    dispatch(setMenu([]));
    dispatch(clearTags());
    navigate("/login");
  };

  const items = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          个人中心
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a onClick={() => logout()} target="_blank" rel="noopener noreferrer">
          退出
        </a>
      ),
    },
  ];
  return (
    <Header style={styles.header}>
      <Button
        type="text"
        style={styles.button}
        icon={isCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => dispatch(setIsCollapse())}
      />
      <Dropdown menu={{ items }}>
        <Space>
          <Avatar
            style={styles.avatar}
            size={36}
            src={
              <img src={require("../../assets/images/avatar-default.jpg")} />
            }
          />
        </Space>
      </Dropdown>
    </Header>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "#fff",
  },
  button: {
    fontSize: "16px",
    width: 64,
    height: 32,
    backgroundColor: "#fff",
  },
  avatar: {
    borderRadius: "50%",
    cursor: "pointer",
  },
};

export default React.memo(CommonHeader);

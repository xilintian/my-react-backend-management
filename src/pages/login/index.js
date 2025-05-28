import React, { useState } from "react";
import { Input, Button, Form, message } from "antd";
import "./index.css";
import { getMenu } from "../../api";
import { local } from "../../utils/storage";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setMenu } from "../../store/reducers/permission";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const token = local.get("token");
  if (token) {
    return <Navigate to="/home" replace />;
  }

  const onFinish = async (values) => {
    try {
      if (!values.username || !values.password) {
        message.warning("请输入账号和密码");
        return;
      }
      setLoading(true);
      const { data } = await getMenu(values);
      local.set("token", data.data.token, 7200);
      local.set("menu", JSON.stringify(data.data.menu));
      dispatch(setToken(data.data.token));
      dispatch(setMenu(data.data.menu));
      navigate("/");
    } catch (error) {
      console.log(error);
      message.error("登录失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-title">系统登录</div>
        <div className="login-form">
          <Form form={form} onFinish={onFinish}>
            <Form.Item name="username" label="账号">
              <Input placeholder="请输入账号" />
            </Form.Item>
            <Form.Item name="password" label="密码">
              <Input.Password placeholder="请输入密码" />
            </Form.Item>
            <Form.Item className="login-btn">
              <Button type="primary" htmlType="submit" loading={loading}>
                {loading ? "登录中..." : "登录"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;

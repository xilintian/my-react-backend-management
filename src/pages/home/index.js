import React, { useState, useEffect } from "react";
import { Row, Col, Card, Table } from "antd";
import * as Icons from "@ant-design/icons";
import "./home.css";
import { getHomeData } from "../../api";

import * as echarts from "echarts";

import Echarts from "../../components/echarts";

const columns = [
  {
    title: "课程",
    dataIndex: "name",
  },
  {
    title: "今日购买",
    dataIndex: "todayBuy",
  },
  {
    title: "本月购买",
    dataIndex: "monthBuy",
  },
  {
    title: "总购买",
    dataIndex: "totalBuy",
  },
];

const countData = [
  {
    name: "今日支付订单",
    value: 1234,
    icon: "CheckCircleOutlined",
    color: "#2ec7c9",
  },
  {
    name: "今日收藏订单",
    value: 3232,
    icon: "StarOutlined",
    color: "#f09d42",
  },
  {
    name: "今日未支付订单",
    value: 432,
    icon: "ClockCircleOutlined",
    color: "#f09d42",
  },
  {
    name: "本月支付订单",
    value: 3232,
    icon: "CheckCircleOutlined",
    color: "#2ec7c9",
  },
  {
    name: "本月收藏订单",
    value: 3232,
    icon: "StarOutlined",
    color: "#f09d42",
  },
  {
    name: "本月未支付订单",
    value: 3232,
    icon: "ClockCircleOutlined",
    color: "#f09d42",
  },
];

const Home = () => {
  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const handleGetHomeData = async () => {
      const res = await getHomeData();
      console.log(res.data.data);
      setTableData(res.data.data.tableData);
      setChartData(res.data.data);
    };

    handleGetHomeData();
  }, []);

  return (
    <Row className="home" gutter={20}>
      <Col span={8}>
        <Card hoverable>
          <div className="user-info">
            <img src={require("../../assets/images/avatar-default.jpg")} />
            <div className="user-info-text">
              <span>Admin</span>
              <span>超级管理员</span>
            </div>
          </div>
          <div className="login-info">
            <div className="login-info-item">
              <p>
                上次登录时间: <span>2021-01-01 12:00:00</span>
              </p>
              <p>
                上次登录地点: <span>Sydney</span>
              </p>
            </div>
          </div>
        </Card>
        <Card className="table-card" hoverable>
          <Table
            rowKey={(record) => record.name}
            pagination={false}
            columns={columns}
            dataSource={tableData}
          />
        </Card>
      </Col>
      <Col span={16}>
        <div className="count-container">
          {countData.map((item) => (
            <Card key={item.name}>
              <div
                className="count-item-icon"
                style={{ backgroundColor: item.color }}
              >
                {React.createElement(Icons[item.icon])}
              </div>
              <div className="count-item-text">
                <p>￥{item.value}</p>
                <p>{item.name}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="chart-container">
          {chartData.orderData && (
            <Echarts
              style={{ width: "100%", height: "260px" }}
              chartData={chartData.orderData}
              chartType="line"
            />
          )}
          <div className="small-chart-container">
            {chartData.userData && (
              <Echarts
                style={{ width: "50%", height: "260px" }}
                chartData={chartData.userData}
                chartType="bar"
              />
            )}
            {chartData.videoData && (
              <Echarts
                style={{ width: "50%", height: "260px" }}
                chartData={chartData.videoData}
                chartType="pie"
              />
            )}
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Home;

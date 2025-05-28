import Mock from "mockjs";

export default {
  getStatisticalData: () => {
    const list = [];
    for (let i = 0; i < 7; i++) {
      list.push(
        Mock.mock({
          苹果: Mock.Random.integer(100, 8000, 0, 0),
          vivo: Mock.Random.integer(100, 8000, 0, 0),
          小米: Mock.Random.integer(100, 8000, 0, 0),
          oppo: Mock.Random.integer(100, 8000, 0, 0),
          三星: Mock.Random.integer(100, 8000, 0, 0),
          魅族: Mock.Random.integer(100, 8000, 0, 0),
        })
      );
    }
    return {
      code: 200,
      data: {
        videoData: [
          {
            name: "苹果",
            value: 999,
          },
          {
            name: "vivo",
            value: 1000,
          },
          {
            name: "小米",
            value: 1999,
          },
          {
            name: "oppo",
            value: 2999,
          },
          {
            name: "三星",
            value: 3999,
          },
          {
            name: "魅族",
            value: 4999,
          },
        ],
        userData: [
          {
            data: "周一",
            new: 5,
            active: 200,
          },
          {
            data: "周二",
            new: 10,
            active: 300,
          },
          {
            data: "周三",
            new: 15,
            active: 400,
          },
          {
            data: "周四",
            new: 20,
            active: 500,
          },
          {
            data: "周五",
            new: 25,
            active: 600,
          },
          {
            data: "周六",
            new: 30,
            active: 700,
          },
          {
            data: "周日",
            new: 35,
            active: 800,
          },
        ],
        orderData: {
          date: [
            "20191001",
            "20191002",
            "20191003",
            "20191004",
            "20191005",
            "20191006",
            "20191007",
          ],
          data: list,
        },
        tableData: [
          {
            name: "苹果",
            todayBuy: 100,
            monthBuy: 300,
            totalBuy: 400,
          },
          {
            name: "vivo",
            todayBuy: 200,
            monthBuy: 400,
            totalBuy: 600,
          },
          {
            name: "小米",
            todayBuy: 300,
            monthBuy: 500,
            totalBuy: 800,
          },
          {
            name: "oppo",
            todayBuy: 400,
            monthBuy: 600,
            totalBuy: 1000,
          },
          {
            name: "三星",
            todayBuy: 500,
            monthBuy: 700,
            totalBuy: 1200,
          },
          {
            name: "魅族",
            todayBuy: 600,
            monthBuy: 800,
            totalBuy: 1400,
          },
        ],
      },
    };
  },
};

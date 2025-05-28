import Mock from "mockjs";
import MenuList from "../../config";

export default {
  getMenu: (config) => {
    const { username, password } = JSON.parse(config.body);
    if (username === "admin" && password === "admin") {
      return {
        code: 200,
        data: {
          menu: [...MenuList],
          token: Mock.Random.guid(),
          message: "获取成功",
        },
      };
    } else if (username === "user" && password === "user") {
      return {
        code: 200,
        data: {
          menu: [...MenuList].filter((item, index) => index <= 1),
          token: Mock.Random.guid(),
          message: "获取成功",
        },
      };
    } else {
      return {
        code: 401,
        message: "账号或密码错误",
      };
    }
  },
};

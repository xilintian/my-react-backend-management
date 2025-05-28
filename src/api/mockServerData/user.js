import Mock from "mockjs";
import dayjs from "dayjs";

function param2Obj(url) {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
}

let list = [];
const count = 200;

for (let i = 0; i < count; i++) {
  list.push(
    Mock.mock({
      id: Mock.Random.id(),
      name: Mock.Random.cname(),
      addr: Mock.mock("@county(true)"),
      "age|18-60": 1,
      birth: dayjs(Mock.Random.date()).format("YYYY-MM-DD"),
      sex: Mock.Random.integer(0, 1),
    })
  );
}

export default {
  /**
   * 获取用户列表
   * name 可选参数 page limit 有默认值
   * @param {Object} config
   * @returns {code: number, list: Array, count: number}
   */
  getUserList: (config) => {
    const { name, page = 1, limit = 10 } = param2Obj(config.url);
    const mockList = list.filter((user) => {
      if (
        name &&
        user.name.indexOf(name) === -1 &&
        user.addr.indexOf(name) === -1
      )
        return false;
      return true;
    });
    const pageList = mockList.filter(
      (item, index) => index < limit * page && index >= limit * (page - 1)
    );
    return {
      code: 200,
      list: pageList,
      count: mockList.length,
    };
  },

  /**
   * 新增用户
   * @param {Object} config
   * @returns {code: number, message: string}
   */
  addUser: (config) => {
    const { name, addr, age, birth, sex } = JSON.parse(config.body);
    list.unshift({
      id: Mock.Random.id(),
      name,
      addr,
      age,
      birth,
      sex: +sex,
    });
    return {
      code: 200,
      message: "新增成功",
    };
  },

  /**
   * 编辑用户
   * @param {Object} config
   * @returns {code: number, message: string}
   */
  editUser: (config) => {
    const { id, name, addr, age, birth, sex } = JSON.parse(config.body);

    list = list.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          name,
          addr,
          age,
          birth,
          sex: +sex,
        };
      }
      return user;
    });
    return {
      code: 200,
      message: "编辑成功",
    };
  },

  /**
   * 删除用户
   * @param {Object} config
   * @returns {code: number, message: string}
   */
  deleteUser: (config) => {
    const { id } = JSON.parse(config.body);
    list = list.filter((user) => user.id !== id);
    return {
      code: 200,
      message: "删除成功",
    };
  },

  /**
   * 获取用户详情
   * @param {Object} config
   * @returns {code: number, data: Object}
   */
  getUserById: (config) => {
    const { id } = param2Obj(config.url);
    const user = list.find((user) => user.id === id);
    return {
      code: 200,
      data: user,
    };
  },
};

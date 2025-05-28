import Mock from "mockjs";
import homeApi from "./mockServerData/home";
import userApi from "./mockServerData/user";
import permissionApi from "./mockServerData/permission";

Mock.mock(/home\/getData/, homeApi.getStatisticalData);

Mock.mock(/user\/getUserList/, userApi.getUserList);
Mock.mock(/user\/addUser/, "post", userApi.addUser);
Mock.mock(/user\/editUser/, "post", userApi.editUser);
Mock.mock(/user\/deleteUser/, "post", userApi.deleteUser);
Mock.mock(/user\/getUserById/, userApi.getUserById);

Mock.mock(/permission\/getMenu/, "post", permissionApi.getMenu);

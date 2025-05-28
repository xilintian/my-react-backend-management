import http from "./axios";

export const getHomeData = (params) =>
  http.request({
    url: "/home/getData",
    method: "get",
    params,
  });

export const getUserList = (params) =>
  http.request({
    url: "/user/getUserList",
    method: "get",
    params,
  });

export const addUser = (data) =>
  http.request({
    url: "/user/addUser",
    method: "post",
    data,
  });

export const editUser = (data) =>
  http.request({
    url: "/user/editUser",
    method: "post",
    data,
  });

export const deleteUser = (data) =>
  http.request({
    url: "/user/deleteUser",
    method: "post",
    data,
  });

export const getUserById = (params) =>
  http.request({
    url: "/user/getUserById",
    method: "get",
    params,
  });

export const getMenu = (data) =>
  http.request({
    url: "/permission/getMenu",
    method: "post",
    data,
  });

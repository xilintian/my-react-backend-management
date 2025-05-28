import React from "react";
import { RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import { createRoutes } from "./router";
import "./App.css";

function App() {
  const menuData = useSelector((state) => state.permission.menu);
  const routes = createRoutes(menuData);
  return <RouterProvider router={routes} />;
}

export default App;

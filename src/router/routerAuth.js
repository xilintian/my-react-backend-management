import { Navigate } from "react-router-dom";
import { local } from "../utils/storage";

const RouterAuth = ({ children }) => {
  const token = local.get("token");
  return token ? children : <Navigate to="/login" replace />;
};

export default RouterAuth;

import { createSlice } from "@reduxjs/toolkit";
import { local } from "../../utils/storage";

const permissionSlice = createSlice({
  name: "permission",
  initialState: {
    token: local.get("token"),
    menu: JSON.parse(local.get("menu")) ?? [],
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setMenu: (state, action) => {
      state.menu = action.payload;
    },
  },
});

export const { setToken, setMenu } = permissionSlice.actions;
export default permissionSlice.reducer;

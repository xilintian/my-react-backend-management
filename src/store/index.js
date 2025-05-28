import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "./reducers/tab";
import tagReducer from "./reducers/tag";
import permissionReducer from "./reducers/permission";

const store = configureStore({
  reducer: {
    tab: tabReducer,
    tag: tagReducer,
    permission: permissionReducer,
  },
});

export default store;

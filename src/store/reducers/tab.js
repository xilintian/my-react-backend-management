import { createSlice } from "@reduxjs/toolkit";

const tabSlice = createSlice({
  name: "tab",
  initialState: {
    isCollapse: false,
  },
  reducers: {
    setIsCollapse: (state, action) => {
      state.isCollapse = !state.isCollapse;
    },
  },
});

const {
  actions: { setIsCollapse },
  reducer,
} = tabSlice;

export { setIsCollapse };
export default reducer;

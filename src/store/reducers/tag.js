import { createSlice } from "@reduxjs/toolkit";

const defaultTags = [{ path: "/home", label: "首页" }];

const tagSlice = createSlice({
  name: "tag",
  initialState: {
    tags: JSON.parse(sessionStorage.getItem("tags")) || [...defaultTags],
  },
  reducers: {
    addTag: (state, action) => {
      if (state.tags.some((tag) => tag.path === action.payload.path)) {
        return;
      }
      state.tags.push(action.payload);
      sessionStorage.setItem("tags", JSON.stringify(state.tags));
    },
    removeTag: (state, action) => {
      state.tags = state.tags.filter((tag) => tag.path !== action.payload);
      sessionStorage.setItem("tags", JSON.stringify(state.tags));
    },
    clearTags: (state, action) => {
      state.tags = [...defaultTags];
    },
  },
});

const {
  actions: { addTag, removeTag, clearTags },
  reducer,
} = tagSlice;

export { addTag, removeTag, clearTags };
export default reducer;

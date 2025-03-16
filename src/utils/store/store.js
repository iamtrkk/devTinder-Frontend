import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const store = configureStore({
  // Add slices in reducer
  reducer: {
    user: userReducer,
  },
});

export default store;

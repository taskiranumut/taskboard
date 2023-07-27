import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./board/boardSlice";

export const store = configureStore({
  reducer: boardReducer,
});

import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "@/stateManager/features/courses/courseSlice";

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
  },
});
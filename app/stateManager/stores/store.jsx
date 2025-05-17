import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "@/app/stateManager/features/courses/courseSlice.jsx";

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
  },
});

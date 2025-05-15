import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from '../features/courses/courseSlices';

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
  },
});
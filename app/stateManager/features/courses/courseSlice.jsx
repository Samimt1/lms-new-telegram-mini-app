import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

// Fetch all courses
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`/api/courses`)
      return res.data.courses
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Failed to load courses"
      )
    }
  }
)

//  Fetch user's favorite courses
export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (userId, thunkAPI) => {
    try {
      const res = await axios.get(`/api/favorites/${userId}`)
      return res.data.favorites.map((fav) => fav.course) // return only the course objects
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Failed to load favorites"
      )
    }
  }
)

// Add favorite
export const addFavorite = createAsyncThunk(
  "courses/addFavorite",
  async ({ userId, courseId }, thunkAPI) => {
    try {
      const res = await axios.post(`/api/favorites`, { userId, courseId })
      return res.data.favorite
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Failed to add favorite"
      )
    }
  }
)

// Remove favorite
export const removeFavorite = createAsyncThunk(
  "courses/removeFavorite",
  async ({ userId, courseId }, thunkAPI) => {
    try {
      await axios.delete(`/api/favorites/${userId}/${courseId}`)
      return { courseId }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Failed to remove favorite"
      )
    }
  }
)

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    favorites: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false
        state.courses = action.payload
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(addFavorite.fulfilled, (state, action) => {
        const course = state.courses.find(
          (c) => c.id === action.payload.courseId
        )
        if (course && !state.favorites.some((fav) => fav.id === course.id)) {
          state.favorites.push(course)
        }
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter(
          (fav) => fav.id !== action.payload.courseId
        )
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false
        state.favoriteCourses = action.payload
      })
  },
})

export default courseSlice.reducer

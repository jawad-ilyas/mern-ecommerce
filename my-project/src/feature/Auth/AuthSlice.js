import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, verifyUser } from './AuthAPI';

const initialState = {
  loggedInUser: null,
  status: 'idle',
  errors: null,
};

export const createUserAsync = createAsyncThunk(
  'auth/createUser',
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const verifyUserAsync = createAsyncThunk(
  'auth/verifyUser',
  async (userData) => {
    const response = await verifyUser(userData);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(verifyUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(verifyUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(verifyUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.errors = action.error;
      })
  },
});

export const { increment } = authSlice.actions;
export const selectLoggedInUser = (state) => state.auth.loggedInUser
export const selectError = (state) => state.auth.errors

export default authSlice.reducer;
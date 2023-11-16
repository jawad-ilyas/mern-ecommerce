import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, verifyUser, logOut } from './AuthAPI';
import { updateUser } from '../User/UserApi';
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
export const updateUserAsync = createAsyncThunk(
  'auth/updateUser',
  async (userData) => {
    const response = await updateUser(userData);
    return response.data;
  }
);
export const logOutAsync = createAsyncThunk(
  'auth/logOut',
  async () => {
    const response = await logOut();
    console.log(response)
    return response.data;
  }
);

export const verifyUserAsync = createAsyncThunk(
  'auth/verifyUser',
  async (userData) => {
    const response = await verifyUser(userData);
    console.log(response)
    console.log("verifyUserAsync function called into authslice ",response)
    return response;
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
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.errors = action.error;
      })
      .addCase(logOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = null;
      })

  },
});

export const { increment } = authSlice.actions;
export const selectLoggedInUser = (state) => state.auth.loggedInUser
export const selectError = (state) => state.auth.errors

export default authSlice.reducer;
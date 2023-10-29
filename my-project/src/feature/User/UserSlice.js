import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchOrderByUserId, fetchAllDataForProfile } from './UserApi';

const initialState = {
  ordersInfo: [],
  status: 'idle',
  userInfo: null
};

export const fetchOrderByUserIdAsync = createAsyncThunk(
  'User/fetchOrderByUserId',
  async (id) => {
    console.log(id)
    const response = await fetchOrderByUserId(id);
    console.log(response)
    return response.data;
  }
);
export const fetchAllDataForProfileAsync = createAsyncThunk(
  'User/fetchAllDataForProfile',
  async (id) => {
    console.log(id)
    const response = await fetchAllDataForProfile(id);
    console.log("i am th profile data " + response.data)
    return response.data;
  }
);
export const updateUserAsync = createAsyncThunk(
  'auth/updateUser',
  async (userData) => {
    const response = await updateUser(userData);
    return response.data[0];
  }
);
export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrderByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.ordersInfo = action.payload;
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
      .addCase(fetchAllDataForProfileAsync.pending, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(fetchAllDataForProfileAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(action.payload[0])
        state.userInfo = action.payload;
      })
  },
});

export const { increment } = UserSlice.actions;

export const selectOrdersInfo = (state) => state.User.ordersInfo;
export const selectUserInfo = (state) => state.User.userInfo;

export default UserSlice.reducer;
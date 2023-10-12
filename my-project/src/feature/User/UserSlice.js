import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchOrderByUserId } from './UserApi';

const initialState = {
  ordersInfo: [],
  status: 'idle',
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
export const updateUserAsync = createAsyncThunk(
  'auth/updateUser',
  async (userData) => {
    const response = await updateUser(userData);
    return response.data;
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
  },
});

export const { increment } = UserSlice.actions;

export const selectOrdersInfo = (state) => state.User.ordersInfo;

export default UserSlice.reducer;
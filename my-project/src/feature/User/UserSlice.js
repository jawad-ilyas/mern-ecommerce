import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchOrderByUserId } from './counterAPI';

const initialState = {
  ordersInfo: [],
  status: 'idle',
};

export const fetchOrderByUserIdAsync = createAsyncThunk(
  'User/fetchOrderByUserId',
  async (id) => {
    const response = await fetchOrderByUserId(id);
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
      });
  },
});

export const { increment } = UserSlice.actions;

export const selectOrdersInfo = (state) => state.User.ordersInfo;

export default UserSlice.reducer;
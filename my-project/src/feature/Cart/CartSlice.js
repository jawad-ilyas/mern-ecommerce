import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, fetchItemByUserId, updateCart } from './CartAPI';
const initialState = {
  value: 0,
  status: 'idle',
  items: []
};

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item)
    return response.data

  }
)
export const fetchItemByUserIdAsync = createAsyncThunk(
  'cart/fetchItemByUserId',
  async (userId) => {
    const response = await fetchItemByUserId(userId)
    return response.data

  }
)
export const updateCartAsync = createAsyncThunk(
  'cart/updateCart',
  async (userId) => {
    const response = await updateCart(userId)
    return response.data

  }
)

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.items.push(action.payload);
      })
      .addCase(fetchItemByUserIdAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchItemByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.items = action.payload;
      })
      .addCase(updateCartAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        const index = state.items.findIndex(item => item.id === action.payload.id); // Check if 'id' is the correct property for identification
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })



  },
});

export const { increment } = cartSlice.actions;

export const selectItemsIntoAddToCart = (state) => state.cart.items;
// export const selectAllItemsIntoCart = (state) => state.cart.items;

export default cartSlice.reducer;
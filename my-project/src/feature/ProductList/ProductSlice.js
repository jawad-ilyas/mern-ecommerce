import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchProductByFilter, fetchAllCatageroy, fetchAllBrands  , fetchProductById } from './ProductApi';
const initialState = {
  value: 0,
  totalItems: 0,
  products: [],
  brands: [],
  catageroy: [],
  productId : null,
  status: 'idle',
};

export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    // console.log(response)
    return response.data;
  }
);
export const fetchProductByFilterAsync = createAsyncThunk(
  'product/fetchProductByFilter',
  async ({ filter, sort, paginationValue }) => {
    // console.log(paginationValue)
    const response = await fetchProductByFilter(filter, sort, paginationValue);
    const totalItems = response.totalItems; // Assuming your API response has a 'totalItems' property
    const products = response.data;
    // console.log(products, totalItems)
    return { products, totalItems };
  }
);

export const fetchAllBrandsAsync = createAsyncThunk(
  'product/fetchAllBrands',
  async () => {
    const response = await fetchAllBrands();
    // console.log("brands" + response.brands)
    return response.brands
  }
);
export const fetchAllCatageroyAsync = createAsyncThunk(
  'product/fetchAllCatageroy',
  async () => {
    const response = await fetchAllCatageroy();
    // console.log("catageroy " + response.catageroy)
    return response.catageroy
  }
);
export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    console.log("response : " + response.productId)

    return response.productId
  }
);




export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProductByFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products; // products remains an array
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchAllBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;

      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.productId = action.payload;

      })
      .addCase(fetchAllCatageroyAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCatageroyAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.catageroy = action.payload;

      });

  },
});

export const { increment } = productSlice.actions;

export const allProducts = (state) => state.product.products;
export const totalItems = (state) => state.product.totalItems;
export const allBrands = (state) => state.product.brands;
export const selectCatageroy = (state) => state.product.catageroy;
export const selectProduct = (state) => state.product.productId;

export default productSlice.reducer;
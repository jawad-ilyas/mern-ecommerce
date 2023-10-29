import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts, deleteProduct, fetchProductByFilter, updateProduct, fetchAllCatageroy, fetchAllBrands, fetchProductById  ,addProduct} from './ProductApi';
const initialState = {
  value: 0,
  totalItems: 0,
  products: [],
  brands: [],
  catageroy: [],
  productId: null,
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

export const updateProductAsync = createAsyncThunk(
  'product/updateProduct',
  async (update) => {
    const response = await updateProduct(update);
    return response.data
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
    // console.log(id)
    const response = await fetchProductById(id);
    // console.log("response : " + response.productId)

    return response.productId
  }
);
export const addProductAsync = createAsyncThunk(
  'product/addProduct',
  async (data) => {
    // console.log(id)
    const response = await addProduct(data);
    // console.log("response : " + response.productId)

    return response
  }
);
export const deleteProductAsync = createAsyncThunk(
  'product/deleteProduct',
  async (data) => {
    // console.log(id)
    const response = await deleteProduct(data);
    // console.log("response : " + response.productId)

    return response
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

      })
      .addCase(addProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload);

      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';

        console.log("i am the action payload");

        const index = state.products.findIndex(item => item.id === action.payload.id); // Check if 'id' is the correct property for identification
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';

        const index = state.products.findIndex(item => item.id === action.payload.id); // Check if 'id' is the correct property for identification
        if (index !== -1) {
          state.products.splice(index , 1)
        }
      })

  },
});

export const { increment } = productSlice.actions;

export const allProducts = (state) => state.product.products;
export const totalItems = (state) => state.product.totalItems;
export const allBrands = (state) => state.product.brands;
export const selectCatageroy = (state) => state.product.catageroy;
export const selectProduct = (state) => state.product.productId;

export default productSlice.reducer;
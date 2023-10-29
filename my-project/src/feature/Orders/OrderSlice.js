import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { allOrders ,updateOrder ,deleteOrder } from './OrderApi';

const initialState = {
    allOrdersInfo: [],
    status: 'idle',
    
};



export const allOrdersAsync = createAsyncThunk(
    'Order/allOrders',
    async  ()=>{
        const response = await allOrders();

        console.log(response)
        return response;
    }

)
export const updateOrderAsync = createAsyncThunk(
    'Order/updateOrder',
    async  (order)=>{
      console.log(order)
        const response = await updateOrder(order);

        console.log(response)
        return response;
    }

)
export const deleteOrderAsync = createAsyncThunk(
    'Order/deleteOrder',
    async  (order)=>{
      console.log(order)
        const response = await deleteOrder(order);

        console.log(response)
        return response.data;
    }

)

export const OrdersSlice = createSlice({
    name: 'Order',
    initialState,
    reducers: {
     
    },
    extraReducers: (builder) => {
      builder
        .addCase(allOrdersAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(allOrdersAsync.fulfilled, (state, action) => {
          state.status = 'idle';

          console.log(action.payload)
          state.allOrdersInfo = action.payload;
        })
        .addCase(updateOrderAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(updateOrderAsync.fulfilled, (state, action) => {
          state.status = 'idle';

          console.log(action.payload)
         const index =  state.allOrdersInfo.findIndex(item => item.id === action.payload.id)
         state.allOrdersInfo[index] = action.payload;})
        .addCase(deleteOrderAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(deleteOrderAsync.fulfilled, (state, action) => {
          state.status = 'idle';

          console.log(action.payload)
          const index = state.allOrdersInfo.findIndex(item => item.id == action.payload.id); // Check if 'id' is the correct property for identification
          console.log(index)
          if (index !== -1) {
            state.allOrdersInfo.splice(index, 1)
          }
        
        
        
        })
       
    },
  });



  export const allOrdersInfos = (state)=>state.Order.allOrdersInfo;



  export default OrdersSlice.reducer;
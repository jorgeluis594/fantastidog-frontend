import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { list } from '../../services/productService'

export const listProducts = createAsyncThunk('products/listProducts', list)

export const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        error: {},
        status: '',
    },
    reducers: {},
    extraReducers: {
        [listProducts.fulfilled] : (state, action) => {
            state.status = 'succeeded';
            state.productsLoaded = true;
            state.products = [...action.payload.body]
        },

        [listProducts.pending]: (state) => {
            state.status = 'loading';
        },

        [listProducts.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = {
                error: action.error.message,
                status: action.error.status,
            }
        },
    }
})


export default productSlice.reducer
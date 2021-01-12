import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { list } from '../../services/deliveriesService'

export const listDeliveries = createAsyncThunk('deliveries/listDeliveries', list)

export const deliveriesSlice = createSlice({
    name: "deliveries",
    initialState: {
        deliveries: [],
        error: {},
        status: '',
    },
    reducers: {},
    extraReducers: {
        [listDeliveries.fulfilled] : (state, action) => {
            state.status = 'succeeded';
            state.deliveriesLoaded = true;
            state.deliveries = [...action.payload.body]
        },

        [listDeliveries.pending]: (state) => {
            state.status = 'loading';
        },

        [listDeliveries.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = {
                error: action.error.message,
                status: action.error.status,
            }
        },
    }
})


export default deliveriesSlice.reducer
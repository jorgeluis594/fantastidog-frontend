import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { list, get, update, deliver, send } from '../../services/ordersService'

export const listOrders = createAsyncThunk('orders/listOrders', list);

export const getOrder = createAsyncThunk('orders/getOrder', get)

export const updateOrder = createAsyncThunk(
    'orders/updateOrder',
    ({orderId, ...data}) => update(orderId, {...data})
)

export const deliverOrder = createAsyncThunk('orders/deliverOrder', deliver)

export const sendOrder = createAsyncThunk('orders/senOrder', send)


export const orderSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        error: {},
        status: '',
    },
    reducers: {},
    extraReducers: {
        [listOrders.fulfilled] : (state, action) => {
            state.status = 'succeeded';
            state.loaded = true;
            state.orders = [...action.payload.body]
        },

        [listOrders.pending]: (state) => {
          state.status = 'loading';
        },

        [listOrders.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = {
                error: action.error.message,
                status: action.error.status,
            }
        },

        [getOrder.fulfilled]: findAndUpdateOrder,

        [getOrder.pending]: (state) => {
            state.status = 'loading';
        },

        [getOrder.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = {
                error: action.error.message,
                status: action.error.status,
            }
        },

        [updateOrder.fulfilled] : findAndUpdateOrder,

        [updateOrder.pending]: (state) => {
          state.status = 'loading_update';
        },

        [updateOrder.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = {
                error: action.error.message,
                status: action.error.status,
            }
        },
        [deliverOrder.fulfilled]: findAndUpdateOrder,

        [deliverOrder.pending]: (state) => {
            state.status = 'loading-deliver';
        },

        [deliverOrder.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = {
                error: action.error.message,
                status: action.error.status,
            }
        },

        [sendOrder.fulfilled]: (state, action) => {
            state.status = "success";
            console.log(action.payload.body);
            state.orders = [...state.orders, action.payload.body];
        },

        [sendOrder.pending]: (state) => {
            state.status = 'sending';
        },

        [sendOrder.rejected] : (state, action) => {
            state.status = 'failed';
            state.error = {error: action.error.message};
        }
    },
});

function findAndUpdateOrder(state, action) {
    state.status = 'succeeded';
    const order = action.payload.body
    const orderObjective = state.orders.find(stateOrder => stateOrder._id === order._id)
    if(orderObjective) {
        state.orders = state.orders.map(stateOrder => {
            if (order._id === stateOrder._id) return order;
            return stateOrder;
        })
    } else {
        state.orders = [order, ...state.orders];
    }
}

export default orderSlice.reducer;
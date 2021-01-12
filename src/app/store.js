import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import ordersReducer from '../features/orders/ordersSlice';
import productsReducer from "../features/product/productSlice";
import deliveriesReducer from '../features/deliveries/deliveriesSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    orders: ordersReducer,
    products: productsReducer,
    deliveries: deliveriesReducer,
  },
});

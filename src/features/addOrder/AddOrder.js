import React from "react";
import {useDispatch} from "react-redux";

import OrderForm from "../../components/OrderForm";
import { sendOrder } from '../orders/ordersSlice'

export default function AddOrder() {
    const dispatch = useDispatch();
    function sendNewOrder(order) {
        return dispatch(sendOrder(order));
    }
    return (<OrderForm handleSubmit={sendNewOrder} orderDefault={{}}/>);
}
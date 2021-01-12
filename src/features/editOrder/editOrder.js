import React, {useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux'

import OrderForm from "../../components/OrderForm";
import { getOrder, updateOrder } from '../orders/ordersSlice'

export default function EditOrder({match: {params: {id}}}) {
    const dispatch = useDispatch();
    const order = useSelector(state => state.orders.orders.find(order => order._id === id));
    useEffect(()=>{
        if(!order) dispatch(getOrder(id));
    }, [order]);

    async function handleUpdate(data) {
        const {_id, ...order} = data;
        console.log({_id, order});
        return dispatch(updateOrder({orderId: _id, ...order}));
    }

    return order ? (<OrderForm handleSubmit={handleUpdate} orderDefault={order}/>) : null;
}
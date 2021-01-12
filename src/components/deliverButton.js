import React from "react";
import {Button} from "@chakra-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { deliverOrder } from "../features/orders/ordersSlice";

export default function DeliverButton({orderId}) {

    const dispatch = useDispatch();
    const loading = useSelector(state => state.orders.status) === 'loading-deliver';
    const handleClick = e => {
        e.preventDefault();
        dispatch(deliverOrder(orderId));
    }

    return (
        <Button mr={3} isLoading={loading} onClick={handleClick} variantColor="yellow">Entregar</Button>
    );
}
import React, {useEffect} from "react";
import { Grid} from "@chakra-ui/core";
import { useDispatch, useSelector } from 'react-redux';

import OrderCard from "./OrderCard";
import { listOrders } from "./ordersSlice"
import SpinnerLoad from "../../components/Spinner";
import {Link} from "react-router-dom";

export default function Orders() {
    const {orders, status, loaded} = useSelector(state => state.orders);
    const dispatch = useDispatch();

    // Load Orders
    useEffect(()=> {
        if (!loaded) dispatch(listOrders());
    }, []);

    if (status === 'loading') {
        return (
            <SpinnerLoad/>
        );
    }

    return (
        <Grid
            py={6}
            px={[3, 4, 6]}
            gap={[3,5]}
            gridTemplateColumns={{sm: "repeat(2, 1fr)", md: "repeat(3,1fr)", lg: "repeat(4, 1fr)"}}
            gridAutoRows="27.25rem"
        >
            { orders.map((order) => (
                <Link to={`pedidos/${order._id}`} key={order._id} >
                    <OrderCard order={order}/>
                </Link>
            ))}
        </Grid>
    );
}

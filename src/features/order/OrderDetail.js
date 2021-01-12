import React, {useEffect} from "react";
import {Box, Divider, Flex, Heading, Text} from "@chakra-ui/core";
import { useDispatch, useSelector } from 'react-redux'

import { getOrder } from '../orders/ordersSlice'
import { format } from '../../utils/dates'
import OrderBadge from "../../components/OrderBadge";
import OrderButtons from "../../components/OrderButtons";

export default function OrderDetail({match}) {
    const orderId = match.params.id;
    const order = useSelector(state => state.orders.orders.find(order => order._id === orderId))

    const dispatch = useDispatch();

    useEffect(()=>{
        if (!order || !order.products) dispatch(getOrder(orderId));
    }, [])

    function DetailItem({attr, content, mb}) {
        return (
            <Flex w="100%" mb={mb}>
                <Text mr={[2,5]} w={{sm: "28%", md:"35%"}} fontWeight="600" as="span">{attr}:</Text>
                <Text>{content}</Text>
            </Flex>
        );
    }

    function ProductDetail({product}) {
        return (
            <>
                <Divider/>
                <Heading mb="1" fontFamily="title" fontSize="lg">{product.name}</Heading>
                <DetailItem mb="1" attr="Costo" content={product.cost} />
                { product.attributes.map((attribute)=> (
                    <DetailItem mb="1" key={attribute._id} attr={attribute.name} content={attribute.body} />
                )) }
            </>
        );
    }

    return(
        <Flex
            w={{sm: "100%", md: "80%"}}
            mx="auto"
            my="5"
            border="1px"
            borderColor="teal.300"
            borderRadius="lg"
            p={[2, 4]}
            flexWrap="wrap"
        >
            <Flex alignItems="center" w="100%" mb={[2,4]}>
                <Heading mr="4" fontFamily="title" textTransform="capitalize" fontSize={["lg", "xl"]}>{order?.pet}</Heading>
                <OrderBadge state={order?.state} />
            </Flex>
            <Box w={{ sm: "100%", md: "48%"}} borderRight={{md: "1px solid #4FD1C5"}}>
                <DetailItem mb={2} attr="Dueño" content={order?.owner} />
                <DetailItem mb={2} attr="Social" content={order?.social} />
                { order?.phone && <DetailItem mb={2} attr="Teléfono" content={order?.phone}/>}
                <DetailItem mb={2} attr="Dirección" content={order?.address} />
                <DetailItem mb={2} attr="Fecha de entrega" content={order && format(order.deliveryDate)} />
                <DetailItem mb={2} attr="Delivery" content={order?.delivery.name} />
                <DetailItem mb={5} attr="Costo de Delivery" content={order?.delivery.cost} />
                <OrderButtons order={order || {}} />
            </Box>
            <Box w={{sm: "100%", md:"48%"}} px={{sm: "0", md:"3"}} mt={{sm: "3"}}>
                <Heading mb={[2, 4]} fontFamily="title" fontSize={["lg", "xl"]}>Productos</Heading>
                { order?.products?.map((product) => (
                    <ProductDetail key={product._id} product={product} />
                )) }
            </Box>
        </Flex>
    );
}
import React, {useState} from "react";
import {Box, Divider, Flex, Heading, Stack, Text, Icon, Button} from "@chakra-ui/core";
import {useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom';

import {format} from "../utils/dates";
import OrderModalForm from "./OrderModalForm";
import ProductModalForm from "./ProductModalForm";
import {sendOrder} from "../features/orders/ordersSlice"

function DetailItem({attr, content, mb}) {
    return (
        <Flex w="100%" mb={mb}>
            <Text mr={[2,5]} w={{sm: "28%", md:"35%"}} fontWeight="600" as="span">{attr}:</Text>
            <Text>{content}</Text>
        </Flex>
    );
}

function ProductDetail({id, product, updateProduct}) {
    return (
        <>
            <Divider/>
            <Stack isInline spacing={2} alignItems="center">
                <Heading mb="1" fontFamily="title" fontSize="lg">{product.name}</Heading>
                <ProductModalForm upSertProduct={updateProduct} id={id} product={product} description={<Icon name="edit" />} />
            </Stack>
            <DetailItem mb="1" attr="Costo" content={product.cost} />
            { product.attributes.map((attribute, idx)=> (
                <DetailItem mb="1" key={idx} attr={attribute.name} content={attribute.body} />
            )) }
        </>
    );
}

export default function AddOrder({orderDefault = {}, handleSubmit}) {
    const [order, setOrder] = useState(orderDefault);
    const dispatch = useDispatch();
    const history = useHistory();

    function updateOrder(orderData) {
        setOrder({...order, ...orderData});
    }

    function addProduct(product) {
        const products = [];
        if (order.products) products.push(...order.products);
        products.push(product);
        setOrder({...order, products});
    }

    function updateProduct(product, id) {
        const products = order.products.map((p, idx) => {
            if (idx === id) return product
            return p;
        })
        setOrder({...order, products});
    }

    function handleSendOrder() {
        handleSubmit(order).then(order => {history.push("/pedidos");})
    }

    return (
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
            {Object.entries(order).length ?
                <>
                    <Flex alignItems="center" w="100%" mb={[2,4]}>
                        <Heading mr="4" fontFamily="title" textTransform="capitalize" fontSize={["lg", "xl"]}>{order.pet}</Heading>
                        <OrderModalForm order={order} updateOrder={updateOrder} description="Editar datos" />
                    </Flex>
                    <Box w={{sm: "100%", md: "48%"}} borderRight={{md: "1px solid #4FD1C5"}}>
                        <DetailItem mb={2} attr="Dueño" content={order.owner}/>
                        <DetailItem mb={2} attr="Social" content={order.social}/>
                        {order.phone && <DetailItem mb={2} attr="Teléfono" content={order.phone}/>}
                        {order.address && <DetailItem mb={2} attr="Dirección" content={order.address}/>}
                        <DetailItem mb={2} attr="Fecha de entrega" content={format(order.deliveryDate)}/>
                        <DetailItem mb={2} attr="Delivery" content={order.delivery.name}/>
                        <DetailItem mb={5} attr="Costo de Delivery" content={order.delivery.cost}/>
                        { order.products && <Button onClick={handleSendOrder} variantColor="green" type="button">Enviar orden</Button> }
                    </Box>
                    <Box w={{sm: "100%", md: "48%"}} px={{sm: "0", md: "3"}} mt={{sm: "3"}}>
                        <Heading mb={[2, 4]} fontFamily="title" fontSize={["lg", "xl"]}>Productos</Heading>
                        {order.products && order.products?.map((product, idx) => (
                            <ProductDetail updateProduct={updateProduct} id={idx} key={idx} product={product}/>
                        ))}
                        <Divider />
                        <ProductModalForm product={{}} upSertProduct={addProduct} description="Agregar producto" />
                    </Box>
                </>
                : <OrderModalForm order={{}} updateOrder={updateOrder} description="Agregar orden"/>
            }
        </Flex>
    );
}
import React from "react";
import {Button, Stack, PseudoBox} from "@chakra-ui/core";
import {Link} from "react-router-dom";

import { isTodayOrGreather } from '../utils/dates'
import PayModal from "./PayModal";
import DeliverButton from "./deliverButton";

export default function OrderButtons({order}) {
    if( !order ) return null;
    return (
        <Stack isInline spacing={2} my="2">
            { order.state === 'not payed' && <PayModal mr={2} orderId={order._id}/> }
            { order.state === 'payed' && isTodayOrGreather(order.deliveryDate) && <DeliverButton orderId={order._id}/> }
            <PseudoBox as={Link}
                       to={`pedidos/${order._id}/edit`}
                       fontWeight="semibold"
                       py={2}
                       px={4}
                       rounded="md"
                       color="white"
                       bg="red.500"
                       _active={{ bg: "red.700" }}
                       _focus={{ boxShadow: "outline" }}
            >Editar</PseudoBox>
        </Stack>
    );
}
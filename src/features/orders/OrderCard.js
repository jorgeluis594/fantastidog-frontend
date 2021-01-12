import React from "react";
import {Box, Flex, Heading, PseudoBox, Text} from "@chakra-ui/core";

import {format as dateFormat} from "../../utils/dates";
import OrderButtons from "../../components/OrderButtons";
import OrderBadge from "../../components/OrderBadge";

function CardDetail({attribute, content}) {
    return(
        <PseudoBox
            as={Flex}
            w="100%"
            borderTop="1px"
            paddingY={[1, 2]}
            alignItems="center"
            _first={{borderTop: "none"}}
            borderColor="teal.400"
        >
            <Heading
                as="span"
                width="50%"
                textTransform="capitalize"
                fontSize={["sm", "md"]}
                fontWeight="500"
            >
                {attribute}
            </Heading>
            <Text
                as="span"
                width="45%"
                textTransform="capitalize"
                fontSize={["sm", "md"]}
                fontFamily="body"
            >
                {content}
            </Text>
        </PseudoBox>
    );
}
export default function OrderCard ({order}) {
    const {
        owner,
        social,
        phone,
        pet,
        deliveryDate,
        delivery,
        state
    } = order;


    return(
        <Box
            border="2px"
            borderColor="teal.400"
            borderRadius="lg"
        >
            <Box as="header" textAlign="center" my={[1,2]}>
                <Heading fontFamily="title" fontWeight="600" fontSize={["xl", "2xl"]}>{pet}</Heading>
                <OrderBadge state={state} />
            </Box>
            <Box p={[2, 4]}>
                <CardDetail attribute="Dueño" content={owner}/>
                <CardDetail attribute="Contacto" content={social}/>
                <CardDetail attribute="Celular" content={phone}/>
                <CardDetail attribute="Delivery" content={delivery.name}/>
                <CardDetail attribute="Fecha de entrega" content={dateFormat(deliveryDate)}/>
                <CardDetail attribute="Costo de Delivery" content={delivery.cost}/>
            </Box>
            <PseudoBox as={Flex} px="3">
                <OrderButtons order={order || {}} />
            </PseudoBox>
        </Box>
    );
}
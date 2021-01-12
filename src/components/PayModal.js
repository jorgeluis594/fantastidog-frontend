import React, {useEffect, useState} from "react";
import {
    Text,
    useDisclosure,
    Modal,
    Button,
    ModalOverlay,
    ModalContent,
    ModalHeader, 
    ModalCloseButton,
    ModalBody, 
    FormControl, 
    Flex, 
    NumberInput, 
    FormLabel,
    useToast
} from '@chakra-ui/core'
import { useDispatch, useSelector } from "react-redux"

import {getOrder, updateOrder} from "../features/orders/ordersSlice"

function ModalData({color, attr, content}) {
    return (
        <Flex alignItems="center" mb="3">
            <Text as="span" fontFamily="title" mr={4} fontWeight="500"  fontSize={["md", "lg"]}>{attr}:</Text>
            <Text as="span" fontFamily="body" fontWeight="600" fontSize={["md", "lg"]} color={color}>{content}</Text>
        </Flex>
    );
}

export default function PayModal({orderId, mr}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [mount, setMount] = useState(0);
    const toast = useToast();
    const dispatch = useDispatch();

    // Load order
    const order = useSelector(state => state.orders.orders.find(order => order._id === orderId))

    useEffect(()=>{
        if (!order || !order.products) dispatch(getOrder(orderId));
    }, [])


    const total = order.products?.reduce((totalCost ,product)=> totalCost + product.cost, 0) + order.delivery.cost;

    const totalPayments = order.payments.reduce((total, pay)=> (total + pay) , 0);

    const isLoading = useSelector(state => state.orders.status) === 'loading_update'

    const handleInput = value => setMount(value);

    const  handleButton = e => {
        e.preventDefault();
        onOpen();
    }

    const showToast = () => {
        toast({
            title: "Ocurrió un error",
            description: `El monto no debe ser mayor de ${total - totalPayments}`,
            status: "error",
            isClosable: true,
            position: "bottom-left",
        });
    }

    async function handleSubmit(e){
        e.preventDefault();
        if(mount > total - totalPayments) {
            showToast();
        } else {
            const payments = [...order.payments, mount];
            const action = await dispatch(updateOrder({orderId: order._id, payments}));
            if (!action.payload.error) onClose()
        }
    }
    return (
        <>
            <Button mr={mr} onClick={handleButton} variantColor="green">Pagar</Button>

            <Modal closeOnOverlayClick={false} blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Pagar</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <ModalData color="green.400" attr="Total" content={total}/>
                        <ModalData color="red.400" attr="Restante" content={total - totalPayments} />
                        <form onSubmit={handleSubmit}>
                            <FormControl>
                                <FormLabel htmlFor="pay">Monto a pagar</FormLabel>
                                <NumberInput 
                                    mt="5" 
                                    id="pay" 
                                    placeholder="Monto a pagar" 
                                    min={0}
                                    max={total - totalPayments}
                                    onChange={handleInput}
                                    value={mount}
                                />
                            </FormControl>
                            <Flex my="5">
                            <Button
                                mr={3} 
                                type="submit"
                                variantColor="green"
                                isLoading={isLoading}
                            >Pagar</Button>
                            
                            <Button 
                                type="button" 
                                variantColor="red"
                                onClick={onClose}
                            >Cancelar</Button>
                            
                            </Flex>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
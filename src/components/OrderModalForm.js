import React, {useEffect} from 'react';
import { Formik } from "formik";
import * as Yup from 'yup'
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/core";

import { useSelector, useDispatch } from 'react-redux'

import { listDeliveries } from '../features/deliveries/deliveriesSlice'
import {FullField, FullFieldSelect} from "./utilsForm";

export default function OrderModalForm ({order, description, updateOrder}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const { pet, owner, address, phone, social, delivery, deliveryDate } = order;
    const socials = [
        {name: 'Facebook', id: 1},
        {name: 'Instagram', id: 2},
        {name: 'Marketplace', id: 3},
        {name: 'Wsp', id: 4},
    ]

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const {deliveries, deliveriesLoaded} = useSelector(state => state.deliveries);
    useEffect(()=>{
        if(!deliveriesLoaded) dispatch(listDeliveries());
    }, [])

    const handleSubmit = (values) => {
        const {deliveryName, deliveryCost, ...order} = values;
        updateOrder({...order, delivery:{ name: deliveryName, cost: deliveryCost }});
        onClose();
    }

    const validationSchema = Yup.object({
        pet: Yup.string().min(3, "Debe tener mas de 3 letras").required("Nombre es requerido"),
        owner: Yup.string().min(3, "Debe tenr mas de 3 letras"),
        address: Yup.string().min(5, "Debe tener mas de 5 letras"),
        phone: Yup.string().matches(phoneRegExp, 'Número invalido'),
        social: Yup.string().required("Medio de contacto requerdio"),
        deliveryName:Yup.string().required("Delivery requerido"),
        deliveryCost: Yup.number().required("Costo de delivery requerido").typeError("No debe contener letras")
    });

    return (
        <>
            <Button variantColor="green" onClick={onOpen}>{description}</Button>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <Formik
                    initialValues={{
                        pet: pet || "",
                        owner: owner || "",
                        address: address || "",
                        phone: phone || "",
                        deliveryDate: deliveryDate || "",
                        social: social || "",
                        deliveryName: delivery?.name || "",
                        deliveryCost: delivery?.cost || "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    { props =>
                    (<ModalContent>
                        <form onSubmit={props.handleSubmit}>
                        <ModalBody>
                                <FullField name="pet" label="Nombre mascota" />
                                <FullField name="owner" label="Dueño" />
                                <FullFieldSelect options={socials} name="social" label="Red social" />
                                <FullField name="deliveryDate" type="date" label="Fecha de entrega" />
                                <FullField name="address" label="Dirección" />
                                <FullField name="phone" label="Teléfono" />
                                <FullFieldSelect options={deliveries} name="deliveryName" label="Delivery" />
                                <FullField type="number" name="deliveryCost" label="Costo de delivery" />
                        </ModalBody>
                        <ModalFooter>
                            <Button variantColor="green" mr={3} type="submit">
                                Agregar Datos
                            </Button>
                            <Button variantColor="red" onClick={onClose}>Cerrar</Button>
                        </ModalFooter>
                        </form>
                    </ModalContent>)
                    }
                </Formik>
            </Modal>
        </>
    );
}
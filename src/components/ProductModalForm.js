import React, {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, useDisclosure} from "@chakra-ui/core";
import {Formik, useFormikContext} from "formik";
import * as Yup from 'yup'
import {nanoid} from 'nanoid'
import {useDispatch, useSelector} from "react-redux";

import {FullField, FullFieldSelect} from "./utilsForm";
import { listProducts } from '../features/product/productSlice'

function ChangingForm({products}) {
    const {
        values: {name},
        touched,
        setFieldValue,
    } = useFormikContext()
    const [attributes, setAttributes] = useState([]);

    useEffect(()=>{
            const product = products.find(product => product.name === name);
            setFieldValue('cost', product?.cost || 0);
            setAttributes(product?.attributes || []);
        }
        , [name, touched.name, setFieldValue])

    return (
        <>
            <FullField name="cost" label="Costo" />
            {
                attributes.map((attributeName, idx)=>(
                    <FullField key={idx} name={attributeName} label={attributeName} />
                ))
            }
        </>
    );
}

export default function ProductModalForm({product, description, upSertProduct, id}) {
    const { name, cost } = product;
    const { onOpen, isOpen, onClose } = useDisclosure();
    const dispatch = useDispatch()
    const {products, productsLoaded} = useSelector(state => state.products);

    const productsName = products.map(product => ({
        name: product.name,
        id: product._id,
    }))

    useEffect(()=>{
        if (!productsLoaded) dispatch(listProducts());
    }, []);
    const validationSchema = Yup.object({
        name: Yup.string(),
        cost: Yup.number(),
        discount: Yup.number(),
    });
    const handleSubmit = (data) => {
        const {name, cost, ...rest} = data;
        const attributes = Object.entries(rest).map(valuePairs => ({name: valuePairs[0], body: valuePairs[1]}));
        const resolvedProduct =  {name, cost, attributes}
        if (product._id) resolvedProduct._id = product._id
        upSertProduct(resolvedProduct, id);
        onClose();
    }

    return (
        <>
            <Button variantColor="green" onClick={onOpen}>{description}</Button>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <Formik
                    initialValues={{
                        name: name || "",
                        cost: cost || "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    { props =>
                        (<ModalContent>
                            <form onSubmit={props.handleSubmit}>
                                <ModalBody>
                                    <FullFieldSelect options={productsName} name="name" label="Pack" />
                                    <ChangingForm  products={products}/>
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
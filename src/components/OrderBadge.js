import React from 'react';
import { Badge } from '@chakra-ui/core'

export default function OrderBadge({state}) {
    switch (state) {
        case 'not payed':
            return <Badge variantColor="red" >Falta cancelar</Badge>
        case 'payed':
            return <Badge variantColor="green">Pagado</Badge>
        case 'gave':
            return <Badge variantColor="yellow">Entregado</Badge>
        default:
            return null;
    }
}
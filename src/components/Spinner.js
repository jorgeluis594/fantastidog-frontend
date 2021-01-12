import React from "react";
import { Spinner } from '@chakra-ui/core'

export default function SpinnerLoad() {
    return(
        <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="teal.400"
            size="xl"
            position="absolute"
            top="50%"
            right="50%"
            left="48%"
            bottom="50%"
        />
    );
}
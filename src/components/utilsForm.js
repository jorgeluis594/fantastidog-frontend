import React from "react";
import {Field} from "formik";
import {FormControl, FormErrorMessage, FormLabel, Input, Select} from "@chakra-ui/core";

export function FullField({name, label, type}) {
    return (
        <Field name={name}>
            {({ field, form }) => (
                <FormControl isInvalid={form.errors[name] && form.touched[name]}>
                    <FormLabel htmlFor={name}>{label}</FormLabel>
                    <Input {...field} id={name} type={type || "text"} />
                    <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
                </FormControl>
            )}
        </Field>
    );
}

export function FullFieldSelect({name, label, options}) {
    return (
        <Field name={name}>
            {({ field, form }) => (
                <FormControl isInvalid={form.errors[name] && form.touched[name]}>
                    <FormLabel htmlFor={name}>{label}</FormLabel>
                    <Select {...field} id={name} placeholder="Selecciona opción" >
                        {options.map((option)=>(
                            <option key={option.id} value={option.name}>{option.name}</option>
                        ))}
                    </Select>
                    <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
                </FormControl>
            )}
        </Field>
    );
}
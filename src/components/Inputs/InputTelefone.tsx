import { TextField } from "@mui/material";
import { InputTextField } from "../Inputs"
import React, { useEffect, useState } from "react";

type InputTelefoneProps = React.ComponentProps<typeof TextField> & {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
}

const InputTelefone = React.forwardRef<HTMLInputElement, InputTelefoneProps>(
    ({ value, onChange, label, ...props }, ref) => {

    const [formattedValue, setFormattedValue] = useState(value);
    const maskTelefone = (valor: string) => {
        if (!valor) return ""

        let telefone = valor.replace(/\D/g, '')
        telefone = telefone.replace(/(\d{2})(\d)/,"($1) $2")
        telefone = telefone.replace(/(\d)(\d{4})$/,"$1-$2")
        return telefone
    }

    useEffect(() => {
        setFormattedValue(maskTelefone(value));
    }, [value]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const novoTelefone = maskTelefone(event.target.value)
        onChange({
            ...event,
            target: { ...event.target, value: novoTelefone }
        })
    }

    return (
        <InputTextField
            label={label}
            value={formattedValue}
            onChange={handleChange}
            {...props}
            slotProps={{
                htmlInput: {
                    maxLength: 15
                }
            }}
        />
    )
})

export default InputTelefone
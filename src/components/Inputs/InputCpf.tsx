import { TextField } from "@mui/material"
import { InputTextField } from "../Inputs"
import React, { useEffect, useState } from "react";

type InputCpfProps = React.ComponentProps<typeof TextField> & {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
}

const InputCpf = React.forwardRef<HTMLInputElement, InputCpfProps>(
    ({ value, onChange, label, ...props }, ref) => {

    const [formattedValue, setFormattedValue] = useState(value);
    const maskCpf = (valor: string) => {
        let input = valor.replace(/\D/g, '')
        input = input.replace(/(\d{3})(\d)/, '$1.$2');
        input = input.replace(/(\d{3})(\d)/, '$1.$2');
        input = input.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    
        return input
    }

    useEffect(() => {
        setFormattedValue(maskCpf(value));
    }, [value]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const novoCpf = maskCpf(event.target.value)
        onChange({
            ...event,
            target: { ...event.target, value: novoCpf }
        })
    }

    return (
        <InputTextField
            label={label}
            value={formattedValue}
            inputRef={ref}
            onChange={handleChange}
            {...props}
            slotProps={{
                htmlInput: {
                    maxLength: 14
                }
            }}
        />
    )
});

export default InputCpf
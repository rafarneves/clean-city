import { TextField } from "@mui/material";
import { InputTextField } from "../Inputs"
import React from "react";

type TextareaProps = React.ComponentProps<typeof TextField> & {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
}

const InputTextArea = React.forwardRef<HTMLInputElement, TextareaProps>(
    ({ value, onChange, label, ...props }, ref) => {

    return (
        <InputTextField
            label={label}
            value={value}
            multiline
            fullWidth
            minRows={3}
            onChange={onChange}
            {...props}
            slotProps={{
                htmlInput: {
                    style: {
                        resize: 'both'
                    }
                }
            }}
        />
    )
})

export default InputTextArea;
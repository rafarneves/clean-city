import { TextField } from "@mui/material";
import { InputTextField } from "../Inputs"
import React from "react";

type InputCepProps = React.ComponentProps<typeof TextField> & {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}
  
const InputCep = React.forwardRef<HTMLInputElement, InputCepProps>(
  ({ value, onChange, label, ...props }, ref) =>  {
    const maskCep = (valor: string) => {
      let cep = valor.replace(/\D/g, '')
      return cep.replace(/^(\d{5})(\d)/, '$1-$2').slice(0, 9);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const novoCep = maskCep(event.target.value)
      onChange({
        ...event,
        target: {  ...event.target, value: novoCep }
      })
    }

    return (
      <InputTextField
        label={label}
        value={value}
        onChange={handleChange}
        {...props}
        inputRef={ref}
        slotProps={{
          htmlInput: {
            maxLength: 9,
          },
        }}
      />
    )
})

export default InputCep
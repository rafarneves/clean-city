import { TextFieldProps } from "@mui/material";
import { DatePicker, DatePickerProps, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { ptBR } from "date-fns/locale";
import React from "react";

type CustomDatePickerProps<TDate extends Date> = Omit<DatePickerProps<TDate>, "renderInput"> & {
    textFieldProps?: TextFieldProps;
    error?: boolean;
    helperText?: string;
    fullWidth?: boolean;
};

const InputDate = React.forwardRef<HTMLInputElement, CustomDatePickerProps<Date>>(
    (
        { value, onChange, label="Selecione uma data", textFieldProps, error, helperText, fullWidth = false, ...props}, ref) => {

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <DatePicker format="dd/MM/yyyy"
                value={value}
                onChange={onChange}
                label={label}
                {...props}
                slotProps={{
                    textField: {
                        ...textFieldProps,
                        error,
                        helperText,
                        inputRef: ref,
                        sx: {
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "var(--input-border-color)",
                                    borderRadius: "20px"
                                },
                                "&:hover fieldset": {
                                    borderColor: "var(--input-border-color)", // Cor ao passar o mouse
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "var(--input-border-color)", // Cor ao focar
                                },
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "#000000",
                                fontWeight: "bold"
                            },
                            width: fullWidth ? '100%' : undefined,
                            ...(textFieldProps?.sx || {}),
                        },
                    },
                }}
            />
        </LocalizationProvider>
    )
});

export default InputDate
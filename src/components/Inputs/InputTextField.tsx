import { TextField, styled } from "@mui/material";

const InputTextField = styled(TextField)(() => ({
  '& label.Mui-focused': {
    color: '#000000',
    fontWeight: 'bold',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'var(--input-border-color)',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'var(--input-border-color)',
      borderRadius: '20px'
    },
    '&:hover fieldset': {
      borderColor: 'var(--input-border-color)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--input-border-color)',
    },
  },
}));

export default InputTextField;
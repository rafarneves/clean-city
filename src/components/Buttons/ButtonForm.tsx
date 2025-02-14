import { Button } from "@mui/material";

interface ButtonProps {
  formularioAtivo: string;
  valor: string;
  titulo: string;
  changeForm: (value: string) => void;
}

export default function ButtonForm({ formularioAtivo, valor, titulo, changeForm }: ButtonProps) {
  const isFormAtivo = formularioAtivo === valor;

  return (
    <Button
      fullWidth
      variant={isFormAtivo ? 'contained' : 'outlined'}
      onClick={() => changeForm(valor)}
      sx={{ 
        marginBottom: 1, 
        backgroundColor: isFormAtivo ? "var(--slide-button-color)" : "transparent", 
        color: isFormAtivo ? "#fff" : "var(--slide-button-color)",
        borderColor: "var(--slide-button-color)",
        fontWeight: 'bold',
        borderRadius: 0,
        paddingY: 1.5
      }}
    >
      {titulo}
    </Button>
  );
}
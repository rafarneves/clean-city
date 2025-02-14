import { Box, Button, Grid2, TextField } from "@mui/material";
import { InputTextField } from "../Inputs";

export default function FormularioAutenticacao() {
    return (
        <Box component="form" noValidate autoComplete="off">
            <Grid2 container spacing={2}>
                <Grid2 size={12}>
                    <InputTextField required fullWidth label="Senha atual" type="password" />
                </Grid2>
                <Grid2 size={12}>
                    <InputTextField required fullWidth label="Nova senha" type="password" />
                </Grid2>
                <Grid2 size={12}>
                    <InputTextField required fullWidth label="Confirme sua senha" type="password" />
                </Grid2>
            </Grid2>
            <Box mt={2}>
                <Button variant="contained" color="success" sx={{ backgroundColor: 'var(--button-color)', borderRadius: '20px', py: '12px', px: 5 }}>Atualizar</Button>
            </Box>
        </Box>
    )
}
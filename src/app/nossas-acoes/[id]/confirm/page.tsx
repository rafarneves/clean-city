import { Box, Button, Grid2, Stack, Typography } from "@mui/material";
import ImgSuccess from '@/assets/img/image-success.svg'

export default function Confirm() {

    return (
        <Grid2 container spacing={2} marginTop={{ md: 10, xs: 5 }}>
            <Grid2 size={{ xs: 12, md: 5, lg: 5 }} marginTop={{ md: 5 }} display="flex" justifyContent="center">
                <Box component="img" src={ImgSuccess.src} alt="Placa de agradecimento" 
                    sx={{ width: { xs: 200,sm: 300, md: 300 }, height: { xs: 200, sm: 300, md: 300 }, objectFit: 'cover' }} />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 7, lg: 7 }}>
                <Typography variant="h4" sx={{ color: 'var(--font-color)', fontWeight: 'bold', display: 'inline-block'}} gutterBottom>
                    Você acaba de se tornar um CleanCity!
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', display: 'inline-block', mt: 3 }} gutterBottom>
                    Você receberá um comprovante da sua participação no seu e-mail cadastrado, com a data, horário e descrição da ação. 
                    Obrigado pela sua participação! Sua generosidade é incrível e faz toda a diferença. Agradecemos por apoiar nossa causa.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: { md: 'start', xs: 'center' } }}>
                    <Button href="/nossas-acoes" variant="contained"
                            sx={{   backgroundColor: '#000000', color: '#ffffff', mt: 5, 
                                    fontWeight: 600, textTransform: 'none', paddingY: 1.5, 
                                    borderRadius: '20px', paddingX: 10, 
                                }}>Voltar</Button>
                </Box>
            </Grid2>
        </Grid2>
    )
}
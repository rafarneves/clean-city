import { Box, Container, Typography } from "@mui/material";
import ImgSuccess from '@/assets/img/image-success.svg'

export default function Confirm() {

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'center', padding: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', display: 'inline-block', mt: {md: 8} }} gutterBottom>
                Você receberá um comprovante da doação no seu e-mail cadastrado.
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold', display: 'inline-block', mt: 3 }} gutterBottom>
                Obrigado pela sua doação! Sua generosidade é incrível e faz toda a diferença. <br></br> Agradecemos por apoiar nossa causa.
            </Typography>
            <Box component="img" src={ImgSuccess.src} alt="Placa de agradecimento" 
                    sx={{ width: 150, height: 150, objectFit: 'cover', mt: 6 }} />
        </Box>
    )
}
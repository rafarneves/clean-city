import { Typography, Box, Stack, Container, Grid2 } from "@mui/material";
import Img01 from '@/assets/img/quem-somos-img01.svg';
import Img02 from '@/assets/img/quem-somos-img02.svg';
import Img04 from '@/assets/img/quem-somos-img04.svg';

export default function QuemSomos() {
    return (
        <Container maxWidth="lg">
            <Typography
                variant="h5"
                sx={{
                    fontWeight: 'bold',
                    color: 'var(--font-color)',
                    mb: 4,
                }}
            >
                Quem Somos
            </Typography>

            <Typography
                variant="subtitle1"
                sx={{
                    fontWeight: 'bold',
                    mb: 6,
                }}
            >
                O aplicativo CleanCity conecta voluntários com moradores que precisam de
                ajuda para resolver problemas urbanos, como lixo acumulado, grama alta e
                árvores em risco de queda. Os moradores podem solicitar serviços
                específicos e os voluntários se inscrevem para ajudar. Os moradores
                também podem realizar doações para a realização dos serviços.
            </Typography>

            <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                    <Box
                        component="img"
                        src={Img01.src}
                        alt="Lixo acumulado na rua"
                        sx={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: '8px',
                        }}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                    <Box
                        component="img"
                        src={Img02.src}
                        alt="Vista da cidade"
                        sx={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: '8px',
                        }}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                    <Box
                        component="img"
                        src={Img04.src}
                        alt="Natureza com lixo acumulado"
                        sx={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: '8px',
                        }}
                    />
                </Grid2>
            </Grid2>
        </Container>
    );
};

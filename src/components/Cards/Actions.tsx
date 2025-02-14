import { Box, Button, Card, CardMedia, Stack, Typography } from "@mui/material";

interface CardActions {
    id: number
    titulo: string
    descricao: string
    imagem: string
    link: string
    index: number
}

export default function CardActions({ id, titulo, descricao, imagem, link, index }: CardActions) {

    return (
        <Stack
            spacing={{ xs: 1, sm: 3 }}
            sx={{ mb: 8 }}
            direction={{ xs: 'column', md: 'row' }}
            useFlexGap
        >
            <Card sx={{ maxWidth: '450px', width: '100%' }}>
                <CardMedia
                    sx={{ height: 200 }}
                    image={imagem}
                    title={titulo}
                />
            </Card>
            <Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: '600' }}>
                    {index+1+'.'} {titulo}
                </Typography>
                <Typography variant="subtitle1" gutterBottom >
                    {descricao}
                </Typography>
                <Button variant="contained" href={link} sx={{ backgroundColor: 'var(--slide-button-color)', marginTop: 1, paddingX: 8 , paddingY: 1.5, borderRadius: '8px', textTransform: 'capitalize'}}>Participar 💛</Button>
            </Box>
        </Stack>
    )
}
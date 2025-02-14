'use client'
import GreenCardText from "@/components/Cards/GreenCardText";
import Slide from "@/components/Slide";
import { Container, Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {
  const [load, setLoad] = useState(false)
  
  useEffect(() => {
    setLoad(true)
  }, [])

  if (!load) return

  return (
    <Container>
      <Typography variant="h6" component="div" fontWeight="bold" sx={{ marginBottom: 1 }}>
        <Typography
          component="span"
          variant="h6"
          sx={{ fontWeight: 'bold', color: 'var(--font-color)' }}
        >
          COLABORE
        </Typography>{' '}
        com ações voluntárias
      </Typography>

      <Slide />

      <Typography variant="h5" sx={{ fontWeight: 'bold', display: 'inline-block', color: 'var(--font-color-black)', mt: 4 }} gutterBottom>
        Como atuamos
      </Typography>
      <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid2 size={{ xs: 12, sm: 4, md: 4 }}>
          <GreenCardText>
            <Typography variant="h6" sx={{ fontWeight: 'bold', display: 'inline-block', color: 'var(--font-color-white)', mb: 0 }} gutterBottom>
              100 Mil
            </Typography>
            <Typography variant="subtitle2" sx={{ display: 'inline-block', color: 'var(--font-color-white)', ml: 1, mb: 0 }} gutterBottom>
              Voluntários
            </Typography>
          </GreenCardText>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 4, md: 4 }}>
          <GreenCardText>
            <Typography variant="h6" sx={{ fontWeight: 'bold', display: 'inline-block', color: 'var(--font-color-white)', mb: 0 }} gutterBottom>
              50 Mil
            </Typography>
            <Typography variant="subtitle2" sx={{ display: 'inline-block', color: 'var(--font-color-white)', ml: 1, mb: 0 }} gutterBottom>
              Ações realizadas
            </Typography>
          </GreenCardText>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 4, md: 4 }}>
          <GreenCardText>
            <Typography variant="h6" sx={{ fontWeight: 'bold', display: 'inline-block', color: 'var(--font-color-white)', mb: 0 }} gutterBottom>
              4 anos
            </Typography>
            <Typography variant="subtitle2" sx={{ display: 'inline-block', color: 'var(--font-color-white)', ml: 1, mb: 0 }} gutterBottom>
              Promovendo ações
            </Typography>
          </GreenCardText>
        </Grid2>
      </Grid2>

      <Grid2 container>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', display: 'inline-block', color: 'var(--font-color-black)', mt: 4 }} gutterBottom>
            Nós da Clean City já realizamos diversas ações ajudando a resolver problemas urbanos. Somos extramente gratos a todos os contribuintes e voluntários!
          </Typography>
        </Grid2>
      </Grid2>
    </Container>
  );
}

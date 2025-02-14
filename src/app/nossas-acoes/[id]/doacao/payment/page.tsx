import React from 'react';
import { Container, Paper, Typography, Button, TextField, Grid2 } from '@mui/material';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface PageProps {
  nextPage: string;
  valorDoacao: number;
  changePage: (value: string) => void;
}

export default function Payment(
  { nextPage, valorDoacao, changePage }: PageProps
) {

  const handleChangePage = () => {
    changePage(nextPage);
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', marginBottom: 3, textAlign: 'center' }}>
        Efetue o pagamento<br></br> para confirmar a doação
      </Typography>
      <Grid2 container spacing={6}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              textAlign: 'center',
              padding: 3,
              border: '1px solid var(--input-border-color)',
              borderRadius: '30px',
              height: '100%'
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 1 }}>Pix com QR Code</Typography>
            <img
              src="https://i.imgur.com/lAFPPBp.png"
              alt="QR Code"
              width={200} height={200}
              style={{ marginBottom: 1 }}
            />
            <Typography variant='body1' sx={{ fontWeight: 'bold', marginBottom: 1 }}>Data: {format(new Date(), 'dd/MM/yyyy', { locale: ptBR })}</Typography>
            <Typography variant='body1' sx={{ fontWeight: 'bold', marginBottom: 1 }}>Valor: R$ {valorDoacao.toString()},00</Typography>
            <Typography variant='body1' sx={{ fontWeight: 'bold', marginBottom: 1 }}>Recebedor: Nubank Pagamentos S.A</Typography>
            <Button variant="contained" color="success" onClick={handleChangePage}
              sx={{ backgroundColor: 'var(--button-color)', borderRadius: '20px', py: '12px', px: 5, mt: 2 }}>Já paguei</Button>
          </Paper>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              padding: 3,
              border: '1px solid var(--input-border-color)',
              borderRadius: '30px',
              height: '100%'
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 1, textAlign: 'center' }}>Pix copia e cola</Typography>
            <Typography variant='body1' sx={{ fontWeight: 'bold', marginBottom: 3 }}>1. Copie o código</Typography>
            <TextField
              variant="outlined"
              value="00000054654646464646fjfjfj.jdjhdf.gov3345"
              sx={{
                width: '100%',
                marginBottom: 3
              }}
              slotProps={{
                htmlInput: {
                    readOnly: true
                }
              }}
            />
            <Typography variant='body1' sx={{ fontWeight: 'bold', marginBottom: 3 }}>2. Abra o app do seu banco e procure a aba Pix.</Typography>
            <Typography variant='body1' sx={{ fontWeight: 'bold', marginBottom: 3 }}>3. Escolha a opção "Pix Copia e Cola".</Typography>
            <Typography variant='body1' sx={{ fontWeight: 'bold', marginBottom: 3 }}>4. Cole o código. Confirme as informações e finalize.</Typography>
            <Typography variant='body1' sx={{ fontWeight: 'bold'}}>
              5. Após efetuar pagamento, você receberá um e-mail com a confirmação da contribuição.
            </Typography>
          </Paper>
        </Grid2>
      </Grid2>
    </Container>
  );
}
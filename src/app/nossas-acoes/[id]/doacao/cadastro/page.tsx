'use client'
import { InputCpf, InputTelefone, InputTextField } from '@/components/Inputs';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField, Typography, Grid, Grid2 } from '@mui/material';
import { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { number, z } from 'zod';

import { set } from 'date-fns';
import { donationSchema } from '../../../../../../schemas/donationSchema';
import { AuthContext } from '../../../../../../context/AuthContext';
import api from '../../../../../../services/api';

interface PageProps {
  nextPage: string;
  valorDoacao: number;
  actionId: number;
  changePage: (value: string) => void;
}

type UserFormValues = z.infer<typeof donationSchema>;

const Identificacao: React.FC<PageProps> = ({ nextPage, valorDoacao, actionId, changePage }) => {
  
  const { control, handleSubmit, setValue } = useForm<UserFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      name: "",
      cpf: "",
      telephone: "",
      email: "",
    },
  });

  const { setFeedback } = useContext(AuthContext);

  const onSubmit = async (data: UserFormValues) => {
    try {
      const requestData = {
        ...data,
        value: valorDoacao,
        date: new Date().toISOString(),
        actionId: actionId
      }

      const response = await api.post('/donations', requestData);
      if (response.status === 200) {
        changePage(nextPage);
      } else {
        setFeedback({ message: "Erro ao cadastrar doação.", severity: 'error' });
      }
    } catch (err: any) {
      setFeedback({ message: err, severity: 'error' });
    }
  }

  const handleBackStep = () => {
    changePage('doar-valor');
  };


  return (
    <Box
      sx={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 8 }}>
        Identificação
      </Typography>
      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12 }}>
            <Controller name="name" control={control} render={({ field, fieldState }) => (
              <InputTextField {...field} label="Nome completo" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
            )} />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Controller name="cpf" control={control} render={({ field, fieldState }) => (
              <InputCpf {...field} label="Digite o CPF" autoComplete="off" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
            )} />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Controller name="telephone" control={control} render={({ field, fieldState }) => (
              <InputTelefone {...field} label="Telefone" autoComplete="off" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
            )} />
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Controller name="email" control={control} render={({ field, fieldState }) => (
              <InputTextField {...field} label="E-mail" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
            )} />
          </Grid2>
        </Grid2>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '2rem',
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'black',
              color: 'white',
              '&:hover': { backgroundColor: '#333' },
            }}
            onClick={handleBackStep}
          >
            Voltar
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#35BD8E',
              color: 'white',
              '&:hover': { backgroundColor: '#2b9e72' },
            }}
            type='submit'
          >
            Próximo Passo
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Identificacao;
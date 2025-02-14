'use client'
import { InputCep, InputCpf, InputDate, InputTelefone, InputTextField } from "@/components/Inputs";
import { Box, Button, Grid2, Typography } from "@mui/material";
import api from "../../../services/api";
import { useRouter } from "next/navigation";
import { userSchema } from "../../../schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form"
import { z } from "zod";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { set } from "date-fns";

type UserFormValues = z.infer<typeof userSchema>;

export default function Cadastro() {
  const { control, handleSubmit, setValue } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      birthDate: null,
      cep: "",
      cpf: "",
      phone: "",
      password: "",
      passwordConfirmation: "",
      address: "",
      neighborhood: "",
      complement: "",
      city: "",
      state: "",
      country: "",
    },
  });

  const router = useRouter();
  const { setFeedback } = useContext(AuthContext);

  const onSubmit = async (data: UserFormValues) => {
    try {
      const response = await api.post('/users', data);
      if (response.status === 200) {
        setFeedback({ message: "Cadastrado com sucesso!", severity: 'success' });
        router.push('/');
      } else {
        setFeedback({ message: "Erro ao cadastrar usuário.", severity: 'error' });
      }
    } catch (err: any) {
      setFeedback({ message: err, severity: 'error' });
    }
  }

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', display: 'inline-block', color: 'var(--font-color-black)', mb: 4 }} gutterBottom>
        Crie sua conta
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller name="firstName" control={control} render={({ field, fieldState }) => (
            <InputTextField {...field} label="Nome" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
          )} />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller name="lastName" control={control} render={({ field, fieldState }) => (
            <InputTextField {...field} label="Sobrenome" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
          )} />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller name="email" control={control} render={({ field, fieldState }) => (
            <InputTextField {...field} label="E-mail" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
          )} />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 3 }}>
          <Controller name="birthDate" control={control} render={({ field, fieldState }) => (
            <InputDate {...field} label="Data de nascimento" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
          )} />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 3 }}>
          <Controller name="cep" control={control} render={({ field, fieldState }) => (
            <InputCep {...field} label="Digite o Cep" autoComplete="off" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
          )} />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller name="cpf" control={control} render={({ field, fieldState }) => (
            <InputCpf {...field} label="Digite o CPF" autoComplete="off" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
          )} />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller name="phone" control={control} render={({ field, fieldState }) => (
            <InputTelefone {...field} label="Telefone" autoComplete="off" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
          )} />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller name="password" control={control} render={({ field, fieldState }) => (
            <InputTextField {...field} label="Senha" type="password" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
          )} />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller name="passwordConfirmation" control={control} render={({ field, fieldState }) => (
            <InputTextField {...field} type="password" label="Confirme sua senha" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
          )} />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller name="address" control={control} render={({ field, fieldState }) => (
            <InputTextField {...field} label="Endereço" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
          )} />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 3 }}>
          <Controller name="neighborhood" control={control} render={({ field, fieldState }) => (
            <InputTextField {...field} label="Bairro" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
          )} />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 3 }}>
          <Controller name="complement" control={control} render={({ field, fieldState }) => (
            <InputTextField {...field} label="Complemento" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
          )} />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 3 }}>
          <Controller name="city" control={control} render={({ field, fieldState }) => (
            <InputTextField {...field} label="Cidade" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
          )} />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 3 }}>
          <Controller name="state" control={control} render={({ field, fieldState }) => (
            <InputTextField {...field} label="Estado" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
          )} />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller name="country" control={control} render={({ field, fieldState }) => (
            <InputTextField {...field} label="País" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
          )} />
        </Grid2>
      </Grid2>
      <Box mt={2}>
        <Button variant="contained" type="submit" sx={{ backgroundColor: 'var(--button-color)', borderRadius: '20px', py: '12px', px: 5 }}>Cadastrar</Button>
      </Box>
    </Box>
  );
}
'use client'
import { Box, Button, Grid2 } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { InputTextField } from "../Inputs";
import InputCpf from "../Inputs/InputCpf";
import InputTelefone from "../Inputs/InputTelefone";
import InputCep from "../Inputs/InputCep";
import InputDate from "../Inputs/InputDate";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { userSchema } from "../../../schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import api from "../../../services/api";
import { AuthContext } from "../../../context/AuthContext";

type UserFormValues = z.infer<typeof userSchema>;

export default function FormularioDadosPessoais() {
  const { user, setFeedback } = useContext(AuthContext);

  const { control, handleSubmit, setValue, trigger } = useForm<UserFormValues>({
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

  const formatDate = (value: string) => {
    const [dia, mes, ano] = value.split("/");
    return new Date(Number(ano), Number(mes) - 1, Number(dia));
  }

  const router = useRouter();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await api.get(`/users/${user.id}`);
        if (response.status === 200) {
          const userData = response.data;
          const formattedDate = userData.userDetails.birthDate ? formatDate(userData.userDetails.birthDate) : null;
          setValue("firstName", userData.userDetails.firstName);
          setValue("lastName", userData.userDetails.lastName);
          setValue("email", userData.userDetails.email);
          setValue("birthDate", formattedDate);
          setValue("cep", userData.userDetails.address.cep);
          setValue("cpf", userData.userDetails.cpf);
          setValue("phone", userData.userDetails.phone);
          setValue("address", userData.userDetails.address.address);
          setValue("neighborhood", userData.userDetails.address.neighborhood);
          setValue("complement", userData.userDetails.address.complement);
          setValue("city", userData.userDetails.address.city);
          setValue("state", userData.userDetails.address.state);
          setValue("country", userData.userDetails.address.country);
        }
      } catch (err) {
        console.error("Erro ao buscar dados do usuário:", err);
      }
    };

    if (user?.id) {
      getUserData();
    }
  }, [user, setValue]);

  const onSubmit = async (data: UserFormValues) => {
    try {
      const response = await api.put(`/users/${user.id}`, data);
      if (response.status === 200) {
        setFeedback({ message: "Alteração realizada com sucesso.", severity: 'success' })
        router.push('/dados-pessoais');
      } else {
        setFeedback({ message: "Erro na edição.", severity: 'error' })
      }
    } catch (err: any) {
      throw new Error(err)
    }
  }

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
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
        <Button variant="contained" type="submit" color="success" sx={{ backgroundColor: 'var(--button-color)', borderRadius: '20px', py: '12px', px: 5 }}>Atualizar</Button>
      </Box>
    </Box>
  );
}
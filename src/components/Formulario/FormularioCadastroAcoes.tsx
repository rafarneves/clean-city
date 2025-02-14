import { Box, Button, Grid2, IconButton, TextField, Typography } from "@mui/material";
import { InputDate, InputFile, InputTextarea, InputTextField } from "../Inputs";
import { AttachFile, Description, Title } from "@mui/icons-material";
import { z } from "zod";
import { actionSchema } from "../../../schemas/actionSchema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../../../services/api";
import Cookies from "js-cookie"
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

type ActionFormValues = z.infer<typeof actionSchema>;

export default function FormularioCadastroAcoes() {
    const { setFeedback } = useContext(AuthContext);
    const router = useRouter()

    const { control, handleSubmit, setValue } = useForm<ActionFormValues>({
        resolver: zodResolver(actionSchema),
        defaultValues: {
          name: "",
          description: "",
          image: "",
          date: null,
          hour: "",
          address: {
            address: ""
          },  
        },
    });

    const onSubmit = async (data: ActionFormValues) => {
        try {
            const userDataToken = Cookies.get('USER_INFO');

            if (userDataToken) {
                // Transformar o valor do cookie em um objeto JSON
                const user = JSON.parse(userDataToken); 
            
                // Acessar o ID dentro do JSON
                const userId = user.id;

                // Combine a data e a hora para o formato ISO 8601
                const date = new Date(data.date); // data.date já deve ser um objeto Date
                const [hours, minutes] = data.hour.split(":");
                date.setHours(Number(hours), Number(minutes), 0, 0); // Ajusta a hora, minuto, segundo e milissegundo

                // Convertendo para ISO 8601
                const isoDate = date.toISOString();
                const requestData = { 
                    ...data, 
                    userId: userId, // Agora o ID do usuário está sendo enviado corretamente
                    date: isoDate
                };

                const response = await api.post('/actions', requestData);

                if (response.status === 200) {
                    setFeedback({ message: "Ação cadastrada com sucesso.", severity: 'success' })
                    router.push('/')
                } else {
                    setFeedback({ message: response.statusText, severity: 'error' })
                }
            }
        } catch (err: any) {
          console.error("Error: ", err);
        }
    }

    return (
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Grid2 container spacing={2}>
                <Grid2 size={12}>
                    <Box sx={{ width: '100%' }}>
                        {/* <InputTextField value={titulo} fullWidth onChange={handleChangeTitulo} label="Insira o título da ação" sx={{ marginTop: 1 }} /> */}
                        <Controller name="name" control={control} render={({ field, fieldState }) => (
                            <InputTextField {...field} label="Insira o título da ação" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
                        )} />
                    </Box>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <Box sx={{ width: '100%' }}>
                        <Controller name="address.address" control={control} render={({ field, fieldState }) => (
                            <InputTextField {...field} label="Endereço" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
                        )} />
                    </Box>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 3 }}>
                    <Box sx={{ width: '100%' }}>
                        <Controller name="date" control={control} render={({ field, fieldState }) => (
                            <InputDate {...field} label="Data da ação" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
                        )} />
                    </Box>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 3 }}>
                    <Box sx={{ width: '100%' }}>
                        <Controller name="hour" control={control} render={({ field, fieldState }) => (
                            <InputTextField {...field} label="Horário" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
                        )} />
                    </Box>
                </Grid2>
                <Grid2 size={12}>
                    <Box sx={{ width: '100%' }}>
                        <Controller name="description" control={control} render={({ field, fieldState }) => (
                            <InputTextarea {...field} label="Descreva sua ação" sx={{ resize: 'both !important', marginTop: 2 }}
                            fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
                        )} />
                    </Box>
                </Grid2>
                <Grid2 size={12}>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: 1 }}>
                            <Controller name="image" control={control} render={({ field, fieldState }) => (
                                <InputFile {...field} fileName={field.value} setFileName={(name) => field.onChange(name)} 
                                    fileBase64={null} setFileBase64={(file) => field.onChange(file)} 
                                    error={!!fieldState.error} helperText={fieldState.error?.message} />
                            )} />
                        </Box>
                    </Box>
                </Grid2>
            </Grid2>
            <Box mt={2}>
                <Button variant="contained" type="submit" color="success" sx={{ backgroundColor: 'var(--button-color)', borderRadius: '20px', py: '12px', px: 5 }}>
                    Enviar para análise
                </Button>
            </Box>
        </Box>
    )
}
"use client"
import { Box, Button, Grid2, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import api from "../../../services/api";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

interface ActionProps {
    id: number;
    name: string;
    description: string;
    image: string;
    date: string;
    userId: number;
    address: {
        address: string;
    };
}

export default function ActionPage({ action }: { action: ActionProps }) {
    const { user, isAuthenticated, setFeedback } = useContext(AuthContext);
    const router = useRouter();

    const submitActionVolunteer = async () => {
        const response = await api.post(`/actions/${action.id}/users/${user.id}`)

        if (response.status === 200) {
            router.push(`/nossas-acoes/${action.id}/confirm`)
        } else {
            setFeedback({ message: "Erro ao associar usuário(a) a ação.", severity: 'error' })
        }
    }

    return (
        <>
            <Typography variant="h5" gutterBottom sx={{ mt: 3, mb: 3, fontWeight: '800' }}>
                {action.name}
            </Typography>
            <Grid2 container spacing={5}>
                <Grid2 size={{ xs: 12, md: 5 }}>
                    <Box component="img" src={action.image} alt={action.name} sx={{ width: '100%', height: { xs: 300, sm: 300, md: 400 }, objectFit: 'cover' }} />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 7 }}>
                    <Typography variant="h6" sx={{ color: 'var(--font-color)', fontWeight: 'bold', display: 'inline-block' }} gutterBottom>
                        Querido(a) {user ? user.name : 'Usuário(a)'},
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
                        {action.description}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
                        Local: {action.address.address}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                        Data e Horário: {format(new Date(action.date + 'Z'), 'dd/MM/yyyy HH:mm')}
                    </Typography>
                    <Box sx={{ width: '100%', mt: 6 }}>
                        <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            {isAuthenticated && (
                                <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
                                    <Button onClick={submitActionVolunteer} variant="contained" sx={{ backgroundColor: 'var(--slide-button-color)', paddingY: 1.5, borderRadius: '8px', width: '100%', textTransform: 'none'}}>
                                        Vou participar como voluntário
                                    </Button>
                                </Grid2>
                            )}
                            <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
                                <Button href={`/nossas-acoes/${action.id}/doacao`} variant="contained" sx={{ backgroundColor: 'var(--slide-button-color)', paddingY: 1.5, borderRadius: '8px', width: '100%', textTransform: 'none'}}>
                                    Vou participar com uma doação
                                </Button>
                            </Grid2>
                        </Grid2>
                    </Box>
                </Grid2>
            </Grid2>
        </>
    );
}
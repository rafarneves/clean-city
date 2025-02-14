import { Card, CardContent, Typography, Box, Button } from "@mui/material";

interface Action {
    id: number;
    name: string;
    address: {
        address: string;
    }
    date: string;
    horario: string;
    description: string;
    image: string;
}

interface ListActionsProps {
    acoes: Action[];
    onAprovar: (id: number) => void;
    onRejeitar: (id: number) => void;
}

export default function ActionApprovalList({ acoes, onAprovar, onRejeitar }: ListActionsProps) {
    return (
        <Box display="flex" flexDirection="column" gap={2}>
            {acoes.map((acao) => (
                <Card
                    key={acao.id}
                    sx={{
                        width: "100%",
                        borderRadius: 0,
                        border: "1px solid #00a478",
                        boxShadow: "none",
                    }}
                >
                    <CardContent>
                        <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap">
                            {/* Seção da esquerda (Imagem e informações) */}
                            <Box display="flex" gap={2} alignItems="center" flexWrap="wrap" flexDirection="column">
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        {acao.name}
                                    </Typography>
                                    <Typography variant="body2">📍 {acao.address ? acao.address.address : 'Não informado'}</Typography>
                                    <Typography variant="body2">📅 {acao.date} ⏰ {acao.horario}</Typography>
                                    <Typography variant="body2">{acao.description}</Typography>
                                </Box>
                                <Box display="flex" gap={1} width="100%">
                                    <Button
                                        variant="contained"
                                        color="success"
                                        size="small"
                                        onClick={() => onAprovar(acao.id)}
                                    >
                                        Aprovar
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        onClick={() => onRejeitar(acao.id)}
                                    >
                                        Rejeitar
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}
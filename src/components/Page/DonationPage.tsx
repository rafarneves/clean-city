'use client'
import Confirm from "@/app/nossas-acoes/[id]/confirm/page";
import Identificacao from "@/app/nossas-acoes/[id]/doacao/cadastro/page";
import Payment from "@/app/nossas-acoes/[id]/doacao/payment/page";
import { Box, Grid2, Typography } from "@mui/material";
import { useState } from "react";
import DoacaoCard from "../Cards/DoacaoCard";

interface PageProps {
    nextPage: string;
    changePage: (value: string) => void;
}

export default function DonationPage({ actionId }: { actionId: number }) {
    const [paginaAtiva, setPaginaAtiva] = useState<string>('doar-valor');
    const [valorDoacao, setValorDoacao] = useState<number>(0);

    const renderDoacoes = () => {
        switch (paginaAtiva) {
            case 'doar-valor':
                return <PaginaDoarValor nextPage="identificacao" changePage={setPaginaAtiva} />;
            case 'identificacao':
                return <Identificacao nextPage="pagamento" changePage={setPaginaAtiva} actionId={actionId} valorDoacao={valorDoacao} />;
            case 'pagamento':
                return <Payment nextPage="confirmacao" changePage={setPaginaAtiva} valorDoacao={valorDoacao} />
            case 'confirmacao':
                return <Confirm />
            default:
                return null;
        }
    }

    const PaginaDoarValor = ({ nextPage, changePage }: PageProps) => {
        return (
            <Box sx={{ padding: 4, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                    Doar
                </Typography>
                <Typography variant="subtitle1" sx={{ marginBottom: 10, color: '#555' }}>
                    Cada contribuição faz uma diferença real na vida de alguém.
                </Typography>
                <Grid2 container spacing={2}>
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <DoacaoCard valor={50} labelBotao="Doar 💛" nextPage={changePage} page={nextPage} changeDoacao={setValorDoacao} />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <DoacaoCard valor={100} labelBotao="Doar 💛" nextPage={changePage} page={nextPage} changeDoacao={setValorDoacao} />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <DoacaoCard valor={200} labelBotao="Doar 💛" nextPage={changePage} page={nextPage} changeDoacao={setValorDoacao} />
                    </Grid2>
                </Grid2>
            </Box>
        )
    }

    return (
        renderDoacoes()
    );
};
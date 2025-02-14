'use client'
import { Box, Button, Grid2, TextField } from "@mui/material";
import { InputTextField } from "../Inputs";
import ActionApprovalList from "../Cards/ActionApprovalList";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import api from "../../../services/api";

export default function FormularioAprovarAcoes() {
    const { setFeedback, isAdmin } = useContext(AuthContext);
    const router = useRouter();
    const [acoes, setAcoes] = useState([]);
    
    if (!isAdmin) {
        setFeedback({ message: "Você não tem permissão para acessar essa página.", severity: "error" });
        router.push("/dados-pessoais");
    }

    useEffect(() => {
        const fetchAcoes = async () => {
            try {
                const response = await api.get('/actions?active=false');
                setAcoes(response.data);
            } catch (error) {
                setFeedback({ message: "Erro ao carregar ações.", severity: "error" });
            }
        };

        fetchAcoes();
    }, []);

    const handleAprovar = async (id: number) => {
        try {
            const response = await api.put(`/actions/${id}/enable?enable=true`);
            if(response.status === 200) {
                setAcoes(acoes.filter((acao) => acao.id !== id));
                setFeedback({ message: "Ação aprovada com sucesso!", severity: "success" });
            } else {
                setFeedback({ message: "Erro ao aprovar ação.", severity: "error" });
            }
        } catch (error) {
            setFeedback({ message: "Erro ao aprovar ação.", severity: "error" });
        }
    };

    const handleRejeitar = async (id: number) => {
        try {
            const response = await api.delete(`/actions/${id}`);
            if(response.status === 200) {
                setFeedback({ message: "Ação excluída com sucesso!", severity: "success" });
            } else {
                setFeedback({ message: "Erro ao excluir ação.", severity: "error" });
            }
        } catch (error) {
            setFeedback({ message: "Erro ao excluir ação.", severity: "error" });
        }
    };

    return <ActionApprovalList acoes={acoes} onAprovar={handleAprovar} onRejeitar={handleRejeitar} />;
}
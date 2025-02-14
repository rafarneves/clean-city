'use client'
import CardActions from '@/components/Cards/Actions';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import api from '../../../services/api';

export default function NossasAcoes() {
    const [actions, setActions] = useState([])

    useEffect(() => {
        const getActions = async () => {
            try {
              const response = await api.get('/actions?active=true');
              if (response.status === 200) {
                setActions(response.data)
              }
            } catch (err) {
              console.error("Erro ao buscar ações: ", err);
            }
        };

        getActions()
    }, [])

    return (
        <>
            <Typography variant="h5" gutterBottom sx={{ mt: 3, mb: 3, fontWeight: '800' }}>
                Veja e inscreva-se em nossas próximas ações
            </Typography>
            {actions.map((action, index) => (
                <CardActions index={index}  id={action.id} link={`/nossas-acoes/${action.id}`} titulo={action.name} key={action.id} descricao={action.description} imagem={action.image} />
            ))}
        </>
    )
}
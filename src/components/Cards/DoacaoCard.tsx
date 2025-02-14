'use client'
import React from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';

interface DoacaoCardProps {
  valor: number;
  labelBotao: string;
  page: string;
  nextPage: (value: string) => void;
  changeDoacao: (value: number) => void;
}

export default function DoacaoCard ({ valor, labelBotao, page, nextPage, changeDoacao }: DoacaoCardProps) {

  const handleDoacao = () => {
    changeDoacao(valor);
    nextPage(page);
  }
  
  return (
    <Card
      sx={{
        borderRadius: '12px',
        boxShadow: '0px -2px 6px rgba(0, 0, 0, 0.05), 0px 2px 6px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        padding: 2,
      }}
    >
      <CardContent>
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          R${valor}
        </Typography>
        <Button
          variant="contained"
          onClick={handleDoacao}
          sx={{
            backgroundColor: '#006400',
            width: '100%',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#004d00',
            },
          }}
        >
          {labelBotao}
        </Button>
      </CardContent>
    </Card>
  );
};
import React from 'react';
import { Box, Typography, IconButton, Container } from '@mui/material';
import { WhatsApp, Instagram, Facebook } from '@mui/icons-material';
import Image from 'next/image';


import IconeGov from '../../assets/img/footer-gov-df.svg';
import IconeEstadoRJ from '../../assets/img/footer-estado-rj.svg';
import IconeSP from '../../assets/img/footer-sp.svg';

const Footer = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#0b6d02',
                color: '#ffffff',
                py: '20px',
            }}
        >
            <Container
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '20px',
                }}
            >
                {/* Seção de Contato */}
                <Box sx={{ flex: '1 1 30%', minWidth: '200px' }}>
                    <Typography variant="h6" gutterBottom>
                        Fale com a gente
                    </Typography>
                    <Typography>Email: cleancity@gmail.com</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography>Telefone: (11) 0800-15-78</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '10px' }}>
                        <IconButton color="inherit">
                            <Instagram />
                        </IconButton>
                        <IconButton color="inherit">
                            <Facebook />
                        </IconButton>
                        <IconButton color="inherit">
                            <WhatsApp />
                        </IconButton>
                    </Box>
                </Box>

                {/* Seção de Endereço */}
                <Box sx={{ flex: '1 1 30%', minWidth: '200px' }}>
                    <Typography variant="h6" gutterBottom>
                        Sede em São Paulo
                    </Typography>
                    <Typography>Rua Piracicaba, 87</Typography>
                    <Typography>Vila Euclides, São Paulo - SP</Typography>
                    <Typography>CEP: 043018-009</Typography>
                </Box>

                {/* Seção de Parceiros */}
                <Box sx={{ flex: '1 1 30%', minWidth: '200px', textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                        Nossos Parceiros
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: '40px' }}>
                    <Image src={IconeGov} width={60} height={84} alt="Logo" priority />
                    <Image src={IconeEstadoRJ} width={60} height={73} alt="Logo" priority />
                    <Image src={IconeSP} width={60} height={77} alt="Logo" priority />
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;

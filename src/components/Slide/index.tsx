'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../../services/api";

export default function Slide() {

    const [actions, setActions] = useState(null)
  
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
            {actions ? (
                <Swiper 
                    pagination={{
                    clickable: true,
                    }}
                    observer={true}
                    observeParents={true}
                    spaceBetween={20}
                    breakpoints={{
                        640: {
                        slidesPerView: 1,
                        },
                        768: {
                        slidesPerView: 2,
                        },
                        1024: {
                        slidesPerView: 3,
                        },
                    }}
                    className="mySwiper"
                    lazyPreloadPrevNext={3}
                >
                    {actions.map(({ id, name, image}) => (
                        <SwiperSlide key={id}>
                            <Box component="img" src={image} alt={name} sx={{ width: '100%', height: { xs: 250, sm: 250, md: 300 }, objectFit: 'cover' }} />
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button href={`/nossas-acoes/${id}`} variant="contained" sx={{ backgroundColor: 'var(--slide-button-color)', width: '50%', marginTop: 2, paddingY: '12px', borderRadius: '8px', textTransform: 'capitalize'}}>Participar 💛</Button>
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <Box height={300} sx={{ backgroundColor: 'white' }}></Box>
            )}
        </>
    );
}
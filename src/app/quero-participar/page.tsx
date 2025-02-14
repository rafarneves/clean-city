'use client'
import { Box, Button, Divider, Link, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";

export default function QueroParticipar() {

    const [email, setEmail] = useState<string>('')
    const [senha, setSenha] = useState<string>('')
    
    const { login, setFeedback } = useContext(AuthContext)
    const router = useRouter();

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleSenha = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSenha(e.target.value)
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const resposta = await fetch('https://clean-city-059c7f60732d.herokuapp.com/clean-city/api/v1/auth/authenticate', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: email,
                    password: senha
                })
            })

            if (!resposta.ok) {
                setFeedback({ message: "Login e/ou senha inválidos.", severity: 'error' })
                return
            }

            const data = await resposta.json()

            login(data.token, {
                id: data.id,
                name: data.name,
                username: data.username,
                roles: data.roles
            })
        } catch (err: any) {
            setFeedback({ message: err, severity: 'error' })
        }
    }

    return (
        <>
            <Box
                sx={{
                    width: 400,
                    margin: "auto",
                    marginTop: 2,
                    padding: 3,
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    textAlign: "center",
                }}
            >
                {/* Título */}
                <Typography variant="h5" gutterBottom>
                    Entre ou cadastre-se
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Insira seu e-mail para utilizar o CleanCity
                </Typography>

                {/* Formulário */}
                <Box component="form" noValidate autoComplete="off">
                    <TextField
                        fullWidth
                        value={email}
                        onChange={handleEmail}
                        label="E-mail"
                        variant="outlined"
                        margin="normal"
                        type="email"
                        placeholder="email@domain.com"
                    />
                    <TextField
                        fullWidth
                        value={senha}
                        onChange={handleSenha}
                        label="Senha"
                        variant="outlined"
                        margin="normal"
                        type="password"
                        placeholder="Senha..."
                    />
                    <Button
                        fullWidth
                        onClick={handleLogin}
                        variant="contained"
                        sx={{
                            marginTop: 2,
                            backgroundColor: "#35BD8E",
                            textTransform: "none",
                            "&:hover": { backgroundColor: "#2BA97C" },
                        }}
                    >
                        Continuar com e-mail
                    </Button>
                    <Button
                        fullWidth
                        onClick={() => router.push('/cadastro')}
                        variant="contained"
                        sx={{
                            marginTop: 5,
                            backgroundColor: "#35BD8E",
                            textTransform: "none",
                            "&:hover": { backgroundColor: "#2BA97C" },
                        }}
                    >
                        Crie sua conta
                    </Button>
                </Box>

                {/* Divisor */}
                <Divider
                    sx={{
                        marginY: 3,
                        color: "#828282", // Cor do texto "ou"
                        "&::before, &::after": {
                            borderColor: "#828282", // Cor das linhas do divisor
                        },
                    }}
                >
                    ou
                </Divider>

                {/* Botão Google */}


                {/* Texto final */}
                <Typography variant="caption" display="block" color="text.secondary">
                    Ao continuar com a criação da conta, você concorda com os nossos{" "}
                    <Link href="#" underline="hover">
                        Termos de Serviço
                    </Link>{" "}
                    e{" "}
                    <Link href="#" underline="hover">
                        Políticas de Privacidade
                    </Link>
                </Typography>
            </Box>
        </>
    )
}
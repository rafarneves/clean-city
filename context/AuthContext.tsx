'use client'
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie"
import { Alert, Snackbar } from "@mui/material";

interface User {
    id: number;
    name: string;
    username: string;
    roles: string[];
    token?: string;
}

interface Feedback {
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
}

interface AuthContextData {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
    doacao: (valor: number) => void;
    login: (token: string, user: User) => void;
    logout: () => void;
    setFeedback: (feedback: Feedback | null) => void;
}

export const AuthContext = createContext<AuthContextData | undefined>(undefined);

const TOKEN_KEY = "CLEAN_CITY_TOKEN"
const USER_KEY = "USER_INFO"

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [reais, setReais] = useState(0);
    const [isInitialized, setIsInitialized] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const router = useRouter();

    useEffect(() => {
        const dataToken = Cookies.get(TOKEN_KEY);
        const dataUser = Cookies.get(USER_KEY);

        if (dataToken) {
            const userInfo = JSON.parse(dataUser);
            const isAdmin = userInfo.roles.includes('ADMIN');
            setIsAdmin(isAdmin);
            validateToken(dataToken).finally(() => {
                setUser(userInfo)
                setIsInitialized(true)
            })
        } else {
            setIsInitialized(true)
        }
    }, []);

    const validateToken = async (token: string) => {
        try {
          const response = await fetch(`https://clean-city-059c7f60732d.herokuapp.com/clean-city/api/v1/auth/validate?token=${token}`);
    
          if (response.ok) {
            setToken(token)
            setIsAuthenticated(true);
          } else {
            Cookies.remove(TOKEN_KEY);
            Cookies.remove(USER_KEY);
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error('Erro ao validar token:', error);
          setIsAuthenticated(false);
        }
    };

    const login = (token: string, user: User) => {
        setToken(token);
        setUser(user)
        setIsAuthenticated(true);
        setIsAdmin(user.roles?.includes('ADMIN'));
        Cookies.set(TOKEN_KEY, token, {
            secure: true,
            sameSite: 'Strict'
        });
        Cookies.set(USER_KEY, JSON.stringify(user), {
            secure: true,
            sameSite: 'Strict'
        })
        setFeedback({ message: 'Login bem-sucedido!', severity: 'success' });
        router.push('/')
    }

    const logout = () => {
        setToken(null);
        setUser(null)
        setIsAuthenticated(false)
        Cookies.remove(TOKEN_KEY);
        Cookies.remove(USER_KEY);
        setFeedback({ message: 'Logout bem-sucedido!', severity: 'success' });
        router.push('/');
    }

    const doacao = async (valor: number) => {
        setReais(valor);
    }

    const handleCloseFeedback = () => {
        setFeedback(null);
    }

    if (!isInitialized) return null

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, isAdmin, doacao, login, logout, setFeedback }}>
            {children}
            {feedback && (
                <Snackbar open={true} autoHideDuration={6000} onClose={handleCloseFeedback}>
                    <Alert onClose={handleCloseFeedback} severity={feedback.severity}>
                        {feedback.message}
                    </Alert>
                </Snackbar>
            )}
        </AuthContext.Provider>
    )
}
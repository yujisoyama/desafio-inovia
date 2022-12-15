import { createContext, useContext, useState } from "react";
import { api } from "../Api";

interface ICliente {
    nome: string;
    endereco: string;
    telefone: string;
    email: string;
    data_nascimento: string;
    foto_perfil: string;
}

interface IClienteContext {
    cliente: ICliente,
    token: string,
    authenticated: boolean | undefined,
    authErrorMessage: string,
    setCliente: React.Dispatch<React.SetStateAction<ICliente>>;
    setToken: React.Dispatch<React.SetStateAction<string>>;
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean | undefined>>;
    setAuthErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    getProfile(token: string): any;
}

const CLIENTE_CONTEXT_DEFAULT = {
    cliente: {
        nome: '',
        endereco: '',
        telefone: '',
        email: '',
        data_nascimento: '',
        foto_perfil: '',
    },
    token: '',
    authenticated: undefined,
    authErrorMessage: '',
    setCliente: () => { },
    setToken: () => { },
    setAuthenticated: () => { },
    setAuthErrorMessage: () => { },
    getProfile: () => { }
}

export const ClienteContext = createContext<IClienteContext>(CLIENTE_CONTEXT_DEFAULT);

export const ClienteProvider = (props: any) => {
    const [cliente, setCliente] = useState<ICliente>(CLIENTE_CONTEXT_DEFAULT.cliente);
    const [token, setToken] = useState<string>(localStorage.getItem('inoviaToken') || '');
    const [authenticated, setAuthenticated] = useState<boolean | undefined>(undefined);
    const [authErrorMessage, setAuthErrorMessage] = useState('');

    const getProfile = async (token: string) => {
        try {
            const result = await api.get('/clientes/profile', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log(result);
            
            setAuthenticated(true);
        } catch (error: any) {
            localStorage.setItem('inoviaToken', '');
            setAuthErrorMessage(error.response.data.message);
            setAuthenticated(false);
        }
    }

    return (
        <ClienteContext.Provider value={{ cliente, token, authenticated, authErrorMessage, setCliente, setToken, setAuthenticated, setAuthErrorMessage, getProfile }} >
            {props.children}
        </ClienteContext.Provider>
    )
}

export const useCliente = () => useContext(ClienteContext);
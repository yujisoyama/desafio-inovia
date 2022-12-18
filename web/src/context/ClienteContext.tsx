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
    setCliente: React.Dispatch<React.SetStateAction<ICliente>>;
    setToken: React.Dispatch<React.SetStateAction<string>>;
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean | undefined>>;
    getProfile(token: string): any;
}

export const CLIENTE_CONTEXT_DEFAULT = {
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

    const getProfile = async (token: string) => {
        try {
            const result = await api.get('/clientes/profile', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            setCliente(result.data);
            setAuthenticated(true);
        } catch (error: any) {
            localStorage.setItem('inoviaToken', '');
            setAuthenticated(false);
        }
    }

    return (
        <ClienteContext.Provider value={{ cliente, token, authenticated, setCliente, setToken, setAuthenticated, getProfile }} >
            {props.children}
        </ClienteContext.Provider>
    )
}

export const useCliente = () => useContext(ClienteContext);
import { SignIn } from "phosphor-react"
import { FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { api } from "../Api"
import { useCliente } from "../context/ClienteContext"
import { ConfirmButton } from "./ConfirmButton"
import { TextInput } from "./TextInput"

export const LoginForm = () => {
    const { authErrorMessage, setAuthErrorMessage, setToken, setAuthenticated } = useCliente();
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event: FormEvent) => {
        event.preventDefault();
        setAuthenticated(undefined);
        setIsLoading(true);
        setLoginError('');
        setAuthErrorMessage('');
        const formData = new FormData(event.target as HTMLFormElement);
        const form = Object.fromEntries(formData);
        try {
            const tokenResponse = await api.post('/auth', {
                login: form.login,
                senha: form.senha
            });
            localStorage.setItem("inoviaToken", tokenResponse.data.access_token);
            setToken(tokenResponse.data.access_token);
            navigate('/dashboard');
        } catch (error: any) {
            setLoginError(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-[400px] p-8 mx-auto my-12 opacity-95 rounded-[15px] bg-background font-open relative">
            <SignIn className="mx-auto" size={40} color="#fffffe" weight="bold" />
            <h1 className="text-main text-center font-extrabold text-2xl mt-3 mb-7">Faça o login na sua conta</h1>
            <div>
                <form onSubmit={handleLogin} className="flex flex-col gap-6 relative">
                    <TextInput id='login' name='login' label='login' inputSize='medium' type='text' placeholder='' />
                    <TextInput id='senha' name='senha' label='senha' inputSize='medium' type='password' placeholder='' />
                    {loginError &&
                        <div className="w-full mx-auto border-2 border-alert rounded-md text-center text-sm text-alert p-2">
                            {loginError}
                        </div>
                    }
                    {authErrorMessage &&
                        <div className="w-full mx-auto border-2 border-alert rounded-md text-center text-sm text-alert p-2">
                            Sessão expirada, faça o login novamnte
                        </div>
                    }
                    <ConfirmButton label='login' isLoading={isLoading} type='submit' />
                    <div className="text-sm text-secondary font-semibold w-full text-center flex justify-center gap-3 mobile:gap-2">
                        <p className="inline">Não tem uma conta?</p>
                        <p><Link to="/signup" className="text-main hover:underline">Cadastre-se!</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}
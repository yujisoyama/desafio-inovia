import { SignIn } from "phosphor-react"
import { FormEvent, useState } from "react"
import { Link } from "react-router-dom"
import { ConfirmButton } from "./ConfirmButton"
import { TextInput } from "./TextInput"

interface ISignUpForm {
    nome: string;
    endereco: string;
    telefone: string;
    email: string;
    data_nascimento: string;
    login: string;
    senha: string;
}

const useForm = () => {
    const [values, setValues] = useState<ISignUpForm>({
        nome: '',
        endereco: '',
        telefone: '',
        email: '',
        data_nascimento: '',
        login: '',
        senha: '',
    })

    return {
        values,
    }
}


export const LoginForm = () => {

    const handleLogin = (event: FormEvent) => {
        console.log('click');
    }

    return (
        <div className="w-[400px] p-8 mx-auto my-12 opacity-95 rounded-[15px] bg-background font-open relative">
            <SignIn className="mx-auto" size={40} color="#fffffe" weight="bold" />
            <h1 className="text-main text-center font-extrabold text-2xl mt-3 mb-7">Faça o login na sua conta</h1>
            <div>
                <form className="flex flex-col gap-6 relative">
                    <TextInput label='login' type='text' placeholder='' value='' />
                    <TextInput label='senha' type='password' placeholder='' value='' />
                    <ConfirmButton label='login' isLoading={false} onClick={handleLogin} />
                    <div className="text-sm text-secondary font-semibold w-full text-center flex justify-center gap-3 mobile:gap-2">
                        <p className="inline">Não tem uma conta?</p>
                        <p><Link to="/signup" className="text-main hover:underline">Cadastre-se!</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}
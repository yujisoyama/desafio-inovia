import { NotePencil } from "phosphor-react"
import { ChangeEvent, FormEvent, useState } from "react"
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
        handleChange: (event: ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            const name = event.target.name;
            setValues({
                ...values,
                [name]: value
            })
        }
    }
}

export const SignUpForm = () => {
    const formSignUp = useForm();

    const handleSignUp = (event: FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const form = Object.fromEntries(formData);
        console.log(form);
        
    }

    return (
        <div className="w-[400px] p-8 mx-auto my-12 opacity-95 rounded-[15px] bg-background font-open relative">
            <NotePencil className="mx-auto" size={40} color="#fffffe" weight="bold" />
            <h1 className="text-main text-center font-extrabold text-2xl mt-3 mb-7">Cadastro</h1>
            <div>
                <form onSubmit={handleSignUp} className="flex flex-col gap-6 relative">
                    <TextInput id='nome' name='nome' label='nome' type='text' placeholder='Nome Completo' />
                    <TextInput id='endereco' name='endereco' label='endereço' type='text' placeholder='Nome da Rua - Cidade' />
                    <TextInput id='telefone' name='telefone' label='telefone' type='text' placeholder='(11) 98765-4321'/>
                    <TextInput id='email' name='email' label='email' type='password' placeholder='exemplo@gmail.com' />
                    <TextInput id='data_nascimento' name='data_nascimento' label='data de nascimento' type='text' />
                    <TextInput id='login' name='login' label='login' type='text' placeholder='login'  />
                    <TextInput id='senha' name='senha' label='senha' type='password' placeholder='senha' />
                    <ConfirmButton label='Cadastrar' isLoading={false} onClick={handleSignUp} />
                    <button type="submit">asdsadad</button>
                    <div className="text-sm text-secondary font-semibold w-full text-center flex justify-center gap-3 mobile:gap-2">
                        <p className="inline">Já tem uma conta?</p>
                        <p><Link to="/" className="text-main hover:underline">Faça o login!</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}
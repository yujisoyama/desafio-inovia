import { CheckSquare, NotePencil } from "phosphor-react"
import { FormEvent, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { z, ZodError } from "zod"
import { api } from "../Api"
import { ConfirmButton } from "./ConfirmButton"
import { DateInput } from "./DateInput"
import { TextInput } from "./TextInput"


export const SignUpForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState({
        nome: { error: false, message: '' },
        endereco: { error: false, message: '' },
        telefone: { error: false, message: '' },
        email: { error: false, message: '' },
        data_nascimento: { error: false, message: '' },
        login: { error: false, message: '' },
        senha: { error: false, message: '' },
    });
    const [clienteName, setClienteName] = useState('');
    const [clienteCreated, setClienteCriated] = useState(false);

    type ObjectKey = keyof typeof formError;

    const handleSignUp = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        const formData = new FormData(event.target as HTMLFormElement);
        const form = Object.fromEntries(formData);
        const createClienteSchema = z.object({
            nome: z.string().min(1, { message: 'Nome inválido' }),
            endereco: z.string().min(1, { message: 'Endereço inválido' }),
            telefone: z.string().min(1, { message: 'Telefone inválido' }),
            email: z.string().email({ message: 'Email inválido' }),
            data_nascimento: z.string(),
            login: z.string().min(5, { message: 'Deve conter no mínimo 5 caracteres' }),
            senha: z.string().min(5, { message: 'Deve conter no mínimo 5 caracteres' })
        });

        const data = form.data_nascimento.toString().split("/");
        try {
            const createClienteBody = createClienteSchema.parse({
                nome: form.nome,
                endereco: form.endereco,
                telefone: form.telefone,
                email: form.email,
                data_nascimento: `${data[2]}-${data[1]}-${data[0]}`,
                login: form.login,
                senha: form.senha
            });
            await api.post('/clientes', createClienteBody);
            setClienteName(form.nome.toString());
            setClienteCriated(true);
        } catch (error) {
            console.log(error);
            if (error instanceof z.ZodError) {
                let formErrorAux = formError;
                error.issues.forEach(issue => {
                    const property = issue.path[0] as ObjectKey;
                    formErrorAux = { ...formErrorAux, [property]: { error: true, message: issue.message } }
                    setFormError(formErrorAux);
                })
            }
        } finally {
            setIsLoading(false);
        }
    }

    if (clienteCreated) {
        return (
            <div className="w-[400px] p-8 mx-auto my-12 opacity-95 rounded-[15px] bg-background font-open relative text-main">
                <CheckSquare className="mx-auto" size={40} color="#39DCC1" weight="bold" />
                <h1 className="text-highlight text-center font-extrabold text-2xl mt-3 mb-4">Conta criada!</h1>
                <p className="mb-4">Olá {clienteName}, </p>
                <p>Sinta-se livre para utilizar a plataforma.</p>
                <p className="mb-4">Espero que goste!</p>
                <p className="text-right"><Link to="/login" className="text-main text-sm hover:underline">Return to Log in page</Link></p>
            </div>
        )
    }

    return (
        <div className="w-[400px] p-8 mx-auto my-12 opacity-95 rounded-[15px] bg-background font-open relative">
            <NotePencil className="mx-auto" size={40} color="#fffffe" weight="bold" />
            <h1 className="text-main text-center font-extrabold text-2xl mt-3 mb-7">Cadastro</h1>
            <div>
                <form onSubmit={handleSignUp} className="flex flex-col gap-6 relative">
                    <TextInput id='nome' name='nome' label='Nome' inputSize='medium' type='text' placeholder='Nome Completo' error={formError.nome.error} helperText={formError.nome.message} />
                    <TextInput id='endereco' name='endereco' label='Endereço' inputSize='medium' type='text' placeholder='Nome da Rua - Cidade' error={formError.endereco.error} helperText={formError.endereco.message} />
                    <TextInput id='telefone' name='telefone' label='Telefone (só números)' inputSize='medium' type='text' placeholder='1198765-4321' error={formError.telefone.error} helperText={formError.telefone.message} />
                    <TextInput id='email' name='email' label='Email' inputSize='medium' type='text' placeholder='exemplo@gmail.com' error={formError.email.error} helperText={formError.email.message} />
                    <DateInput id='data_nascimento' name='data_nascimento' label='Data de Nascimento' />
                    <TextInput id='login' name='login' label='Login' inputSize='medium' type='text' placeholder='login' error={formError.login.error} helperText={formError.login.message} />
                    <TextInput id='senha' name='senha' label='Senha' inputSize='medium' type='password' placeholder='senha' error={formError.senha.error} helperText={formError.senha.message} />
                    <ConfirmButton label='Cadastrar' isLoading={false} type='submit' />
                    <div className="text-sm text-secondary font-semibold w-full text-center flex justify-center gap-3 mobile:gap-2">
                        <p className="inline">Já tem uma conta?</p>
                        <p><Link to="/login" className="text-main hover:underline">Faça o login!</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}
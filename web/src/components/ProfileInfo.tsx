import { FormEvent, useState } from "react";
import { z } from "zod";
import { api } from "../Api";
import { useCliente } from "../context/ClienteContext";
import { DateInput } from "./DateInput";
import { PrimaryButton } from "./PrimaryButton";
import { SecondaryButton } from "./SecondaryButton";
import { FORM_ERROR_DEFAULT } from "./SignUpForm";
import { TextInput } from "./TextInput";
import defaultAvatar from '../../assets/defaultAvatar.png'

export const ProfileInfo = () => {
    const { cliente, token } = useCliente();
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState(FORM_ERROR_DEFAULT);
    const [updatedMessage, setUpdatedMessage] = useState('');

    type ObjectKey = keyof typeof formError;

    const handleUpdateCliente = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        const formData = new FormData(event.target as HTMLFormElement);
        const form = Object.fromEntries(formData);
        const createClienteSchema = z.object({
            nome: z.string().min(1, { message: 'Nome inválido' }),
            endereco: z.string().min(1, { message: 'Endereço inválido' }),
            telefone: z.string().min(1, { message: 'Telefone inválido' }),
            email: z.string().email({ message: 'Email inválido' }),
            data_nascimento: z.string()
        });
        const data = form.data_nascimento.toString().split("/");

        try {
            const updateClienteBody = createClienteSchema.parse({
                nome: form.nome,
                endereco: form.endereco,
                telefone: form.telefone,
                email: form.email,
                data_nascimento: `${data[2]}-${data[1]}-${data[0]}`,
            });
            const result = await api.post('/clientes/profile', updateClienteBody, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (result.status === 200) {
                setUpdatedMessage('Seus dados foram atualizados!');
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                let formErrorAux = FORM_ERROR_DEFAULT;
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

    return (
        <div className=" bg-background p-8 w-3/5 mx-auto mt-10 mb-16 rounded-xl border border-highlight">
            <p className="text-main text-2xl font-bold mb-8">Editar Perfil</p>
            <div className="flex flex-wrap justify-evenly gap-4">
                <div className="flex flex-col gap-6">
                    <img className="w-72 h-72 rounded-full" src={cliente.foto_perfil ? cliente.foto_perfil : defaultAvatar} alt="avatar" />
                    <SecondaryButton label='Editar avatar' />
                </div>
                <form onSubmit={handleUpdateCliente} className="w-80 flex flex-col gap-6">
                    <TextInput id='nome' name='nome' label='Nome' inputSize='medium' type='text' placeholder='Nome Completo' defaultValue={cliente.nome} error={formError.nome.error} helperText={formError.nome.message} />
                    <TextInput id='endereco' name='endereco' label='Endereço' inputSize='medium' type='text' placeholder='Nome da Rua - Cidade' defaultValue={cliente.endereco} error={formError.endereco.error} helperText={formError.endereco.message} />
                    <TextInput id='telefone' name='telefone' label='Telefone (só números)' inputSize='medium' type='text' placeholder='1198765-4321' defaultValue={cliente.telefone} error={formError.telefone.error} helperText={formError.telefone.message} />
                    <TextInput id='email' name='email' label='Email' inputSize='medium' type='text' placeholder='exemplo@gmail.com' defaultValue={cliente.email} error={formError.email.error} helperText={formError.email.message} />
                    <DateInput id='data_nascimento' name='data_nascimento' label='Data de Nascimento' defaultValue={cliente.data_nascimento} />
                    <PrimaryButton label='salvar' isLoading={isLoading} type='submit' />
                    {updatedMessage && <p className="text-highlight text-right">{updatedMessage}</p>}
                </form>
            </div>
        </div>
    )
}

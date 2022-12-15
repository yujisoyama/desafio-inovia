import { useCliente } from '../context/ClienteContext';

export const Avatar = () => {
    const { cliente } = useCliente();

    return (
        <div className='p-2 rounded-lg border border-background hover:cursor-pointer hover:border-highlight duration-100'>
            <img className='rounded-full w-10 h-10 hover:cursor-pointer' src={cliente.foto_perfil} alt="avatar" />
        </div>
    )
}

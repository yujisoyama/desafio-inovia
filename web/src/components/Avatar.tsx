import { useCliente } from '../context/ClienteContext';
import defaultAvatar from '../../assets/defaultAvatar.png'

export const Avatar = () => {
    const { cliente } = useCliente();

    return (
        <div className='p-2 rounded-lg border border-background hover:cursor-pointer hover:border-highlight duration-100'>
            <img className='rounded-full w-10 h-10 hover:cursor-pointer border-2 border-highlight' src={cliente.foto_perfil ? cliente.foto_perfil : defaultAvatar} alt="avatar" />
        </div>
    )
}

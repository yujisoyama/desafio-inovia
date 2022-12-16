import { useNavigate } from 'react-router-dom';
import { CancelButton } from './CancelButton'
import { ConfirmButton } from './ConfirmButton'
import { ConfirmIconButton } from './ConfirmIconButton';
import SearchIcon from '@mui/icons-material/Search';
import { TextInput } from "./TextInput"
import { useCliente } from '../context/ClienteContext';
import { useEffect } from 'react';
import { Logo } from './Logo';
import { Avatar } from './Avatar';
import { ShoppingCart } from './ShoppingCart';

export const ProductsHeader = () => {
    const { authenticated, token, getProfile } = useCliente();
    const navigate = useNavigate();

    const goToLogin = () => navigate('/login');
    const goToSignUp = () => navigate('/signup');

    const handleSearchProducts = () => {
    }

    useEffect(() => {
        getProfile(token);
    }, [])

    const renderProductsHeaderMenu = () => {
        if (authenticated === undefined) {
            return <></>
        }

        if (authenticated === false) {
            return (
                <>
                    <div className='w-20'>
                        <ConfirmButton label='Login' onClick={goToLogin} />
                    </div>
                    <div className='w-32'>
                        <CancelButton label='Cadastre-se' onClick={goToSignUp} />
                    </div>
                </>
            )
        }

        if (authenticated === true) {
            return (
                <div className='flex gap-4 items-center'>
                    <ShoppingCart />
                    <Avatar />
                </div>
            )
        }
    }

    return (
        <div className="bg-background font-open flex items-center justify-between px-5 min-h-[72px] w-full">
            <div className='flex items-center gap-6 w-4/5'>
                <Logo />
                <div className='flex items-center w-2/5 min-w-[300px]'>
                    <div className='w-full'>
                        <TextInput label='Procurar produtos' inputSize='small' id='asd' name='asd' placeholder='' type='text' />
                    </div>
                    <ConfirmIconButton onClick={handleSearchProducts} icon={<SearchIcon sx={{ color: 'black' }} className='bg-button rounded-md w-8 h-8 p-1 hover:bg-buttonHover' />} />
                </div>
            </div>
            <div className='flex items-center gap-4'>
                {renderProductsHeaderMenu()}
            </div>
        </div>
    )
}

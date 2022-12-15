import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logoinovia.png'
import { CancelButton } from './CancelButton'
import { ConfirmButton } from './ConfirmButton'
import { ConfirmIconButton } from './ConfirmIconButton';
import SearchIcon from '@mui/icons-material/Search';
import { TextInput } from './TextInput';

export const MainHeader = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    }

    const handleSignUp = () => {
        navigate('/signup');
    }

    const goToMainPage = () => {
        navigate('/');
    }

    return (
        <div className="bg-background font-open flex items-center justify-between px-5 min-h-[72px] w-full">
            <div className='flex items-center gap-3'>
                <div className='hover:cursor-pointer'>
                    <img src={logo} alt="inovia" className='w-28' onClick={goToMainPage} />
                </div>
            </div>
            <div className='flex items-center w-2/5'>
                <div className='w-full'>
                    <TextInput label='procurar produtos' inputSize='small' />
                </div>
                <ConfirmIconButton icon={<SearchIcon sx={{ color: 'black' }} className='bg-button rounded-md w-8 h-8 p-1 hover:bg-buttonHover' />} />
            </div>
            <div className='flex items-center gap-4'>
                <div className='w-20'>
                    <ConfirmButton label='Login' onClick={handleLogin} />
                </div>
                <div className='w-32'>
                    <CancelButton label='Cadastre-se' onClick={handleSignUp} />
                </div>
            </div>
        </div>
    )
}

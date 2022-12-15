import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logoinovia.png'
import { CancelButton } from './CancelButton'
import { ConfirmButton } from './ConfirmButton'

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
        <div className="bg-background font-open flex items-center justify-between px-5 min-h-[72px]">
            <div className='hover:cursor-pointer'>
                <img src={logo} alt="inovia" className='w-28' onClick={goToMainPage} />
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

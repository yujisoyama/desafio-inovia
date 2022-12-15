import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logoinovia.png'

export const LoginHeader = () => {
    const navigate = useNavigate();

    const goToMainPage = () => {
        navigate('/');
    }

    return (
        <div className="bg-background font-open flex items-center justify-between px-5 min-h-[72px]">
            <div className='hover:cursor-pointer'>
                <img src={logo} alt="inovia" className='w-28' onClick={goToMainPage} />
            </div>
            <p className="text-secondary">Approaching Technologies</p>
        </div>
    )
}

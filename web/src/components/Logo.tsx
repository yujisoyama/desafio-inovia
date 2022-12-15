import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logoinovia.png'

export const Logo = () => {
    const navigate = useNavigate();
    
    const goToMainPage = () => navigate('/');

    return (
        <div className='hover:cursor-pointer'>
            <img src={logo} alt="inovia" className='w-28' onClick={goToMainPage} />
        </div>
    )
}

import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logoinovia.png'
import { setFilter } from '../store/reducers/filterSlice';
import { useAppDispatch } from '../store/store';

export const Logo = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const goToMainPage = () => {
        dispatch(setFilter(''));
        navigate('/');
    }

    return (
        <div className='hover:cursor-pointer'>
            <img src={logo} alt="inovia" className='w-28' onClick={goToMainPage} />
        </div>
    )
}

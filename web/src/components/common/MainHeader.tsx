import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from './PrimaryButton'
import { TextInput } from "./TextInput"
import { useCliente } from '../../context/ClienteContext';
import { FormEvent, useEffect } from 'react';
import { Logo } from './Logo';
import { MagnifyingGlass } from 'phosphor-react';
import { setFilter, selectFilter } from '../../store/reducers/filterSlice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store/store';
import { NotLoggedHeader } from './NotLoggedHeader';
import { LoggedHeader } from './LoggedHeader';


export const MainHeader = () => {
    const { authenticated, token, setAuthenticated, getProfile } = useCliente();
    const navigate = useNavigate();
    const filter = useSelector(selectFilter);
    const dispatch = useAppDispatch();

    const handleSearchProducts = (event: FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const form = Object.fromEntries(formData);
        dispatch(setFilter(form.filter));
        navigate('/');
    }

    useEffect(() => {
        if (token) {
            getProfile(token);
            return;
        }
        setAuthenticated(false);
    }, [])

    const renderMainHeader = () => {
        if (authenticated === undefined) {
            return <></>
        }

        if (authenticated === false) {
            return (
                <NotLoggedHeader />
            )
        }

        if (authenticated === true) {
            return (
                <LoggedHeader />
            )
        }
    }

    return (
        <div className="bg-background font-open flex items-center justify-between px-5 min-h-[72px] w-full">
            <div className='flex items-center gap-6 w-4/5'>
                <Logo />
                <form onSubmit={handleSearchProducts} className='flex items-center w-2/5 min-w-[300px]'>
                    <div className='w-[300px]'>
                        <TextInput id='filter' name='filter' label='Buscar por nome/marca' inputSize='small' placeholder='' type='text' defaultValue={filter} />
                    </div>
                    <div className='ml-2'>
                        <PrimaryButton label='' type='submit' icon={<MagnifyingGlass className='ml-3' size={20} color="#031827" weight="bold" />} />
                    </div>
                </form>
            </div>
            <div className='flex items-center gap-4'>
                {renderMainHeader()}
            </div>
        </div>
    )
}

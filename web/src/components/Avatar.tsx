// import { useCliente } from '../context/ClienteContext';
// import defaultAvatar from '../../assets/defaultAvatar.png'

// export const Avatar = () => {
//     const { cliente } = useCliente();

//     return (
//         <div className='p-2 rounded-lg border border-background hover:cursor-pointer hover:border-highlight duration-100'>
//             <img className='rounded-full w-10 h-10 hover:cursor-pointer border-2 border-highlight' src={cliente.foto_perfil ? cliente.foto_perfil : defaultAvatar} alt="avatar" />
//         </div>
//     )
// }

import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import defaultAvatar from '../../assets/defaultAvatar.png'
import { CLIENTE_CONTEXT_DEFAULT, useCliente } from '../context/ClienteContext';
import { useNavigate } from 'react-router-dom';


export const Avatar = () => {
    const { cliente, setCliente, setAuthenticated, setToken } = useCliente();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleLogOut = () => {
        setCliente(CLIENTE_CONTEXT_DEFAULT.cliente);
        setToken('');
        localStorage.setItem('inoviaToken', '');
        setAuthenticated(false);
        navigate('/');
    }

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <div className='p-2 rounded-lg border border-background hover:cursor-pointer hover:border-highlight duration-100'>
                    <img className='rounded-full w-10 h-10 hover:cursor-pointer border-2 border-highlight' src={cliente.foto_perfil ? cliente.foto_perfil : defaultAvatar} alt="avatar" />
                </div>
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    sx: {
                        backgroundColor: '#1A2027',
                        color: '#1de9b6'
                    }
                }}
            >
                <MenuItem onClick={handleClose}>Dashboard</MenuItem>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogOut}>Logout</MenuItem>
            </Menu>
        </div>
    );
}
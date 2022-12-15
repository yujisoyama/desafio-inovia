import IconButton from '@mui/material/IconButton';
import { FormEvent } from 'react';

interface IConfirmIconButtonProps {
    icon?: any
    onClick?: (event: FormEvent) => void;
}

export const ConfirmIconButton = ({ icon }: IConfirmIconButtonProps) => {

    return (
        <IconButton>
            {icon}
        </IconButton>
    )
}

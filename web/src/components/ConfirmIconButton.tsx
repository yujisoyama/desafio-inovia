import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

interface IConfirmIconButtonProps {
    icon?: any
}

export const ConfirmIconButton = ({ icon }: IConfirmIconButtonProps) => {

    return (
        <IconButton>
            {icon}
        </IconButton>
    )
}

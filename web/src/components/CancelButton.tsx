import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';
import { ButtonHTMLAttributes, FormEvent } from 'react';
import { styled } from '@mui/material/styles';
import { teal } from '@mui/material/colors';

interface ICancelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    isLoading?: boolean;
    icon?: any,
    onClick?: (event: FormEvent) => void;
}

const ColorLoadingButton = styled(LoadingButton)<LoadingButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(teal[200]),
    backgroundColor: 'transparent',
    borderColor: teal['A400'],
    '&:hover': {
        borderColor: teal['A200'],
    },
}));

export const CancelButton = ({ label, isLoading, type, icon, onClick }: ICancelButtonProps) => {
    return (
        <ColorLoadingButton
            fullWidth
            type={type}
            onClick={onClick}
            loading={isLoading}
            startIcon={icon}
            variant="outlined"
            sx={{
                color: '#77FFE9'
            }}
            className='p-2 font-bold'
        >
            {label}
        </ColorLoadingButton>
    )
}

import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';
import { ButtonHTMLAttributes, FormEvent } from 'react';
import { styled } from '@mui/material/styles';
import { teal } from '@mui/material/colors';
import { CircularProgress } from '@mui/material';

interface IConfirmButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    isLoading: boolean;
    onClick?: (event: FormEvent) => void
}

const ColorLoadingButton = styled(LoadingButton)<LoadingButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(teal[200]),
    backgroundColor: teal['A400'],
    '&:hover': {
        backgroundColor: teal['A200'],
    },
}));

export const ConfirmButton = ({ label, isLoading, type, onClick }: IConfirmButtonProps) => {

    if (isLoading) {
        return (
            <ColorLoadingButton
                type={type}
                onClick={onClick}
                variant="contained"
                className='p-2'
            >
                <CircularProgress size={25} color='inherit' />
            </ColorLoadingButton>
        )
    }

    return (
        <ColorLoadingButton
            type={type}
            onClick={onClick}
            variant="contained"
            className='p-2'
        >
            {label}
        </ColorLoadingButton>
    )
}

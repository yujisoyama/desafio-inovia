import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';
import { ButtonHTMLAttributes, FormEvent } from 'react';
import { styled } from '@mui/material/styles';
import { teal } from '@mui/material/colors';
import { CircularProgress } from '@mui/material';

interface IConfirmButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    isLoading?: boolean;
    onClick?: (event: FormEvent) => void
}

const ColorLoadingButton = styled(LoadingButton)<LoadingButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(teal[200]),
    backgroundColor: teal['A400'],
    borderColor: teal['A400'],
    '&:hover': {
        backgroundColor: teal['A200'],
        borderColor: teal['A200'],
    },
}));

export const ConfirmButton = ({ label, isLoading, type, onClick }: IConfirmButtonProps) => {

    if (isLoading) {
        return (
            <ColorLoadingButton
                fullWidth
                type={type}
                onClick={onClick}
                variant="contained"
            >
                <CircularProgress size={24} color='inherit' />
            </ColorLoadingButton>
        )
    }

    return (
        <ColorLoadingButton
            fullWidth
            type={type}
            onClick={onClick}
            variant="contained"
            className='p-2'
        >
            {label}
        </ColorLoadingButton>
    )
}

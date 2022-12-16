import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';
import { ButtonHTMLAttributes, FormEvent } from 'react';
import { styled } from '@mui/material/styles';
import { teal } from '@mui/material/colors';
import { CircularProgress } from '@mui/material';

interface IPrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    isLoading?: boolean;
    icon?: any,
    onClick?: (event: FormEvent) => void;
}

const ColorLoadingButton = styled(LoadingButton)<LoadingButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(teal[200]),
    backgroundColor: teal['A400'],
    borderColor: teal['A400'],
    '&:hover': {
        backgroundColor: teal['A200'],
        borderColor: teal['A200'],
    }
}));

export const PrimaryButton = ({ label, isLoading, type, icon, onClick }: IPrimaryButtonProps) => {
    return (
        <ColorLoadingButton
            fullWidth
            type={type}
            onClick={onClick}
            variant="contained"
            startIcon={icon}
            className='p-2 font-bold h-10'
            loading={isLoading}
            loadingIndicator={<CircularProgress size={20} sx={{
                color: '#1de9b6'
            }} />}
        >
            {label}
        </ColorLoadingButton>
    )
}

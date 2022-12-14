import LoadingButton from '@mui/lab/LoadingButton';
import { FormEvent } from 'react';

interface IConfirmButtonProps {
    label: string;
    isLoading: boolean;
    onClick: (event: FormEvent) => void
}

export const ConfirmButton = ({ label, isLoading, onClick }: IConfirmButtonProps) => {
    return (
        <LoadingButton
            onClick={onClick}
            loading={isLoading}
            variant="contained"
            className='bg-button hover:bg-buttonHover'
        >
            <p className='text-background font-open font-extrabold py-1'>{label}</p>
        </LoadingButton>
    )
}

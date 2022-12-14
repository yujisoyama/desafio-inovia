import LoadingButton from '@mui/lab/LoadingButton';
import { FormEvent, useState } from 'react';

interface ICancelButtonProps {
    label: string;
    isLoading: boolean;
    onClick: (event: FormEvent) => void
}

export const CancelButton = ({ label, isLoading, onClick }: ICancelButtonProps) => {
    return (
        <LoadingButton
            onClick={onClick}
            loading={isLoading}
            variant="outlined"
            className='border border-button hover:border-buttonHover'
        >
            <p className='text-highlight font-open font-extrabold py-1'>{label}</p>
        </LoadingButton>
    )
}

import LoadingButton from '@mui/lab/LoadingButton';
import { FormEvent, useState } from 'react';

interface IConfirmButtonProps {
    label: string;
    isLoading: boolean;
    onClick: (event: FormEvent) => void
}

export const ConfirmButton = ({ label, isLoading, onClick }: IConfirmButtonProps) => {
    const [isHover, setIsHover] = useState(false);

    return (
        <LoadingButton
            style={{
                backgroundColor: isHover ? '#43FFE0' : '#39DCC1',
            }}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={onClick}
            loading={isLoading}
            variant="contained"
        >
            <p className='text-background font-open font-extrabold py-1'>{label}</p>
        </LoadingButton>
    )
}

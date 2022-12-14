import LoadingButton from '@mui/lab/LoadingButton';
import { FormEvent, useState } from 'react';

interface ICancelButtonProps {
    label: string;
    isLoading: boolean;
    onClick: (event: FormEvent) => void
}

export const CancelButton = ({ label, isLoading, onClick }: ICancelButtonProps) => {
    const [isHover, setIsHover] = useState(false);

    return (
        <LoadingButton
            style={{
                borderColor: isHover ? '#43FFE0' : '#39DCC1',
            }}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={onClick}
            loading={isLoading}
            variant="outlined"
        >
            <p className='text-highlight font-open font-extrabold py-1'>{label}</p>
        </LoadingButton>
    )
}

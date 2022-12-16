import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { InputHTMLAttributes, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

interface IDateInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const CssTextField = styled(TextField)({
    '& label.MuiInputLabel-root': {
        color: '#90b4ce',
    },
    '& label.Mui-focused': {
        color: '#39DCC1',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#39DCC1',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#90b4ce',
        },
        '&:hover fieldset': {
            borderColor: '#90b4ce',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#39DCC1',
        },
    },
});

export const DateInput = ({ id, name, label }: IDateInputProps) => {
    const [value, setValue] = useState<string | null>(null);
    const date = new Date();
    const maxDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                maxDate={maxDate}
                label={label}
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                inputFormat="DD/MM/YYYY"
                renderInput={
                    (params) =>
                        <CssTextField
                            id={id}
                            name={name}
                            sx={{
                                input: { color: '#fffffe' },
                                svg: { color: '#fffffe' }
                            }}
                            {...params}
                        />
                }
            />
        </LocalizationProvider>
    );
}





import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { InputHTMLAttributes } from 'react';
import { styled } from '@mui/material/styles';

interface ITextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    inputSize: "small" | "medium";
    error?: boolean;
    helperText?: string;
    defaultValue?: string;
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

export const TextInput = ({ id, name, placeholder, type, label, inputSize, error, helperText, defaultValue }: ITextInputProps) => {
    return (
        <CssTextField
            fullWidth
            id={id}
            name={name}
            placeholder={placeholder}
            type={type}
            label={label}
            size={inputSize}
            sx={{
                input: { color: '#fffffe' }
            }}
            error={error}
            helperText={helperText}
            defaultValue={defaultValue}
        />
    );
}





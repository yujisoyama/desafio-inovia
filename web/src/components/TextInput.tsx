import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { InputHTMLAttributes } from 'react';

interface ITextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    inputSize: "small" | "medium";
    error?: boolean;
    helperText?: string;
}


export const TextInput = ({ id, name, placeholder, type, label, inputSize, error, helperText }: ITextInputProps) => {

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
        />

    );
}





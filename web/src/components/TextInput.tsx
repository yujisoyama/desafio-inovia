import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { ChangeEvent, InputHTMLAttributes, useState } from 'react';

interface ITextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}


export const TextInput = ({ id, name, placeholder, type, label }: ITextFieldProps) => {
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
        <Box
            sx={{
                width: 500,
                maxWidth: '100%',
            }}
        >
            <CssTextField
                fullWidth
                id={id}
                name={name}
                placeholder={placeholder}
                type={type}
                label={label}
                sx={{
                    input: { color: '#fffffe' }
                }}
            />
        </Box>
    );
}





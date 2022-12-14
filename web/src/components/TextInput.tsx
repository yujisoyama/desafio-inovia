import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

interface ITextInputProps {
    label: string;
    type: string;
}

export const TextInput = ({ label, type }: ITextInputProps) => {
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
                label={label}
                id="custom-css-outlined-input"
                sx={{
                    input: { color: '#fffffe' }
                }}
            />
        </Box>
    );
}





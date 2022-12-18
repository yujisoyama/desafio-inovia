import { Avatar } from "./Avatar"
import { ShoppingCart } from "./ShoppingCart"
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

export const LoggedHeader = () => {
    return (
        <div className='flex gap-4 items-center'>
            <ShoppingCart />
            <Avatar />
        </div>
    )
}


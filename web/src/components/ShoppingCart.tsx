import { ShoppingCartSimple } from 'phosphor-react'
import Badge from '@mui/material/Badge';

export const ShoppingCart = () => {
    return (
        <div className='p-3 rounded-lg border border-background hover:cursor-pointer hover:border-highlight duration-100 flex items-center gap-2 text-highlight font-noto font-extrabold'>
            <Badge badgeContent={99} color="default" sx={{ "& .MuiBadge-badge": { fontSize: 18 } }}>
                <ShoppingCartSimple size={30} color="#1de9b6" weight="bold" />
            </Badge>

        </div>
    )
}

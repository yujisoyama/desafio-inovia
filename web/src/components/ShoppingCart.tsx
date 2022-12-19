import { ShoppingCartSimple } from 'phosphor-react'
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import { useState } from 'react';

export const ShoppingCart = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = (isDrawerOpen: boolean) => (event: any) => {
        setIsDrawerOpen(isDrawerOpen);
    };

    return (
        <div className='text-highlight'>
            <Badge className='' badgeContent={99} color="warning" sx={{ "& .MuiBadge-badge": { fontSize: 15, top: 13, right: 10 } }}>
                <ShoppingCartSimple className='p-2 rounded-lg border text-highlight border-background hover:cursor-pointer hover:border-highlight duration-100' size={58} color="#1de9b6" weight="bold" onClick={toggleDrawer(true)} />
            </Badge>
            <Drawer anchor='right' open={isDrawerOpen} onClose={toggleDrawer(false)} >
                <div className='bg-backgroundLight w-96 h-full flex flex-col justify-between mobile:w-80'>
                    
                </div>
            </Drawer>
        </div>
    )
}

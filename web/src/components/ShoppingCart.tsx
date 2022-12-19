import { ShoppingCartSimple } from 'phosphor-react'
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import { useEffect, useState } from 'react';
import { selectShoppingCart } from '../store/reducers/shoppingCartSlice';
import { useSelector } from 'react-redux';
import { SecondaryButton } from './SecondaryButton';
import { ShoppingCartProduct } from './ShoppingCartProduct';
import { PrimaryButton } from './PrimaryButton';

export const ShoppingCart = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const shoppingCart = useSelector(selectShoppingCart)

    const toggleDrawer = (isDrawerOpen: boolean) => (event: any) => {
        setIsDrawerOpen(isDrawerOpen);
    };

    return (
        <div className='text-highlight'>
            <Badge className='' badgeContent={shoppingCart.total_produtos} color="warning" sx={{ "& .MuiBadge-badge": { fontSize: 15, top: 13, right: 10 } }}>
                <ShoppingCartSimple className='p-2 rounded-lg border text-highlight border-background hover:cursor-pointer hover:border-highlight duration-100' size={58} color="#1de9b6" weight="bold" onClick={toggleDrawer(true)} />
            </Badge>
            <Drawer anchor='right' open={isDrawerOpen} onClose={toggleDrawer(false)} >
                <div className='bg-backgroundLight w-96 h-full flex flex-col p-6'>
                    <p className='text-lg text-main font-medium'>Seu carrinho</p>
                    {shoppingCart.produtos.length ? (
                        <div className='mt-4 h-full flex flex-col items-center justify-between'>
                            <div className='mt-4 h-4/5 overflow-y-auto'>
                                {shoppingCart.produtos.map(produto => <ShoppingCartProduct imagem={produto.imagem} nome={produto.nome} preco={produto.preco} produtoId={produto.produtoId} quantidade={produto.quantidade} key={produto.produtoId} />)}
                            </div>
                            <p className='text-highlight text-lg font-semibold self-end'>Total: R$ {shoppingCart.total_pedido / 100}</p>
                            <PrimaryButton label='finalizar pedido' />
                        </div>
                    ) : (
                        <div className='mt-4 h-full flex flex-col items-center justify-between'>
                            <p className='text-secondary'>Seu carrinho está vazio.</p>
                            <SecondaryButton label='voltar' onClick={toggleDrawer(false)} />
                        </div>
                    )}
                </div>
            </Drawer>
        </div>
    )
}

import { ShoppingCartSimple } from 'phosphor-react'
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import { useState } from 'react';
import { clearShoppingCart, selectShoppingCart } from '../store/reducers/shoppingCartSlice';
import { useSelector } from 'react-redux';
import { SecondaryButton } from './SecondaryButton';
import { ShoppingCartProduct } from './ShoppingCartProduct';
import { PrimaryButton } from './PrimaryButton';
import { api } from '../Api';
import { useCliente } from '../context/ClienteContext';
import { useAppDispatch } from '../store/store';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ShoppingCart = () => {
    const { token } = useCliente();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const shoppingCart = useSelector(selectShoppingCart);
    const [isLoading, setIsLoading] = useState(false);
    const [orderErrorMessage, setOrderErrorMessage] = useState('');
    const dispatch = useAppDispatch();

    const toggleDrawer = (isDrawerOpen: boolean) => (event: any) => {
        setIsDrawerOpen(isDrawerOpen);
        setOrderErrorMessage('');
    };

    const finishOrder = async () => {
        const products = shoppingCart.produtos.map(({ quantidade, imagem, ...rest }) => {
            return rest;
        })

        setIsLoading(true);
        try {
            const result = await api.post('/pedidos', {
                produtos: products,
                quantidades: shoppingCart.quantidades,
                total_produtos: shoppingCart.total_produtos,
                total_pedido: shoppingCart.total_pedido
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (result.status === 201) {
                alert('Pedido realizado com sucesso!')
            }
            dispatch(clearShoppingCart());
            window.location.reload();
        } catch (error: any) {
            console.log(error);
            if (error.code === 'ERR_BAD_REQUEST') {
                setOrderErrorMessage('Estoque indisponível para este pedido. Revise as unidades do seu pedido com as unidades disponíveis de cada produto.');
                return;
            }
            toast.error('Falha ao finalizar pedido, tente mais tarde :(', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='text-highlight'>
            <Badge className='' badgeContent={shoppingCart.total_produtos} max={99} color="warning" sx={{ "& .MuiBadge-badge": { fontSize: 15, top: 13, right: 10 } }}>
                <ShoppingCartSimple className='p-2 rounded-lg border text-highlight border-background hover:cursor-pointer hover:border-highlight duration-100' size={58} color="#1de9b6" weight="bold" onClick={toggleDrawer(true)} />
            </Badge>
            <Drawer anchor='right' open={isDrawerOpen} onClose={toggleDrawer(false)} >
                <div className='bg-backgroundLight w-96 h-screen flex flex-col p-6'>
                    <div className='h-full'>
                        {shoppingCart.produtos.length ? (
                            <div className='h-full flex flex-col justify-between'>
                                <div className='h-4/5'>
                                    <p className='text-lg text-main font-medium'>Seu carrinho</p>
                                    <div className='mt-4 h-[85%] overflow-y-auto'>
                                        {shoppingCart.produtos.map(produto => <ShoppingCartProduct imagem={produto.imagem} nome={produto.nome} preco={produto.preco} produtoId={produto.produtoId} quantidade={produto.quantidade} key={produto.produtoId} />)}
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    {orderErrorMessage && <p className='mb-5 p-1 text-sm text-alert border rounded-md'>{orderErrorMessage}</p>}
                                    <PrimaryButton label={`finalizar pedido - R$ ${shoppingCart.total_pedido / 100}`} onClick={finishOrder} isLoading={isLoading} />
                                </div>
                            </div>
                        ) : (
                            <div className='h-full flex flex-col items-center justify-between'>
                                <div className='w-full'>
                                    <p className='text-lg text-main font-medium'>Seu carrinho</p>
                                    <p className='text-secondary text-center mt-6'>Seu carrinho está vazio.</p>
                                </div>
                                <SecondaryButton label='voltar' onClick={toggleDrawer(false)} />
                            </div>
                        )}
                    </div>
                </div>
            </Drawer>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                limit={1}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}

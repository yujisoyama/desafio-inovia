import { useEffect, useState } from "react";
import { api } from "../../Api";
import { useCliente } from "../../context/ClienteContext";
import { OrderProducts } from "./OrderProducts";
import { SecondaryButton } from "../common/SecondaryButton";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PrimaryButton } from "../common/PrimaryButton";
import { useNavigate } from "react-router-dom";

interface IProduto {
    produtoId: string;
    nome: string;
    preco: number;
}

interface IQuantidade {
    produtoId: string;
    quantidade: number;
}

export interface IOrderRowProps {
    id: number;
    cliente: string;
    produtos: IProduto[];
    quantidades: IQuantidade[];
    total_produtos: number;
    total_pedido: number;
    data: string;
}

interface IOrderProducts {
    produtoId: string;
    nome: string;
    preco: number;
    quantidade: number;
}

export const YourOrderRow = ({ id, cliente, produtos, quantidades, total_produtos, total_pedido, data }: IOrderRowProps) => {
    const { token } = useCliente();
    const [isSelected, setIsSelected] = useState(false);
    const [orderProducts, setOrderProducts] = useState<IOrderProducts[]>([]);
    const navigate = useNavigate();
    const date = data.split('T')[0];

    const handleIsSelected = () => {
        setIsSelected(!isSelected);
    }

    const handleCancelOrder = async () => {
        try {
            await api.post(`/pedidos/remove/${id}`, {}, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            location.reload();
        } catch (error) {
            console.log(error);
            toast.error('Falha ao cancelar o pedido, tente mais tarde :(', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const handleEditOrder = () => {
       navigate(`/pedido/${id}`);
    }

    useEffect(() => {
        let orderProductsAux: IOrderProducts[] = [];
        for (let i = 0; i < produtos.length; i++) {
            const orderProduct = {
                produtoId: produtos[i].produtoId,
                nome: produtos[i].nome,
                preco: produtos[i].preco,
                quantidade: quantidades[i].quantidade
            }
            orderProductsAux.push(orderProduct);
        }
        setOrderProducts(orderProductsAux);
    }, [])

    return (
        <div className={`rounded-md ${isSelected ? 'border border-highlight bg-backgroundLight' : 'bg-background'}`}>
            <div onClick={handleIsSelected} className="w-full h-16 rounded-md border-b border-backgroundLight grid grid-cols-4 text-start items-center text-sm hover: cursor-pointer hover:bg-backgroundLight duration-150 mobile:text-xs">
                <p className="pl-3 mobile:pl-1">{cliente}</p>
                <p className="pl-3 mobile:pl-1">{total_produtos}</p>
                <p className="pl-3 mobile:pl-1">R$ {(total_pedido / 100).toFixed(2)}</p>
                <p className="pl-3 mobile:pl-1">{`${date.split('-')[2]}/${date.split('-')[1]}/${date.split('-')[0]}`}</p>
            </div>
            {isSelected &&
                <div className="px-6 pb-3 text-secondary flex flex-col">
                    <div className="mx-auto w-4/5 grid grid-cols-4 text-start border-b border-secondary mobile:text-[10px] mobile:w-full">
                        <p>Nome do Produto</p>
                        <p>Quantidade</p>
                        <p>Preço</p>
                        <p>Total</p>
                    </div>
                    <div className="pt-2 w-full flex flex-col items-center">
                        {orderProducts.map(product => <OrderProducts nome={product.nome} preco={product.preco} quantidade={product.quantidade} produtoId={product.produtoId} key={product.produtoId} />)}
                    </div>
                    <div className="mt-4 pb-2 w-[360px] self-end flex gap-4 mobile:flex-col mobile:items-center mobile:w-full mobile:gap-2">
                        <div className="w-[200px] mobile:w-[180px]">
                            <SecondaryButton label='cancelar pedido' onClick={handleCancelOrder} />
                        </div>
                        <div className="w-[160px] mobile:w-[180px]">
                            <PrimaryButton label='editar pedido' onClick={handleEditOrder} />
                        </div>
                    </div>
                </div>
            }
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

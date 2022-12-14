import { useEffect, useState } from "react";
import { OrderProducts } from "./OrderProducts";

interface IProduto {
    produtoId: string;
    nome: string;
    preco: number;
}

interface IQuantidade {
    produtoId: string;
    quantidade: 1;
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

export const OrderRow = ({ id, cliente, produtos, quantidades, total_produtos, total_pedido, data }: IOrderRowProps) => {
    const [isSelected, setIsSelected] = useState(false);
    const [orderProducts, setOrderProducts] = useState<IOrderProducts[]>([]);
    const date = data.split('T')[0];

    const handleIsSelected = () => {
        setIsSelected(!isSelected);
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
                <div className="px-6 pb-3 text-secondary">
                    <div className="mx-auto w-4/5 grid grid-cols-4 text-start border-b border-secondary mobile:text-[10px] mobile:w-full">
                        <p>Nome do Produto</p>
                        <p>Quantidade</p>
                        <p>Pre??o</p>
                        <p>Total</p>
                    </div>
                    <div className="pt-2 w-full flex flex-col items-center">
                        {orderProducts.map(product => <OrderProducts nome={product.nome} preco={product.preco} quantidade={product.quantidade} produtoId={product.produtoId} key={product.produtoId} />)}
                    </div>
                </div>
            }
        </div>
    )
}

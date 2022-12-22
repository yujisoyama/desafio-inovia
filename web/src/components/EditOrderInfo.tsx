import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { api } from '../Api';
import { useCliente } from '../context/ClienteContext';
import { IOrderRowProps } from './YourOrderRow';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextInput } from './TextInput';
import { PrimaryButton } from './PrimaryButton';
import { useNavigate } from 'react-router-dom';

interface IEditInfoProps {
    pedidoId: number;
}

const DEFAULT_ORDER = {
    id: 0,
    cliente: '',
    produtos: [],
    quantidades: [],
    total_produtos: 0,
    total_pedido: 0,
    data: ''
}

export const EditOrderInfo = ({ pedidoId }: IEditInfoProps) => {
    const { token } = useCliente();
    const [order, setOrder] = useState<IOrderRowProps>(DEFAULT_ORDER)
    const [total_produtos, setTotalProdutos] = useState(0);
    const [total_pedido, setTotalPedido] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const fetchOrder = async () => {
        try {
            const result = await api.get(`/pedidos/${pedidoId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            setOrder(result.data[0]);
            setTotalProdutos(result.data[0].total_produtos);
            setTotalPedido(result.data[0].total_pedido);
        } catch (error) {
            console.log(error);
            toast.error('Falha carregar pedido, tente mais tarde :(', {
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

    const handleChangeQuantity = (event: ChangeEvent<HTMLInputElement>, produtoId: string) => {
        let orderAux = order;
        const orderQuantitiesEdited = order?.quantidades!.map(quantidade =>
            quantidade.produtoId === produtoId
                ? { ...quantidade, quantidade: Number(event.target.value) }
                : { ...quantidade }
        )
        orderAux.quantidades = orderQuantitiesEdited;
        setOrder({ ...order, quantidades: orderQuantitiesEdited });

        setTotalProdutos(0);
        orderAux.quantidades.forEach((quantidade) => {
            setTotalProdutos(prevState => prevState + quantidade.quantidade)
        });

        setTotalPedido(0);
        orderAux.produtos.forEach((pedido, index) => {
            setTotalPedido(prevState => prevState + pedido.preco * orderAux.quantidades[index].quantidade);
        })
    }

    const handleEditOrder = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);



        try {
            console.log({
                produtos: order.produtos,
                quantidades: order.quantidades,
                total_produtos,
                total_pedido
            });

            await api.post(`/pedidos/${pedidoId}`, {
                produtos: order.produtos,
                quantidades: order.quantidades,
                total_produtos,
                total_pedido
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
            toast.error('Falha ao atualizar pedido, tente mais tarde :(', {
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

    useEffect(() => {
        fetchOrder();
    }, [])

    return (
        <div className=" bg-background p-8 w-3/5 mx-auto mt-10 mb-16 rounded-xl border border-highlight">
            <p className="text-main text-2xl font-bold mb-8">Editar pedido n° <span className='text-highlight'>{order?.id}</span></p>
            <div className="flex flex-wrap justify-evenly gap-10">
                <form onSubmit={handleEditOrder} className="flex flex-col gap-6">
                    {order?.produtos.map((produto, index) =>
                        <div key={produto.produtoId} className='grid grid-cols-4 gap-4 items-center justify-center'>
                            <p className='text-main'>{produto.nome}</p>
                            <p className='text-secondary'>Unidade: R$ {(produto.preco / 100).toFixed(2)}</p>
                            <TextInput id='quantidade' name={`quantidade_${produto.produtoId}`} label='Quantidade' defaultValue={order.quantidades[index].quantidade.toString()} inputSize='small' type='text' placeholder='' onChange={(event) => handleChangeQuantity(event, produto.produtoId)} />
                            <p className='text-secondary text-right'>Total: R$ {(produto.preco * order.quantidades[index].quantidade / 100).toFixed(2)}</p>
                        </div>
                    )}
                    <div className='border-t border-secondary pt-3'>
                        <div className='flex gap-6 justify-end'>
                            <p className='text-main'>Total de Produtos: <span className='text-highlight'>{total_produtos}</span></p>
                            <p className='text-main'>Total do pedido: <span className='text-highlight'>R$ {(total_pedido / 100).toFixed(2)}</span></p>
                        </div>
                        <div className='w-52 mx-auto mt-5'>
                            <PrimaryButton label='salvar' isLoading={isLoading} type='submit' />
                        </div>
                    </div>
                </form>
            </div>
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

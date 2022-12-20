import { IOrderRowProps, OrderRow } from "./OrderRow"
import '../styles/scrollbarInvisible.css'
import SelectFilter from "./SelectFilter"
import { TextInput } from "./TextInput"
import { DateInput } from "./DateInput"
import { PrimaryButton } from "./PrimaryButton"
import { FormEvent, useEffect, useState } from "react"
import { api } from "../Api"
import { useCliente } from "../context/ClienteContext"
import { Loading } from "./Loading"




export const AllOrders = () => {
    const { token } = useCliente();
    const [orders, setOrders] = useState<IOrderRowProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchOrders = async () => {
        setIsLoading(true)
        try {
            const result = await api.get('/pedidos', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            setOrders(result.data)
        } catch (error) {
            console.log(error);

        } finally {
            setIsLoading(false);
        }
    }

    const handleFilter = (event: FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const form = Object.fromEntries(formData);
        console.log(form);
    }

    useEffect(() => {
        fetchOrders();
    }, [])

    const renderOrders = () => {
        if (isLoading) {
            return (
                <Loading />
            )
        }

        return (
            <>
                <div className="w-full h-[75%] overflow-y-auto py-1">
                    {orders.map(order => <OrderRow id={order.id} cliente={order.cliente} data={order.data} produtos={order.produtos} quantidades={order.quantidades} total_pedido={order.total_pedido} total_produtos={order.total_produtos} key={order.id} />)}
                </div>
                <div className="mt-2 text-right">
                    {orders.length} pedidos realizados
                </div>
            </>
        )
    }

    return (
        <>
            <div className="p-4 h-full text-main">
                <form onSubmit={handleFilter} className="flex gap-3 items-center">
                    <p className="font-semibold">Filtrar por:</p>
                    <SelectFilter name="filterOption" />
                    <div className="w-40">
                        <TextInput label="Filtro" inputSize="small" name="filterValue" />
                    </div>
                    <div className="w-40">
                        <DateInput label="Filtrar data" inputSize="small" name="filterData" />
                    </div>
                    <div className="w-24">
                        <PrimaryButton label="filtrar" type="submit" />
                    </div>
                </form>
                <div className="w-full mt-6 border-b border-main grid grid-cols-4 text-center">
                    <p>Cliente</p>
                    <p>N° de Produtos</p>
                    <p>Valor Total</p>
                    <p>Data</p>
                </div>
                {renderOrders()}
            </div>
        </>
    )
}

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
import { ArrowDown, ArrowUp } from "phosphor-react"

interface ISortColumn {
    column: number;
    sort: boolean;
    asc: boolean;
}

const SORT_TABLE_DEFAULT: ISortColumn[] = [
    { column: 0, sort: true, asc: true },
    { column: 1, sort: false, asc: false },
    { column: 2, sort: false, asc: false },
    { column: 3, sort: false, asc: false },
]

export const AllOrders = () => {
    const { token } = useCliente();
    const [orders, setOrders] = useState<IOrderRowProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortTable, setSortTable] = useState<ISortColumn[]>(SORT_TABLE_DEFAULT);

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

    const handleSort = (column: number) => {
        if (sortTable[column].sort === true) {
            setSortTable(sortTable.map(sortColumn =>
                sortColumn.column === column
                    ? { ...sortColumn, asc: !sortColumn.asc }
                    : { ...sortColumn }
            ))
            return;
        }

        setSortTable(sortTable.map(sortColumn =>
            sortColumn.column === column
                ? { ...sortColumn, sort: true, asc: true }
                : { ...sortColumn, sort: false, asc: false }
        ))

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
                <div className="h-3/4">
                    <Loading />
                </div>
            )
        }

        return (
            <>
                <div className="w-full h-[75%] overflow-y-auto py-1">
                    {orders.map(order => <OrderRow id={order.id} cliente={order.cliente} data={order.data} produtos={order.produtos} quantidades={order.quantidades} total_pedido={order.total_pedido} total_produtos={order.total_produtos} key={order.id} />)}
                </div>
            </>
        )
    }

    const renderHeader = (columnDesc: string, isSort: boolean, isAscSort: boolean, column: number) => {
        if (isSort && isAscSort) {
            return (
                <p onClick={() => handleSort(column)} className="pl-3 pb-1 rounded-t-lg hover:cursor-pointer hover:text-highlight hover:bg-backgroundLight duration-150">{columnDesc} <ArrowUp className="inline" size={18} color="#1de9b6" weight="bold" /> </p>
            )
        }
        if (isSort && !isAscSort) {
            return (
                <p onClick={() => handleSort(column)} className="pl-3 pb-1 rounded-t-lg hover:cursor-pointer hover:text-highlight hover:bg-backgroundLight duration-150">{columnDesc} <ArrowDown className="inline" size={18} color="#1de9b6" weight="bold" /> </p>
            )
        }

        return (
            <p onClick={() => handleSort(column)} className="pl-3 pb-1 rounded-t-lg hover:cursor-pointer hover:text-highlight hover:bg-backgroundLight duration-150">{columnDesc}</p>
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
                <div className="text-right">
                    <span className="text-highlight">{orders.length}</span> pedidos realizados
                </div>
                <div className="w-full mt-3 border-b border-main grid grid-cols-4 text-start">
                    {renderHeader('Cliente', sortTable[0].sort, sortTable[0].asc, 0)}
                    {renderHeader('N° de Produtos', sortTable[1].sort, sortTable[1].asc, 1)}
                    {renderHeader('Total', sortTable[2].sort, sortTable[2].asc, 2)}
                    {renderHeader('Data', sortTable[3].sort, sortTable[3].asc, 3)}
                </div>
                {renderOrders()}
            </div>
        </>
    )
}

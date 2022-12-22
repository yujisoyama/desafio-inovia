import { IOrderRowProps } from "./OrderRow"
import '../../styles/scrollbarInvisible.css'
import SelectFilter from "../common/SelectFilter"
import { TextInput } from "../common/TextInput"
import { DateInput } from "../common/DateInput"
import { PrimaryButton } from "../common/PrimaryButton"
import { FormEvent, useEffect, useState } from "react"
import { api } from "../../Api"
import { useCliente } from "../../context/ClienteContext"
import { Loading } from "../common/Loading"
import { ArrowDown, ArrowUp } from "phosphor-react"
import { YourOrderRow } from "./YourOrderRow"

interface ISortColumn {
  column: number;
  sort: boolean;
  asc: boolean;
}

const SORT_TABLE_DEFAULT: ISortColumn[] = [
  { column: 0, sort: false, asc: false },
  { column: 1, sort: false, asc: false },
  { column: 2, sort: false, asc: false },
  { column: 3, sort: true, asc: true },
]

const filterOptions = [
  { value: 'produto', label: 'produto' }
];

export const YourOrders = () => {
  const { token } = useCliente();
    const [orders, setOrders] = useState<IOrderRowProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortTable, setSortTable] = useState<ISortColumn[]>(SORT_TABLE_DEFAULT);
    const [filteredOrders, setFilteredOrders] = useState<IOrderRowProps[]>([]);

    const fetchOrders = async () => {
        setIsLoading(true)
        try {
            const result = await api.get('/pedidos/cliente', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            setOrders(result.data);
            setFilteredOrders(result.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleSort = (column: number) => {
        let sortTableAux: ISortColumn[];
        if (sortTable[column].sort === true) {
            sortTableAux = sortTable.map(sortColumn =>
                sortColumn.column === column
                    ? { ...sortColumn, asc: !sortColumn.asc }
                    : { ...sortColumn }
            );
            setSortTable(sortTableAux);
        } else {
            sortTableAux = sortTable.map(sortColumn =>
                sortColumn.column === column
                    ? { ...sortColumn, sort: true, asc: true }
                    : { ...sortColumn, sort: false, asc: false }
            );
            setSortTable(sortTableAux);
        }

        switch (column) {
            case 0:
                if (sortTableAux[column].asc) {
                    setOrders(filteredOrders.sort((a, b) => (a.cliente > b.cliente) ? 1 : ((b.cliente > a.cliente) ? -1 : 0)));
                } else {
                    setOrders(filteredOrders.sort((a, b) => (a.cliente < b.cliente) ? 1 : ((b.cliente < a.cliente) ? -1 : 0)));
                }
                break;
            case 1:
                if (sortTableAux[column].asc) {
                    setOrders(filteredOrders.sort((a, b) => (a.total_produtos < b.total_produtos) ? 1 : ((b.total_produtos < a.total_produtos) ? -1 : 0)));
                } else {
                    setOrders(filteredOrders.sort((a, b) => (a.total_produtos > b.total_produtos) ? 1 : ((b.total_produtos > a.total_produtos) ? -1 : 0)));
                }
                break;
            case 2:
                if (sortTableAux[column].asc) {
                    setOrders(filteredOrders.sort((a, b) => (a.total_pedido < b.total_pedido) ? 1 : ((b.total_pedido < a.total_pedido) ? -1 : 0)));
                } else {
                    setOrders(filteredOrders.sort((a, b) => (a.total_pedido > b.total_pedido) ? 1 : ((b.total_pedido > a.total_pedido) ? -1 : 0)));
                }
                break;
            case 3:
                if (sortTableAux[column].asc) {
                    setOrders(filteredOrders.sort((a, b) => (a.data < b.data) ? 1 : ((b.data < a.data) ? -1 : 0)));
                } else {
                    setOrders(filteredOrders.sort((a, b) => (a.data > b.data) ? 1 : ((b.data > a.data) ? -1 : 0)));
                }
                break;
        }
    }

    const handleFilter = (event: FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const form = Object.fromEntries(formData);

        if (!form.filterValue && !form.filterData) {
            setFilteredOrders(orders);
            return;
        }

        let filteredOrdersAux: IOrderRowProps[] = [];

        const data = `${form.filterData.toString().split('/')[2]}-${form.filterData.toString().split('/')[1]}-${form.filterData.toString().split('/')[0]}`

        if (form.filterOption === 'cliente') {
            filteredOrdersAux = orders.filter((order) => { return order.cliente.toLowerCase().includes(form.filterValue.toString().toLowerCase()) })
            setFilteredOrders(filteredOrdersAux);

            if (form.filterData) {
                filteredOrdersAux = filteredOrdersAux.filter((order) => { return order.data.includes(data) });
                setFilteredOrders(filteredOrdersAux);
            }
            return;
        }

        if (form.filterOption === 'produto') {
            filteredOrdersAux = orders.filter(order => order.produtos.some(produto => produto.nome.toLowerCase().includes(form.filterValue.toString().toLowerCase())) )
            setFilteredOrders(filteredOrdersAux);

            if (form.filterData) {
                filteredOrdersAux = filteredOrdersAux.filter((order) => { return order.data.includes(data) });
                setFilteredOrders(filteredOrdersAux);
            }
            return;
        }
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
                    {filteredOrders.map(order => <YourOrderRow id={order.id} cliente={order.cliente} data={order.data} produtos={order.produtos} quantidades={order.quantidades} total_pedido={order.total_pedido} total_produtos={order.total_produtos} key={order.id} />)}
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
                    <SelectFilter name="filterOption" filterOptions={filterOptions} />
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
                    <span className="text-highlight">{orders.length}</span> pedidos realizados por você
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

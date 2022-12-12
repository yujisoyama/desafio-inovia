import { IProdutos, IQuantidades } from "../pedido.entity";

export interface ICriarPedido {
    clienteId: string;
    produtos: IProdutos[];
    quantidades: IQuantidades[];
    total_produtos: number;
    total_pedido: number;
}
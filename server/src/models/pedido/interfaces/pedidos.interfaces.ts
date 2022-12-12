import { IProdutos, IQuantidades } from "../pedido.entity";

export interface ICriarPedido {
    produtos: IProdutos[];
    quantidades: IQuantidades[];
    total_produtos: number;
    total_pedido: number;
}
import { Produtos, Quantidades } from "../dto/criar-pedido.dto";

export interface ICriarPedido {
    produtos: Produtos[];
    quantidades: Quantidades[];
    total_produtos: number;
    total_pedido: number;
}
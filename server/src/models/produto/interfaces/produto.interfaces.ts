import { ICaracteristicas } from "../produto.entity";

export interface ICriarProduto {
    nome: string;
    sobre: string;
    preco: number;
    marca: string;
    imposto: number;
    estoque: number;
    imagem: string;
    caracteristicas: ICaracteristicas[];
}
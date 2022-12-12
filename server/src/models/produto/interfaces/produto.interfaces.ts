import { ICaracteristicas } from "../produto.entity";

export interface ICriarProduto {
    nome: string;
    preco: number;
    marca: string;
    imposto: number;
    estoque: number;
    imagem: string;
    caracteristicas: ICaracteristicas[];
}
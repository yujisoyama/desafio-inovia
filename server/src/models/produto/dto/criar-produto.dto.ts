import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ICaracteristicas } from "../produto.entity";

export class CriarProdutoDto {
    @IsNotEmpty()
    @IsString()
    nome: string;

    @IsNotEmpty()
    @IsNumber()
    preco: number;

    @IsNotEmpty()
    @IsString()
    marca: string;

    @IsNotEmpty()
    @IsNumber()
    imposto: number;

    @IsNotEmpty()
    @IsNumber()
    estoque: number;

    @IsNotEmpty()
    @IsString()
    imagem: string;

    caracteristicas: ICaracteristicas[];
}
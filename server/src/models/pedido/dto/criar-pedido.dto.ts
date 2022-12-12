import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IProdutos, IQuantidades } from "../pedido.entity";

export class CriarPedidoDto {
    @IsNotEmpty()
    produtos: IProdutos[];

    @IsNotEmpty()
    quantidades: IQuantidades[];

    @IsNotEmpty()
    @IsNumber()
    total_produtos: number;

    @IsNotEmpty()
    @IsNumber()
    total_pedido: number;
}
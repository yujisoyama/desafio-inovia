import { Type } from "class-transformer";
import { IsNotEmpty, IsArray, ArrayMinSize, ValidateNested, IsNumber } from "class-validator";
import { Produtos, Quantidades } from "./criar-pedido.dto";

export class AtualizarPedidoDto {
    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => Produtos)
    produtos: Produtos[];

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => Quantidades)
    quantidades: Quantidades[];

    @IsNotEmpty()
    @IsNumber()
    total_produtos: number;

    @IsNotEmpty()
    @IsNumber()
    total_pedido: number;
}
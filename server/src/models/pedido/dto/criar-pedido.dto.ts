import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";

export class Produtos {
    @IsString()
    @IsNotEmpty()
    produtoId: string;

    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsNumber()
    @IsNotEmpty()
    preco: number;
}

export class Quantidades {
    @IsString()
    @IsNotEmpty()
    produtoId: string;

    @IsNumber()
    @IsNotEmpty()
    quantidade: number;
}
export class CriarPedidoDto {
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
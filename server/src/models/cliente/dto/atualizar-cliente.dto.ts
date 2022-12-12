import { IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString, MinLength } from "class-validator";

export class AtualizarClienteDto {
    // @IsOptional()
    @IsString()
    @IsNotEmpty()
    nome: string;

    // @IsOptional()
    @IsString()
    @IsNotEmpty()
    endereco: string;

    // @IsOptional()
    @IsNumberString()
    @IsNotEmpty()
    telefone: string;

    // @IsOptional()
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    // @IsOptional()
    @IsString()
    @IsNotEmpty()
    data_nascimento: string;

    // @IsOptional()
    @IsString()
    @MinLength(5)
    login: string;

    // @IsOptional()
    @IsString()
    @MinLength(5)
    senha: string;

    // @IsOptional()
    foto_perfil: string;
}
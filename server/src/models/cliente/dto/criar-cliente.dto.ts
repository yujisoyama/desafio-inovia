import { IsEmail, IsNotEmpty, IsNumberString, IsString, MinLength,  } from "class-validator";

export class CriarClienteDto {
    @IsNotEmpty()
    @IsString()
    nome: string;

    @IsNotEmpty()
    @IsString()
    endereco: string;

    @IsNotEmpty()
    @IsNumberString()
    telefone: string;

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    data_nascimento: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    login: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    senha: string;
}
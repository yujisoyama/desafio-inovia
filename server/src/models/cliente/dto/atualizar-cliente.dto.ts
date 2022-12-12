import { IsEmail, IsNotEmpty, IsNumberString, IsString, MinLength,  } from "class-validator";

export class AtualizarClienteDto {
    @IsString()
    nome: string;

    @IsString()
    endereco: string;

    @IsNumberString()
    telefone: string;

    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    data_nascimento: string;

    @IsString()
    @MinLength(5)
    login: string;

    @IsString()
    @MinLength(5)
    senha: string;

    @IsString()
    foto_perfil: string;
}
import { IsNotEmpty, IsString } from "class-validator";

export class ClienteLoginDto {
    @IsNotEmpty()
    @IsString()
    login: string;

    @IsNotEmpty()
    @IsString()
    senha: string;
}
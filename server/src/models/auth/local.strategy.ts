import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { Cliente } from "../cliente/cliente.entity";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'login',
            passwordField: 'senha'
        });
    }

    async validate(login: string, senha: string): Promise<Partial<Cliente>> {      
        const cliente = await this.authService.validateCliente(login, senha);

        if (!cliente) {
            throw new UnauthorizedException('As credenciais são inválidas.');
        }
        
        return cliente;
    }
}
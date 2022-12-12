import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { Cliente } from '../cliente/cliente.entity';
import { ClientesService } from '../cliente/clientes.service';

@Injectable()
export class AuthService {
    constructor(
        private clienteService: ClientesService,
        private jwtService: JwtService
    ) { }

    async validateCliente(login: string, senha: string): Promise<Partial<Cliente>> {
        const cliente = await this.clienteService.getClienteByLogin(login);

        if (cliente && await bcrypt.compare(senha, cliente.senha)) {
            const { senha, ...clienteLogado } = cliente;
            return clienteLogado;
        }

        return null;
    }

    async login(cliente: Partial<Cliente>) {       
        const payload = { id: cliente.id, nome: cliente.nome, email: cliente.email }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}

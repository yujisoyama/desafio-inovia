import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomBadRequests } from 'src/utils/CustomBadRequests';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';
import { IAtualizarCliente, ICriarCliente } from './interfaces/cliente.interfaces';

import * as bcrypt from 'bcrypt';

@Injectable()
export class ClientesService {
    constructor(@InjectRepository(Cliente) private clienteRepository: Repository<Cliente>) { }

    async criarCliente(criarCliente: ICriarCliente): Promise<CustomBadRequests | Partial<Cliente>> {
        const emailAlreadyUsing = await this.clienteRepository.createQueryBuilder("cliente")
            .where("LOWER(cliente.email) = LOWER(:email)", { email: criarCliente.email })
            .getOne();
        if (emailAlreadyUsing) {
            return new CustomBadRequests('Email já está sendo usado', 'email');
        }

        const telefoneAlreadyUsing = await this.clienteRepository.findOneBy({ telefone: criarCliente.telefone });
        if (telefoneAlreadyUsing) {
            return new CustomBadRequests('Telefone já está sendo usado', 'telefone');
        }

        const loginAlreadyUsing = await this.clienteRepository.createQueryBuilder("cliente")
            .where("LOWER(cliente.login) = LOWER(:login)", { login: criarCliente.login })
            .getOne();
        if (loginAlreadyUsing) {
            return new CustomBadRequests('Login já está sendo usado', 'login');
        }

        const hashedPassword = await bcrypt.hash(criarCliente.senha, 10);
        const novoCliente = this.clienteRepository.create({ ...criarCliente, senha: hashedPassword });
        await this.clienteRepository.save(novoCliente);
        const { senha: _, ...cliente } = novoCliente;
        return cliente;
    }

    async getClienteByLogin(login: string): Promise<Cliente> {
        return await this.clienteRepository.findOneBy({ login });
    }

    async getClienteProfile(clienteId: number): Promise<Partial<Cliente>> {
        const { senha: _, ...cliente } = await this.clienteRepository.findOneBy({ id: clienteId });
        return cliente;
    }

    async atualizarCliente(atualizarCliente: IAtualizarCliente, clienteId: number): Promise<CustomBadRequests | Partial<Cliente>> {
        const emailAlreadyUsing = await this.clienteRepository.createQueryBuilder("cliente")
            .where("LOWER(cliente.email) = LOWER(:email)", { email: atualizarCliente.email })
            .getOne();
        if (emailAlreadyUsing && emailAlreadyUsing.id !== clienteId) {
            return new CustomBadRequests('Email já está sendo usado', 'email');
        }

        const telefoneAlreadyUsing = await this.clienteRepository.findOneBy({ telefone: atualizarCliente.telefone });
        if (telefoneAlreadyUsing && telefoneAlreadyUsing.id !== clienteId) {
            return new CustomBadRequests('Telefone já está sendo usado', 'telefone');
        }

        await this.clienteRepository.update({ id: clienteId }, { ...atualizarCliente});
        const { senha: _, ...cliente } = await this.clienteRepository.findOneBy({ id: clienteId });
        return cliente;
    }

    async atualizarAvatar(foto_perfil: string, clienteId: number) {
        const avatarUrl = `http://localhost:3000/${foto_perfil}`
        await this.clienteRepository.update({ id: clienteId }, { foto_perfil: avatarUrl });
    }
}

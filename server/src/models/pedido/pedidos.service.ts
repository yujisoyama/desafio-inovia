import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomBadRequests } from 'src/utils/CustomBadRequests';
import { Repository } from 'typeorm';
import { Cliente } from '../cliente/cliente.entity';
import { ICriarPedido } from './interfaces/pedidos.interfaces';
import { Pedido } from './pedido.entity';

@Injectable()
export class PedidosService {
    constructor(@InjectRepository(Pedido) private pedidoRepository: Repository<Pedido>) { }

    async criarPedido(criarPedido: ICriarPedido, cliente: Partial<Cliente>): Promise<Pedido> {
        const novoPedido = this.pedidoRepository.create({ ...criarPedido, clienteId: cliente.id });
        await this.pedidoRepository.save(novoPedido);
        return novoPedido;
    }

    async getPedidosByCliente(clienteId: string) {
        return await this.pedidoRepository.find({
            where: {
                clienteId
            }
        });
    }
}

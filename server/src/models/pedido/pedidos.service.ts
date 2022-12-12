import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomBadRequests } from 'src/utils/CustomBadRequests';
import { Repository } from 'typeorm';
import { ICriarPedido } from './interfaces/pedidos.interfaces';
import { Pedido } from './pedido.entity';

@Injectable()
export class PedidosService {
    constructor(@InjectRepository(Pedido) private pedidoRepository: Repository<Pedido>) { }

    async criarPedido(criarPedido: ICriarPedido): Promise<Pedido> {
        const novoPedido = this.pedidoRepository.create(criarPedido);
        await this.pedidoRepository.save(novoPedido);
        return novoPedido;
    }
}

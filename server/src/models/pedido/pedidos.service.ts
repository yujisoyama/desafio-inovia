import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomBadRequests } from 'src/utils/CustomBadRequests';
import { Repository } from 'typeorm';
import { Cliente } from '../cliente/cliente.entity';
import { ProdutosService } from '../produto/produtos.service';
import { ICriarPedido } from './interfaces/pedidos.interfaces';
import { Pedido } from './pedido.entity';
import { ObjectID } from 'mongodb';

@Injectable()
export class PedidosService {
    constructor(
        @InjectRepository(Pedido) private pedidoRepository: Repository<Pedido>,
        private produtosService: ProdutosService
    ) { }

    async criarPedido(criarPedido: ICriarPedido, cliente: Partial<Cliente>): Promise<CustomBadRequests | any> {
        for (let i = 0; i < criarPedido.produtos.length; i++) {
            const produtoId = new ObjectID(criarPedido.produtos[i].produtoId);
            const produto = await this.produtosService.getProdutoById(produtoId);
            let flagEstoqueIndisponivel: boolean = false;

            if (!produto) {
                return new CustomBadRequests(`Produto ${criarPedido.produtos[i].produtoId} não encontrado`, 'produtoId');
            }

            if (produto.estoque < criarPedido.quantidades[i].quantidade) {
                flagEstoqueIndisponivel = true;
            }

            if (flagEstoqueIndisponivel) {
                return new CustomBadRequests(`Estoque do produto ${criarPedido.produtos[i].produtoId} indisponível para este pedido`, 'quantidade');
            }
        }

        for (let i = 0; i < criarPedido.produtos.length; i++) {
            const produtoId = new ObjectID(criarPedido.produtos[i].produtoId);
            const produto = await this.produtosService.getProdutoById(produtoId);
            await this.produtosService.updateEstoqueProduto(produto, criarPedido.quantidades[i].quantidade);
        }

        const novoPedido = this.pedidoRepository.create({ ...criarPedido, clienteId: cliente.id });
        await this.pedidoRepository.save(novoPedido);
        return novoPedido;
    }

    async getPedidosByCliente(clienteId: number): Promise<Pedido[]> {
        return await this.pedidoRepository.createQueryBuilder('pedido')
            .leftJoinAndSelect(Cliente, 'cliente', 'cliente.id = pedido.clienteId')
            .where('pedido.clienteId = :clienteId', { clienteId: clienteId })
            .select(['pedido.id as id', 'cliente.nome as cliente', 'pedido.clienteId as clienteId', 'pedido.produtos as produtos', 'pedido.quantidades as quantidades', 'pedido.total_produtos as total_produtos', 'pedido.total_pedido as total_pedido', 'pedido.data as data'])
            .orderBy('pedido.data', 'DESC')
            .execute();
    }

    async getAllPedidos(): Promise<Pedido[]> {
        return await this.pedidoRepository.createQueryBuilder('pedido')
            .leftJoinAndSelect(Cliente, 'cliente', 'cliente.id = pedido.clienteId')
            .select(['pedido.id as id', 'cliente.nome as cliente', 'pedido.clienteId as clienteId', 'pedido.produtos as produtos', 'pedido.quantidades as quantidades', 'pedido.total_produtos as total_produtos', 'pedido.total_pedido as total_pedido', 'pedido.data as data'])
            .orderBy('pedido.data', 'DESC')
            .execute();
    }
}

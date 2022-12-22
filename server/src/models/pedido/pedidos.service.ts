import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomBadRequests } from 'src/utils/CustomBadRequests';
import { Repository } from 'typeorm';
import { Cliente } from '../cliente/cliente.entity';
import { ProdutosService } from '../produto/produtos.service';
import { IAtualizarPedido, ICriarPedido } from './interfaces/pedidos.interfaces';
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
            await this.produtosService.updateEstoqueProdutoWhenCreatingOrder(produto, criarPedido.quantidades[i].quantidade);
        }

        const novoPedido = this.pedidoRepository.create({ ...criarPedido, clienteId: cliente.id });
        await this.pedidoRepository.save(novoPedido);
        return novoPedido;
    }

    async getPedidosByCliente(clienteId: number): Promise<Pedido[]> {
        return await this.pedidoRepository.createQueryBuilder('pedido')
            .leftJoinAndSelect(Cliente, 'cliente', 'cliente.id = pedido.clienteId')
            .where('pedido.clienteId = :clienteId', { clienteId: clienteId })
            .andWhere('pedido.ativo = true')
            .select(['pedido.id as id', 'cliente.nome as cliente', 'pedido.clienteId as clienteId', 'pedido.produtos as produtos', 'pedido.quantidades as quantidades', 'pedido.total_produtos as total_produtos', 'pedido.total_pedido as total_pedido', 'pedido.data as data'])
            .orderBy('pedido.data', 'DESC')
            .execute();
    }

    async getAllPedidos(): Promise<Pedido[]> {
        return await this.pedidoRepository.createQueryBuilder('pedido')
            .leftJoinAndSelect(Cliente, 'cliente', 'cliente.id = pedido.clienteId')
            .where('pedido.ativo = true')
            .select(['pedido.id as id', 'cliente.nome as cliente', 'pedido.clienteId as clienteId', 'pedido.produtos as produtos', 'pedido.quantidades as quantidades', 'pedido.total_produtos as total_produtos', 'pedido.total_pedido as total_pedido', 'pedido.data as data'])
            .orderBy('pedido.data', 'DESC')
            .execute();
    }

    async cancelPedido(pedidoId: number): Promise<Pedido> {
        const pedido = await this.pedidoRepository.findOneBy({ id: pedidoId });

        for (let i = 0; i < pedido.quantidades.length; i++) {
            const produtoId = new ObjectID(pedido.quantidades[i].produtoId);
            const produto = await this.produtosService.getProdutoById(produtoId);
            await this.produtosService.updateEstoqueProdutoWhenCancelingOrder(produto, pedido.quantidades[i].quantidade);
        }

        await this.pedidoRepository.update({ id: pedidoId }, { ativo: false });

        return this.pedidoRepository.createQueryBuilder('pedido')
            .where('pedido.id = :pedidoId', { pedidoId })
            .execute();
    }

    async getPedidoById(pedidoId: number): Promise<Pedido> {
        return await this.pedidoRepository.createQueryBuilder('pedido')
            .select(['pedido.id as id', 'pedido.clienteId as clienteId', 'pedido.produtos as produtos', 'pedido.quantidades as quantidades', 'pedido.total_produtos as total_produtos', 'pedido.total_pedido as total_pedido', 'pedido.data as data'])
            .where('pedido.id = :pedidoId', { pedidoId })
            .execute();
    }

    async updatePedidoId(updatePedido: IAtualizarPedido, pedidoId: number): Promise<Pedido | CustomBadRequests> {
        const pedido = await this.pedidoRepository.findOneBy({ id: pedidoId });

        for (let i = 0; i < pedido.produtos.length; i++) {
            const produtoId = new ObjectID(pedido.produtos[i].produtoId);
            const produto = await this.produtosService.getProdutoById(produtoId);
            if (produto.estoque + pedido.quantidades[i].quantidade < updatePedido.quantidades[i].quantidade) {
                return new CustomBadRequests(`Estoque do produto ${updatePedido.produtos[i].produtoId} indisponível para esta edição`, 'quantidade');
            }
        }

        for (let i = 0; i < pedido.produtos.length; i++) {
            const produtoId = new ObjectID(pedido.produtos[i].produtoId);
            const produtoInitialState = await this.produtosService.getProdutoById(produtoId);
            await this.produtosService.updateEstoqueProdutoWhenCancelingOrder(produtoInitialState, pedido.quantidades[i].quantidade);
            const produto = await this.produtosService.getProdutoById(produtoId);
            await this.produtosService.updateEstoqueProdutoWhenCreatingOrder(produto, updatePedido.quantidades[i].quantidade)
        }

        pedido.produtos = updatePedido.produtos;
        pedido.quantidades = updatePedido.quantidades;
        pedido.total_produtos = updatePedido.total_produtos;
        pedido.total_pedido = updatePedido.total_pedido;
        pedido.data = new Date();
        await this.pedidoRepository.update({ id: pedidoId }, pedido);
        return pedido;
    }
}

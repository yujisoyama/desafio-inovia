import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomBadRequests } from 'src/utils/CustomBadRequests';
import { ObjectID, Repository } from 'typeorm';
import { ICriarProduto } from './interfaces/produto.interfaces';
import { Produto } from './produto.entity';

@Injectable()
export class ProdutosService {
    constructor(@InjectRepository(Produto, 'mongo') private produtoRepository: Repository<Produto>) { }

    async criarProduto(criarProduto: ICriarProduto): Promise<CustomBadRequests | Produto> {
        const nomeAlreadyUsing = await this.produtoRepository.findOneBy({ nome: criarProduto.nome })
        if (nomeAlreadyUsing) {
            return new CustomBadRequests('Este produto já existe', 'nome');
        }

        const novoProduto = this.produtoRepository.create(criarProduto);
        await this.produtoRepository.save(novoProduto);
        return novoProduto;
    }

    async getAllProdutos(): Promise<Produto[]> {
        return await this.produtoRepository.find({
            order: {
                nome: 'ASC'
            }
        })
    }

    async seedProduto(criarProduto: ICriarProduto) {
        const seedProduto = this.produtoRepository.create(criarProduto);
        await this.produtoRepository.save(seedProduto);
    }

    async getProdutoById(produtoId: ObjectID): Promise<Produto> {
        return await this.produtoRepository.findOneBy({ _id: produtoId });
    }

    async updateEstoqueProdutoWhenCreatingOrder(produto: Produto, quantidade: number) {
        await this.produtoRepository.update({ _id: produto._id }, { ...produto, estoque: produto.estoque - quantidade });
    }

    async updateEstoqueProdutoWhenCancelingOrder(produto: Produto, quantidade: number) {
        await this.produtoRepository.update({ _id: produto._id }, { ...produto, estoque: produto.estoque + quantidade });
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomBadRequests } from 'src/utils/CustomBadRequests';
import { Repository } from 'typeorm';
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

    
}

import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './produto.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Produto], 'mongo')],
    controllers: [ProdutosController,],
    providers: [ProdutosService,],
    exports: [ProdutosService],
})
export class ProdutosModule { }

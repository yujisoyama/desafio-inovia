import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { Module } from '@nestjs/common';
import { Pedido } from './pedido.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutosModule } from '../produto/produtos.module';

@Module({
    imports: [
        ProdutosModule,
        TypeOrmModule.forFeature([Pedido])
    ],
    controllers: [PedidosController,],
    providers: [PedidosService,],
})
export class PedidosModule { }

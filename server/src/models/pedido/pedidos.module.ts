import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { Module } from '@nestjs/common';
import { Pedido } from './pedido.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Pedido])],
    controllers: [PedidosController,],
    providers: [PedidosService,],
})
export class PedidosModule { }

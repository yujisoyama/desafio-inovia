import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        PedidosController,],
    providers: [
        PedidosService,],
})
export class PedidosModule { }

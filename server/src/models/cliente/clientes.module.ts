import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        ClientesController,],
    providers: [
        ClientesService,],
})
export class ClientesModule { }

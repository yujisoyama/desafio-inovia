import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        ProdutosController,],
    providers: [
        ProdutosService,],
})
export class ProdutosModule { }

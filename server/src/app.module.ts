import { PedidosModule } from './models/pedido/pedidos.module';
import { ProdutosModule } from './models/produto/produtos.module';
import { ClientesModule } from './models/cliente/clientes.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    PedidosModule,
    ProdutosModule,
    ClientesModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

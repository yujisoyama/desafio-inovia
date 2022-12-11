import { PedidosModule } from './models/pedido/pedidos.module';
import { ProdutosModule } from './models/produto/produtos.module';
import { ClientesModule } from './models/cliente/clientes.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './models/cliente/cliente.entity';
import { Pedido } from './models/pedido/pedido.entity';
import { Produto } from './models/produto/produto.entity';

@Module({
  imports: [
    PedidosModule,
    ProdutosModule,
    ClientesModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRESDB_HOST,
      port: Number(process.env.POSTGRESDB_PORT),
      username: process.env.POSTGRESDB_USER,
      password: process.env.POSTGRESDB_PASS,
      database: process.env.POSTGRESDB_NAME,
      entities: [Cliente, Pedido],
      synchronize: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: process.env.MONGODB_HOST,
      port: Number(process.env.MONGODB_PORT),
      username: process.env.MONGODB_USER,
      password: process.env.MONGODB_PASS,
      database: process.env.MONGODB_DB,
      entities: [Produto],
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

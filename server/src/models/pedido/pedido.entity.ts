import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "../cliente/cliente.entity";
import { Produtos, Quantidades } from "./dto/criar-pedido.dto";

@Entity('pedidos')
export class Pedido {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(() => Cliente, cliente => cliente.id)
    @JoinColumn({ name: 'clienteId' })
    clienteId: number;

    @Column('jsonb')
    produtos: Produtos[];

    @Column('jsonb')
    quantidades: Quantidades[];

    @Column()
    total_produtos: number;

    @Column()
    total_pedido: number;

    @CreateDateColumn()
    data: Date;
}
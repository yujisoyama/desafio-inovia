import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "../cliente/cliente.entity";

export interface IProdutos {
    produtoId: string;
    nome: string;
}

export interface IQuantidades {
    produtoId: string;
    quantidade: number;
}

@Entity('pedidos')
export class Pedido {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(() => Cliente, cliente => cliente.id)
    @JoinColumn({ name: 'clienteId' })
    clienteId: string;

    @Column('jsonb')
    produtos: IProdutos[];

    @Column('jsonb')
    quantidades: IQuantidades[];

    @Column()
    total_produtos: number;

    @Column()
    total_pedido: number;

    @CreateDateColumn()
    data: Date;
}
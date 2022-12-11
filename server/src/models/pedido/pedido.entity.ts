import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "../cliente/cliente.entity";

interface IProdutos {
    id: string;
    nome: string;
}

interface IQuantidades {
    id: string;
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

    @Column()
    data: Date;
}
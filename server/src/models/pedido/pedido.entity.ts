import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('pedidos')
export class Pedido {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    clienteId: string;

    @Column()
    produto: string;

    @Column()
    total_produtos: number;

    @Column()
    total_pedido: number;
    
    @Column()
    data: Date;

}
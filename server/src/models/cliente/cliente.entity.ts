import { Entity, OneToMany } from "typeorm";
import { Column } from "typeorm/decorator/columns/Column";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Pedido } from "../pedido/pedido.entity";


@Entity('clientes')
export class Cliente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    endereco: string;

    @Column({ unique: true })
    telefone: string;

    @Column({ unique: true })
    email: string;

    @Column({ type: 'date' })
    data_nascimento: string;

    @Column({ unique: true })
    login: string;

    @Column()
    senha: string;

    @Column({ nullable: true })
    foto_perfil: string

    @OneToMany(() => Pedido, pedido => pedido.id)
    pedidoId: string;
}
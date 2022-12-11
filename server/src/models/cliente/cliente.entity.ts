import { Entity, OneToMany } from "typeorm";
import { Column } from "typeorm/decorator/columns/Column";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Pedido } from "../pedido/pedido.entity";


@Entity('clientes')
export class Cliente {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    nome: string;

    @Column()
    endereço: string;

    @Column()
    telefone: string;

    @Column()
    email: string;

    @Column()
    data_nascimento: Date;

    @Column()
    login: string;

    @Column()
    senha: string;

    @Column()
    foto_perfil: string

    @OneToMany(() => Pedido, pedido => pedido.id)
    pedidoId: string;
}
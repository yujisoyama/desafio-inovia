import { Column, Entity, ObjectIdColumn } from "typeorm";

export interface ICaracteristicas {
    nome: string;
    descricao: string;
    valor: string;
}

@Entity('produtos')
export class Produto {
    @ObjectIdColumn()
    _id: string;

    @Column({ unique: true })
    nome: string;

    @Column()
    preco: number;

    @Column()
    marca: string;

    @Column()
    imposto: number;

    @Column()
    estoque: number;

    @Column({ unique: true })
    imagem: string;

    @Column({ nullable: true })
    caracteristicas: ICaracteristicas[];
}
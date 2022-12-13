import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

export interface ICaracteristicas {
    nome: string;
    descricao: string;
    valor: string;
}

@Entity('produtos')
export class Produto {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column({ unique: true })
    nome: string;

    @Column()
    sobre: string;

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
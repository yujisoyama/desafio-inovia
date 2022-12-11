import { Column, Entity, ObjectID, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity('produtos')
export class Produto {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    preco: number;
    
    @Column()
    marca: string;
    
    @Column()
    imposto: number;
    
    @Column()
    estoque: number;
    
    @Column()
    imagem: string;
    
    @Column()
    características: object;
}
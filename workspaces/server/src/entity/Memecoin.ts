import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Memecoin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    symbol: string;

    @Column('int')
    totalSupply: number;
}
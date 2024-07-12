import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MarketCap {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('decimal', { precision: 20, scale: 2 })
    value: number;

    @Column('timestamp')
    updatedAt: Date;
}
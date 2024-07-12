import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Competition } from './Competition';

@Entity()
export class CompetitionEntry {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Competition, competition => competition.entries)
    competition: Competition;

    @Column('json')
    memecoinDetails: any;
}
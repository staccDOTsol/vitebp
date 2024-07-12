import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CompetitionEntry } from './CompetitionEntry';

@Entity()
export class Competition {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    criteria: string;

    @OneToMany(() => CompetitionEntry, entry => entry.competition)
    entries: CompetitionEntry[];
}
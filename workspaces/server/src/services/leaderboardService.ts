import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { Competition } from '../entity/Competition';
import { CompetitionEntry } from '../entity/CompetitionEntry';

export async function getMarketCapLeaderboard() {
    const users = await AppDataSource.getRepository(User)
        .createQueryBuilder('user')
        .orderBy('user.marketCap', 'DESC')
        .limit(10)
        .getMany();
    return users;
}

export async function getGainsLeaderboard() {
    const users = await AppDataSource.getRepository(User)
        .createQueryBuilder('user')
        .orderBy('user.gains', 'DESC')
        .limit(10)
        .getMany();
    return users;
}

export async function createCompetition(name: string, criteria: string) {
    const competition = new Competition();
    competition.name = name;
    competition.criteria = criteria;
    await AppDataSource.getRepository(Competition).save(competition);
    return competition;
}

export async function joinCompetition(competitionId: number, memecoinDetails: any) {
    const competition = await AppDataSource.getRepository(Competition).findOneBy({ id: competitionId });
    if (!competition) {
        throw new Error('Competition not found');
    }

    const entry = new CompetitionEntry();
    entry.competition = competition;
    entry.memecoinDetails = memecoinDetails;
    await AppDataSource.getRepository(CompetitionEntry).save(entry);
    return entry;
}
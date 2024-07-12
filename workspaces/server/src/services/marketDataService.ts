import { AppDataSource } from '../data-source';
import { MarketCap } from '../entity/MarketCap';
import { Memecoin } from '../entity/Memecoin';

export const getMarketCap = async (): Promise<MarketCap[]> => {
    const marketCap = await AppDataSource.getRepository(MarketCap).find();
    return marketCap;
};

export const getTopMemecoins = async (): Promise<Memecoin[]> => {
    const topMemecoins = await AppDataSource.getRepository(Memecoin)
        .createQueryBuilder('memecoin')
        .orderBy('memecoin.marketCap', 'DESC')
        .limit(10)
        .getMany();
    return topMemecoins;
};

export const getFastestGrowingMemecoins = async (): Promise<Memecoin[]> => {
    const fastestGrowingMemecoins = await AppDataSource.getRepository(Memecoin)
        .createQueryBuilder('memecoin')
        .orderBy('memecoin.growthRate', 'DESC')
        .limit(10)
        .getMany();
    return fastestGrowingMemecoins;
};

export const getNewestMemecoins = async (): Promise<Memecoin[]> => {
    const newestMemecoins = await AppDataSource.getRepository(Memecoin)
        .createQueryBuilder('memecoin')
        .orderBy('memecoin.createdAt', 'DESC')
        .limit(10)
        .getMany();
    return newestMemecoins;
};
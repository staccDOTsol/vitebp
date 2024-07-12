import { AppDataSource } from '../data-source';
import { Memecoin } from '../entity/Memecoin';
import { User } from '../entity/User';

export async function createMemecoin(name: string, symbol: string, totalSupply: number) {
    const memecoin = new Memecoin();
    memecoin.name = name;
    memecoin.symbol = symbol;
    memecoin.totalSupply = totalSupply;
    await AppDataSource.getRepository(Memecoin).save(memecoin);
    return memecoin;
}

export async function getMemecoin(id: number) {
    const memecoin = await AppDataSource.getRepository(Memecoin).findOneBy({ id });
    if (!memecoin) {
        throw new Error('Memecoin not found');
    }
    return memecoin;
}

export async function buyMemecoin(memecoinId: number, amount: number) {
    const memecoin = await AppDataSource.getRepository(Memecoin).findOneBy({ id: memecoinId });
    if (!memecoin) {
        throw new Error('Memecoin not found');
    }

    if (memecoin.totalSupply < amount) {
        throw new Error('Not enough supply');
    }

    memecoin.totalSupply -= amount;
    await AppDataSource.getRepository(Memecoin).save(memecoin);

    // Add logic to update user's balance if needed

    return { success: true, memecoin };
}

export async function sellMemecoin(memecoinId: number, amount: number) {
    const memecoin = await AppDataSource.getRepository(Memecoin).findOneBy({ id: memecoinId });
    if (!memecoin) {
        throw new Error('Memecoin not found');
    }

    memecoin.totalSupply += amount;
    await AppDataSource.getRepository(Memecoin).save(memecoin);

    // Add logic to update user's balance if needed

    return { success: true, memecoin };
}
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { Purchase } from '../entity/Purchase';

export async function getUserPortfolio(userId: number) {
    const user = await AppDataSource.getRepository(User).findOne({
        where: { id: userId },
        relations: ['purchases', 'purchases.item'],
    });

    if (!user) {
        throw new Error('User not found');
    }

    return {
        id: user.id,
        wallet: user.wallet,
        highScore: user.highScore,
        plays: user.plays,
        purchases: user.purchases.map(purchase => ({
            id: purchase.id,
            item: {
                id: purchase.item.id,
                name: purchase.item.name,
                systemName: purchase.item.systemName,
                type: purchase.item.type,
                cost: purchase.item.cost,
            },
            txHash: purchase.txHash,
            txLt: purchase.txLt,
        })),
    };
}

export async function getUserTransactions(userId: number) {
    const purchases = await AppDataSource.getRepository(Purchase).find({
        where: { user: { id: userId } },
        relations: ['item'],
    });

    return purchases.map(purchase => ({
        id: purchase.id,
        item: {
            id: purchase.item.id,
            name: purchase.item.name,
            systemName: purchase.item.systemName,
            type: purchase.item.type,
            cost: purchase.item.cost,
        },
        txHash: purchase.txHash,
        txLt: purchase.txLt,
    }));
}
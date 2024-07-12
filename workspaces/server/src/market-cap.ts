import { FastifyInstance } from 'fastify';
import { getMarketCap, getTopMemecoins, getFastestGrowingMemecoins, getNewestMemecoins } from './services/marketDataService';

async function marketDataRoutes(fastify: FastifyInstance) {
    fastify.get('/market-cap', async (request, reply) => {
        const marketCap = await getMarketCap();
        return { marketCap };
    });

    fastify.get('/top-memecoins', async (request, reply) => {
        const topMemecoins = await getTopMemecoins();
        return { topMemecoins };
    });

    fastify.get('/fastest-growing', async (request, reply) => {
        const fastestGrowing = await getFastestGrowingMemecoins();
        return { fastestGrowing };
    });

    fastify.get('/newest', async (request, reply) => {
        const newest = await getNewestMemecoins();
        return { newest };
    });
} 

export default marketDataRoutes;
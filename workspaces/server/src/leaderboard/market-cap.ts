import { FastifyInstance } from 'fastify';
import { getMarketCapLeaderboard, getGainsLeaderboard, createCompetition, joinCompetition } from '../services/leaderboardService';

async function leaderboardRoutes(fastify: FastifyInstance) {
    fastify.get('/leaderboard/market-cap', async (request, reply) => {
        const leaderboard = await getMarketCapLeaderboard();
        return { leaderboard };
    });

    fastify.get('/leaderboard/gains', async (request, reply) => {
        const leaderboard = await getGainsLeaderboard();
        return { leaderboard };
    });

    fastify.post('/competition/create', async (request, reply) => {
        const { name, criteria } = request.body as any;
        const competition = await createCompetition(name, criteria);
        return { competition };
    });

    fastify.post('/competition/:id/join', async (request, reply) => {
        const { id } = request.params as any;
        const { memecoinDetails } = request.body as any;
        const result = await joinCompetition(id, memecoinDetails);
        return { result };
    });
}

export default leaderboardRoutes;
import { FastifyInstance } from 'fastify';
import { getUserPortfolio, getUserTransactions } from '../../services/userService'

async function userRoutes(fastify: FastifyInstance) {
    fastify.get('/user/:id/portfolio', async (request, reply) => {
        const { id } = request.params as any;
        const portfolio = await getUserPortfolio(id);
        return { portfolio };
    });

    fastify.get('/user/:id/transactions', async (request, reply) => {
        const { id } = request.params as any;
        const transactions = await getUserTransactions(id);
        return { transactions };
    });
}

export default userRoutes;
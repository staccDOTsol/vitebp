import { FastifyInstance } from 'fastify';
import { createMemecoin, getMemecoin, buyMemecoin, sellMemecoin } from './services/memecoinService';

async function memecoinRoutes(fastify: FastifyInstance) {
    fastify.post('/create-memecoin', async (request, reply) => {
        const { name, symbol, totalSupply } = request.body as any;
        const newMemecoin = await createMemecoin(name, symbol, totalSupply);
        return { newMemecoin };
    });

    fastify.get('/memecoin/:id', async (request, reply) => {
        const { id } = request.params as any;
        const memecoin = await getMemecoin(id);
        return { memecoin };
    });

    fastify.post('/memecoin/:id/buy', async (request, reply) => {
        const { id } = request.params as any;
        const { amount } = request.body as any;
        const result = await buyMemecoin(id, amount);
        return { result };
    });

    fastify.post('/memecoin/:id/sell', async (request, reply) => {
        const { id } = request.params as any;
        const { amount } = request.body as any;
        const result = await sellMemecoin(id, amount);
        return { result };
    });
}

export default memecoinRoutes;
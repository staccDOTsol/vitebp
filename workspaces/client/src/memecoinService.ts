import { Config } from './config';

export class MemecoinService {
    constructor(private config: Config) {}
    async getBalance() {
        const response = await fetch(`${this.config.MEMECOIN_LAUNCHPAD}/balance`);
        return response.json();
    }
    async createMemecoin(name: string, symbol: string, totalSupply: number) {
        const response = await fetch(`${this.config.MEMECOIN_LAUNCHPAD}/create-memecoin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, symbol, totalSupply }),
        });
        return response.json();
    }

    async getMemecoin(id: number) {
        const response = await fetch(`${this.config.MEMECOIN_LAUNCHPAD}/memecoin/${id}`);
        return response.json();
    }

    async buyMemecoin(id: number, amount: number) {
        const response = await fetch(`${this.config.MEMECOIN_LAUNCHPAD}/memecoin/${id}/buy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount }),
        });
        return response.json();
    }

    async sellMemecoin(id: number, amount: number) {
        const response = await fetch(`${this.config.MEMECOIN_LAUNCHPAD}/memecoin/${id}/sell`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount }),
        });
        return response.json();
    }
}
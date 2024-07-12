import { Config } from "./config";
import { MemecoinService } from './memecoinService';
import { GameFi, Wallet } from '@ton/phaser-sdk';

export class UI {
    balanceContainerDiv: HTMLDivElement = document.getElementById('balance-container') as HTMLDivElement;
    errorDiv: HTMLDivElement = document.getElementById('error') as HTMLDivElement;

    constructor(public readonly config: Config, public readonly memecoinService: MemecoinService, public readonly gameFi: GameFi, public readonly phaser: Phaser.Game) {
        // Add event listeners for Memecoin actions
        document.getElementById('create-memecoin')?.addEventListener('click', async () => {
            const name = prompt('Enter Memecoin name:');
            const symbol = prompt('Enter Memecoin symbol:');
            const totalSupply = Number(prompt('Enter total supply:'));
            if (name && symbol && totalSupply) {
                await memecoinService.createMemecoin(name, symbol, totalSupply);
                alert('Memecoin created successfully!');
            }
        });

        document.getElementById('buy-memecoin')?.addEventListener('click', async () => {
            const id = Number(prompt('Enter Memecoin ID:'));
            const amount = Number(prompt('Enter amount to buy:'));
            if (id && amount) {
                await memecoinService.buyMemecoin(id, amount);
                alert('Memecoin bought successfully!');
            }
        });

        document.getElementById('sell-memecoin')?.addEventListener('click', async () => {
            const id = Number(prompt('Enter Memecoin ID:'));
            const amount = Number(prompt('Enter amount to sell:'));
            if (id && amount) {
                await memecoinService.sellMemecoin(id, amount);
                alert('Memecoin sold successfully!');
            }
        });

        document.getElementById('connect-wallet')?.addEventListener('click', async () => {
            const wallet = await this.connectWallet();
            if (wallet) {
                this.showMain(false);
                this.showBalance();
            }
        });
    }

    async connectWallet(): Promise<Wallet | null> {
        // Implement wallet connection logic here
        // Return the connected wallet or null if connection failed
        return null;
    }

    showMain(show: boolean) {
        const mainContainer = document.getElementById('main-container');
        if (mainContainer) {
            mainContainer.style.display = show ? 'block' : 'none';
        }
    }

    showBalance() {
        this.balanceContainerDiv.style.display = 'block';
        this.memecoinService.getBalance().then((balance: any) => {
            this.balanceContainerDiv.innerHTML = `Current Balance: ${balance}`;
        }).catch((error: any) => {
            this.errorDiv.textContent = `Error fetching balance: ${error.message}`;
        });
    }

    hideMain() {
        this.showMain(false);
    }

    hideBalance() {
        this.balanceContainerDiv.style.display = 'none';
    }
}
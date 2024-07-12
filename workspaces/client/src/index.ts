import { Wallet, GameFi } from '@ton/phaser-sdk';
import { UI } from './ui';
import { loadConfig } from './config';
import { MemecoinService } from './memecoinService';
import Chart from 'chart.js/auto';

async function run() {
    try {
        (window as any).Telegram.WebApp.expand();
        const config = await loadConfig();
        const memecoinService = new MemecoinService(config);
        // Initialize GameFi for wallet interactions
        const gameFi = await GameFi.create({ network: config.NETWORK });

        const phaser = new Phaser.Game({
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: 'game-container'
        });
        const gameUi = new UI(config, memecoinService, gameFi, phaser);

        // if wallet connected - show game UI
        // if not - show only connection button
        const initUi = async (wallet: Wallet | null) => {
            if (wallet) {
                gameUi.showMain(false);
                gameUi.showBalance();
            } else {
                gameUi.hideMain();
                gameUi.hideBalance();
            }
        };

        // Initialize UI based on wallet connection status
        gameFi.onWalletChange(initUi);

        // Example of creating a chart
        const ctx = document.getElementById('myChart') as HTMLCanvasElement;
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } catch (e) {
        console.error('Failed to launch the application.', e);
    }
}

run();
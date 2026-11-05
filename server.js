const WebSocket = require('ws');
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Proxy is active');
        });

        const wss = new WebSocket.Server({ server });
        wss.on('connection', (ws) => {
            const gameServer = new WebSocket('ws://api.deeeep.io');
                ws.on('message', (message) => gameServer.send(message));
                    gameServer.on('message', (message) => ws.send(message));
                        ws.on('close', () => gameServer.close());
                            gameServer.on('close', () => ws.close());
                            });

                            server.listen(8080, () => console.log('Proxy online'));
                            
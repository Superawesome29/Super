const WebSocket = require('ws');
const http = require('http');

const server = http.createServer(async (req, res) => {
    try {
            // Change the destination hostname to the target game (just like the Worker code)
                    const targetUrl = 'https://deeeep.io' + req.url;

                            const headers = { ...req.headers };
                                    delete headers.host; // Remove host header to prevent tracking flags

                                            // Fetch the asset from the game server behind the scenes
                                                    const response = await fetch(targetUrl, {
                                                                method: req.method,
                                                                            headers: headers,
                                                                                        redirect: 'manual'
                                                                                                });

                                                                                                        // Copy the headers from the real game server response over to your iPad
                                                                                                                res.writeHead(response.status, Object.fromEntries(response.headers.entries()));
                                                                                                                        
                                                                                                                                // Stream the asset (HTML, images, JS) back to your school iPad cleanly
                                                                                                                                        const body = await response.arrayBuffer();
                                                                                                                                                res.end(Buffer.from(body));

                                                                                                                                                    } catch (err) {
                                                                                                                                                            res.writeHead(500);
                                                                                                                                                                    res.end('Proxy asset error: ' + err.message);
                                                                                                                                                                        }
                                                                                                                                                                        });

                                                                                                                                                                        // Keep your existing WebSocket proxy intact underneath for live gameplay data
                                                                                                                                                                        const wss = new WebSocket.Server({ server });
                                                                                                                                                                        wss.on('connection', (ws) => {
                                                                                                                                                                            const gameServer = new WebSocket('ws://api.deeeep.io');
                                                                                                                                                                                ws.on('message', (message) => gameServer.send(message));
                                                                                                                                                                                    gameServer.on('message', (message) => ws.send(message));
                                                                                                                                                                                        ws.on('close', () => gameServer.close());
                                                                                                                                                                                            gameServer.on('close', () => ws.close());
                                                                                                                                                                                            });

                                                                                                                                                                                            server.listen(8080, () => console.log('Proxy online'));
                                                                                                                                                                                            
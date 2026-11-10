import express from 'express';
import { createServer } from 'http';
import { createBareServer } from '@tomphttp/bare-server-node';
import { uvPath } from 'ultraviolet-static';
import { join } from 'path';

const app = express();
const server = createServer();
const bare = createBareServer('/bare/');

// Assign the execution port dynamically via cloud provider configurations
const PORT = process.env.PORT || 10000;

// 1. Route all background data streams straight through the Bare engine wrapper
app.use((req, res, next) => {
    if (bare.shouldRoute(req)) {
            bare.routeRequest(req, res);
                } else {
                        next();
                            }
                            });

                            // 2. Serve Ultraviolet's core client-side service worker assets natively
                            app.use('/uv/', express.static(uvPath));

                            // 3. Serve your local frontend directory (Place your index.html and UI menu files inside a public/ folder)
                            app.use(express.static(join(process.cwd(), 'public')));

                            // Fallback route for base path validation
                            app.get('/', (req, res) => {
                                res.sendFile(join(process.cwd(), 'public', 'index.html'));
                                });

                                // 4. Connect Express request handling into the main HTTP runtime instance
                                server.on('request', (req, res) => {
                                    app(req, res);
                                    });

                                    // 5. Intercept and upgrade WebSocket streams securely for real-time multiplayer connections
                                    server.on('upgrade', (req, socket, head) => {
                                        if (bare.shouldRoute(req)) {
                                                bare.routeUpgrade(req, socket, head);
                                                    } else {
                                                            socket.end();
                                                                }
                                                                });

                                                                // Start the production engine instance
                                                                server.listen(PORT, () => {
                                                                    console.log(`Educational Portal pipeline processing effectively on port ${PORT}`);
                                                                    });
                                                                    
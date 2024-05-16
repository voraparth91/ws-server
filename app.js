const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 80 });

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        console.log('Received message:', message);

        // Broadcast the received message to all other clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message.toString()); // Ensure message is sent as a text string
                console.log('Sent message to other client');
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('Signaling server running on ws://localhost:8080');

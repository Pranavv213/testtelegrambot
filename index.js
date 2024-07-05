const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected');

    // Send a message to the client
    ws.send('Hello, client!');

    // Handle incoming messages from the client
    ws.on('message', (message) => {
        console.log(`Received message from client: ${message}`);

        // Echo the message back to the client
        ws.send(`Echo: ${message}`);
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 })
const state = { message: "" }

wss.on('connection', connection => {
  connection.send(state.message);
  connection.on('message', message => {
    state.message = message;
    const otherOpenClients = [...wss.clients]
      .filter(client => client !== connection)
      .filter(client => client.readyState === WebSocket.OPEN);

    otherOpenClients.forEach(client => client.send(message));
  });
})

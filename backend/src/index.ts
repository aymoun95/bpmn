import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import config from './config';
import { loadInitialDiagram } from './utils/loadInitialDiagram';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

app.use(express.json());

let currentDiagramXML: string | null = loadInitialDiagram();

io.on('connection', (socket: Socket) => {
  if (currentDiagramXML) {
    socket.emit('diagram:init', currentDiagramXML);
  }

  // when a user updates the diagram
  socket.on('diagram:update', (xml) => {
    currentDiagramXML = xml;
    socket.broadcast.emit('diagram:update', xml);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(config.socketPort, () => {
  console.log(`Socket server running on port ${config.socketPort}`);
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

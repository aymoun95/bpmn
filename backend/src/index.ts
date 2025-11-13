import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import config from './config';
import { loadInitialDiagram } from './utils/loadInitialDiagram';
import { userJoin, userLeave } from './utils/user';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

app.use(express.json());

let currentDiagramXML: string | null = loadInitialDiagram();
let activeUsers = 0;

io.on('connection', (socket: Socket) => {
  if (currentDiagramXML) {
    socket.emit('diagram:init', currentDiagramXML);
  }

  activeUsers = userJoin(activeUsers);
  io.emit('user:count', activeUsers);

  // when a user updates the diagram
  socket.on('diagram:update', (xml) => {
    currentDiagramXML = xml;
    socket.broadcast.emit('diagram:update', xml);
  });

  socket.on('disconnect', () => {
    activeUsers = userLeave(activeUsers);
    io.emit('user:count', activeUsers);
    console.log('user disconnected', activeUsers);
  });
});

server.listen(config.socketPort, () => {
  console.log(`Socket server running on port ${config.socketPort}`);
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

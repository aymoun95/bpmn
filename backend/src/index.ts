import cors from 'cors';
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

app.use(cors({ origin: '*', methods: ['GET', 'POST'], credentials: true }));

app.use(express.json());

let currentDiagramXML: string | null = loadInitialDiagram();
let activeUsers = 0;
let editorLockedBy: string | null = null; // userId of the one currently editing

io.on('connection', (socket: Socket) => {
  if (currentDiagramXML) {
    socket.emit('diagram:init', currentDiagramXML);
  }

  activeUsers = userJoin(activeUsers);
  io.emit('user:count', activeUsers);

  socket.on('editor:lock', () => {
    if (!editorLockedBy) {
      editorLockedBy = socket.id;
      io.emit('editor:locked', { userId: socket.id });
    }
  });

  socket.on('editor:unlock', () => {
    if (editorLockedBy === socket.id) {
      editorLockedBy = null;
      io.emit('editor:unlocked');
    }
  });

  // when a user updates the diagram
  socket.on('diagram:update', (xml) => {
    currentDiagramXML = xml;
    socket.broadcast.emit('diagram:update', xml);
  });

  socket.on('disconnect', () => {
    activeUsers = userLeave(activeUsers);
    io.emit('user:count', activeUsers);
    console.log('user disconnected', activeUsers);

    if (editorLockedBy === socket.id) {
      editorLockedBy = null;
      io.emit('editor:unlocked');
    }
  });
});

server.listen(config.port, () => {
  console.log(`Server + Socket.IO running on port ${config.port}`);
});

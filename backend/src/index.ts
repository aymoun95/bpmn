import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

import config from './config';
import { socketHandler } from './controllers/socket.controller';

const app = express();

app.use(cors({ origin: '*', methods: ['GET', 'POST'], credentials: true }));
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});

socketHandler(io);
app.get('/', (_, res) => res.send('Backend running'));

const PORT = process.env.PORT || config.port;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

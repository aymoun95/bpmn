import { Server, Socket } from 'socket.io';
import { getDiagram, setDiagram } from '../services/diagram.service';
import {
  getActiveUsers,
  lockEditor,
  unlockEditor,
  userJoin,
  userLeave,
} from '../services/users.service';

export const socketHandler = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    const diagram = getDiagram();
    if (diagram) socket.emit('diagram:init', diagram);

    const users = userJoin();
    io.emit('user:count', users);

    socket.on('editor:lock', () => {
      if (lockEditor(socket.id)) {
        io.emit('editor:locked', { userId: socket.id });
      }
    });

    socket.on('editor:unlock', () => {
      if (unlockEditor(socket.id)) io.emit('editor:unlocked');
    });

    socket.on('diagram:update', (xml) => {
      setDiagram(xml);
      socket.broadcast.emit('diagram:update', xml);
    });

    socket.on('disconnect', () => {
      userLeave();
      io.emit('user:count', getActiveUsers());

      if (unlockEditor(socket.id)) io.emit('editor:unlocked');
    });
  });
};

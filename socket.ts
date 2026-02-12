import { io } from 'socket.io-client';

export const socket = io('https://tribu-app.onrender.com', {
  transports: ['websocket'],
});

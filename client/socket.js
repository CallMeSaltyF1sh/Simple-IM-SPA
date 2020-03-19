import IO from 'socket.io-client';

const socket = new IO('http://localhost:3000', {});

export default socket;
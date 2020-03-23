import IO from 'socket.io-client';

const socket = new IO('//localhost:8080', {
    reconnectionDelay: 5000
});

export default socket;
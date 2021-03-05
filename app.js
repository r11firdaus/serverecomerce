const app = require('express')()
const http = require("http").Server(app);
const io = require('socket.io')(http, {
    cors: {
        // origin: "http://localhost:3000",
        origin: "https://jwallin.vercel.app",
        metohod: ["GET", "POST"]
    }
});
const port = process.env.PORT || 3001


io.on('connection', (socket) => {
    console.log('a user connected');
    io.emit('loadDB', 'load');

    socket.on('chat message', async(msg, id_chat, user, sender) => {
        io.emit('chat message', msg, id_chat, user, sender);
      });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
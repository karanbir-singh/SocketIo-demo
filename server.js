const express = require('express')
const app = express();
app.use(express.static(__dirname + '/public'));

const server = require('http').createServer(app);
const io = require('socket.io')(server);

//Server
const hostname = 'localhost';
const port = 3000;

server.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

//Connessione del client
io.on('connection', (socketClient) => {
    console.log('Client connesso');

    //Risposta del server
    socketClient.emit('response', { message: "ciao", sender: "server" });

    //Quando dal client connesso inviero' una risposta
    socketClient.on('message', (msg) => {
        //In questo modo, il messaggio viene inoltrato a tutti i client
        io.emit('message', { userId: socketClient.id, message: msg.message });
    });
});
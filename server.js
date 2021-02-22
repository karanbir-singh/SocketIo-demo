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
    socketClient.emit('message',{message: "Ciao", sender: "Il Server"});

    //Quando dal client connesso inviero' una risposta
    socketClient.on('ping', () => {
        console.log('Ping from client!');

        //Risposta
        socketClient.emit('pong',{})

        //Se sei avesse fatto in questo modo, il messaggio viene inoltrato a tutti i client
        //  io.emit('pong', {});
    });
});

//Manda un messaggio al 'ping' del client ad intervalli di tempo 
// setInterval(() => {
//     io.emit('pong',{})
// }, 1000);
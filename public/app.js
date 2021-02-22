//Apriamo una connessione
const clientSocket = io();

const btnPing = document.getElementById('btnPing');

//Quando si verifica una connessione, esegui le istruzioni interne
clientSocket.on('connect', (socket) => {
    console.log('Connesso');

    btnPing.onclick = () => {
        clientSocket.emit('ping',{});
    };
});

//Risposta del server alla connessione del client
clientSocket.on('message', (serverMsg) => {
    console.log('Messaggio dal server ' + JSON.stringify(serverMsg, null, 2));
});

//Risposta del server al ping
clientSocket.on('pong', () => {
    console.log('Pong from server');
});
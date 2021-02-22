//Apriamo una connessione
const clientSocket = io();

const btnPing = document.getElementById('btnPing');

//Quando si verifica una connessione, esegui le istruzioni interne
clientSocket.on('connect', (socket) => {
    console.log('Connesso');

    btnPing.onclick = () => {
        clientSocket.emit('ping', {});
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

//Displays the massage
function createMassage(userId, msg) {
    //Item
    const listItem = document.createMassage("li");
    listItem.class = "out";

    //Img utente
    const userImgDiv = document.createMassage("div");
    userImgDiv.class = "chat-img";
    const userImg = document.createMassage("img");
    userImg.alt = "Avtar";
    userImg.src = "https://bootdey.com/img/Content/avatar/avatar1.png";

    userImgDiv.appendChild(userImg);

    //Body
    const body = document.createElement("div");
    body.class = "chat-body";

    //Contenitore messaggio
    const messageDiv = document.createElement("div");
    messageDiv.class = "chat-message";

    //Utente
    const user = document.createElement("h5");
    user.innerText = userId;

    //Messaggio
    const message = document.createElement("p");
    message.innerText = msg;

    messageDiv.appendChild(user);
    messageDiv.appendChild(message);

    body.appendChild(messageDiv);

    listItem.appendChild(body);
}
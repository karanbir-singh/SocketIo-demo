//Connessione
const clientSocket = io();

const btnSend = document.getElementById('btnSend');
const inputMsg = document.getElementById('inputMsg');

//Quando si verifica una connessione, esegui le istruzioni interne
clientSocket.on('connect', (socket) => {
    console.log('Connesso');

    btnSend.onclick = () => {
        clientSocket.emit('message', { message: inputMsg.value });
    }
});

//Risposta del server alla connessione del client
clientSocket.on('response', (serverMsg) => {
    //console.log('Messaggio dal server ' + JSON.stringify(serverMsg, null, 2));
});

//Risposta del server al ping
clientSocket.on('message', (msg) => {
    document.getElementById('chatList').appendChild(createMassage(msg.userId, msg.message));
});

//Displays the massage
function createMassage(userId, msg) {
    //Item
    const listItem = document.createElement("li");
    listItem.className = "out";

    //Img utente
    const userImgDiv = document.createElement("div");
    userImgDiv.className = "chat-img";
    const userImg = document.createElement("img");
    userImg.alt = "Avtar";
    userImg.src = "https://www.bootdey.com/img/Content/avatar/avatar1.png";

    userImgDiv.appendChild(userImg);

    //Body
    const body = document.createElement("div");
    body.className = "chat-body";

    //Contenitore messaggio
    const messageDiv = document.createElement("div");
    messageDiv.className = "chat-message";

    //Utente
    const user = document.createElement("h5");
    user.innerText = userId;

    //Messaggio
    const message = document.createElement("p");
    message.innerText = msg;

    messageDiv.appendChild(user);
    messageDiv.appendChild(message);

    body.appendChild(messageDiv);

    listItem.appendChild(userImgDiv);
    listItem.appendChild(body);

    return listItem;
}


$(document).ready(function() {

var stompClient = null;

function connect() {
    var socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame) {
        stompClient.subscribe('/topic/messages', function(messageOutput) {
            showMessageOutput(JSON.parse(messageOutput.body));
        });
    });
}

function disconnect() {
    if(stompClient != null) {
        stompClient.disconnect();
    }
}

function sendMessage() {
    var from = document.getElementById('from').value;
    var text = document.getElementById('message').value;
    stompClient.send("/app/chat", {}, JSON.stringify({'from':from, 'text':text}));
}

function showMessageOutput(messageOutput) {
    var messageElement = document.createElement('li');
    messageElement.classList.add("message");
    messageElement.innerText = messageOutput.from + ": " + messageOutput.text;
    document.getElementById('messageList').appendChild(messageElement);
}

document.getElementById('messageForm').addEventListener('submit', function (event) {
    event.preventDefault();
    sendMessage();
});

connect();

});
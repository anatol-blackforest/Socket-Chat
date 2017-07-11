//здесь адрес чат-сервера
var socket = io.connect('http://localhost:8080/');
var user = ''; 

window.onload = function () {
     
    var users_container = document.getElementById('userlist'); 
    var message_container = document.getElementById('messages');

    message_container.style.height = window.innerHeight - 200 + 'px'; 

    var btn = document.getElementById('btn'); 
    var message_input = document.getElementById('inp');

    // загрузить имена пользователей, которые online 
    socket.emit('load users');
    socket.on('users loaded', function (data) {
        var display_users = data.users.map((username) => {
            return  `<li>${username.name}</li>`
        })

        users_container.innerHTML = display_users.join(' '); 
    });

    socket.on('nickerror', function (data) {
        alert(data.error)
    });

    // загрузить сообщения других пользователей (при загрузке страницы)
    socket.emit('load messages');
    socket.on('messages loaded', function (data) {

        var display_messages = data.messages.map((msg) => {
            return (`<div class ="panel well">
                         <h4>${msg.author}</h4>
                         <h5>${msg.text}</h5>
                    </div>`);
        });
        
        message_container.innerHTML = display_messages.join(' ');
        //заскроллить вниз
        message_container.scrollTop = message_container.scrollHeight;
    }); 

    // загрузить текущее сообщение
    socket.on('chat message',  function (message) {
        console.log(message)
        var display_message = `<div class ="panel well">
                                   <h4>${message.author}</h4>
                                   <h5>${message.text}</h5>
                               </div>`
        message_container.innerHTML += display_message;
        //заскроллить вниз
        message_container.scrollTop = message_container.scrollHeight;
    }); 

    // получить имя пользователя 
    socket.on('new user', function (data) {
        user = data.name; 
    })

    let generateEvent = function () {
        // сгенерировать событие отправки сообщения 
        if(message_input.value){
            socket.emit('send message', { text: message_input.value, author: user }); 
            message_input.value = "";
        }
    }

    btn.addEventListener("click", generateEvent);
    
    message_input.addEventListener("keypress", (e) => {
        if(e.keyCode == 13){
           generateEvent();
        }
    });

}

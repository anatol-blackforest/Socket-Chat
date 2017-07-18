// установка соединения
const escape_html = require('escape-html');

const disconnect = require('./disconnect');
const sendMessage = require('./sendmessage');

module.exports = function(io, socket, name, users, messages, hints){

    let unicalName;
    //вставляем уникальное имя
    unicalName = true;
    users.map(item => {
        if(item.name == name.userName){
            unicalName = false;
        }
    });

    if(unicalName){
        users.push({id: socket.id, name: name.userName});
        // обработка сообщения 
        socket.on('send message', function (data) {
            sendMessage(io, data, messages);
        });
        // окончание соединения 
        socket.on('disconnect', function (data) {
            disconnect(io, socket, users, hints);
        });
        // добавить нового пользователя в чат 
        socket.emit('new user', { name: users[users.length - 1]["name"] });
    }else{
        socket.emit('nickerror', { error: hints[0]});
    }

    console.log(hints[1], users.length);

    // загрузить пользователей
    socket.on('load users', function () {
        io.sockets.emit('users loaded', { users })
    });

    // загрузить сообщения
    socket.on('load messages', function () {
        socket.emit('messages loaded', { messages })
    });

}

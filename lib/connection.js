// установка соединения
const escape_html = require('escape-html');
const util = require('util');
const disconnect = require('./disconnect');
const sendMessage = require('./sendmessage');
const config = require('./config');  

let {name, hints, users, messages} = config;

module.exports = function(io, socket){

    socket.on('loaded', () => {

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
            //оповещаем о новом пользователе
            sendMessage(io, {text: util.format(hints[4], name.userName), author: users[0].name});
            // обработка сообщения 
            socket.on('sendMessage', data => {
                sendMessage(io, data);
            });
            // окончание соединения 
            socket.on('disconnect', data => {
                disconnect(io, socket);
            });
            // добавить нового пользователя в чат 
            socket.emit('newUser', { name: users[users.length - 1]["name"] });

        }else{
            socket.emit('nickerror', { error: hints[0]});
        }

        // загрузить пользователей
        socket.on('loadUsers', () => {
            io.sockets.emit('usersLoaded', { users })
        });

        // загрузить сообщения
        socket.on('loadMessages', () => {
            socket.emit('messagesLoaded', { messages })
        });

    });

}

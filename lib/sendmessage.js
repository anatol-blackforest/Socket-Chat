// обработка сообщения 
const escape_html = require('escape-html');
const config = require('./config'); 

let {messages} = config;

module.exports = function(io, data){
    // сгенерировать событие chat message и отправить его всем доступным подключениям 
    io.sockets.emit('chat message', {text: escape_html(data.text).substring(0,1024), author: escape_html(data.author)});
    // сохранить сообщение
    messages.push({text: escape_html(data.text).substring(0,1024), author: escape_html(data.author)});
}
// обработка сообщения 
const escape_html = require('escape-html');

module.exports = function(io, data, messages){
    // сохранить сообщение
    messages.push({text: escape_html(data.text), author: escape_html(data.author)});
    // сгенерировать событие chat message и отправить его всем доступным подключениям 
    io.sockets.emit('chat message', {text: escape_html(data.text), author: escape_html(data.author)});
}

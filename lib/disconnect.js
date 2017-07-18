// окончание соединения 
const escape_html = require('escape-html');

module.exports = function(io, socket, users, hints){
    // удалить разорванное соединение из списка текущих соединений и удалить пользователя из массива текущих пользователей  
    let index;
    users.forEach((item, i) => {
        if(item.id == socket.id){
            index = i;
        }
    });
    users.splice(index, 1);
    // обновить список пользователей на клиенте 
    io.sockets.emit('users loaded', { users })
    console.log(hints[2], users.length);
}

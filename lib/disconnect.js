// окончание соединения 
const escape_html = require('escape-html');
const sendMessage = require('./sendmessage');
const config = require('./config'); 

let {users, hints} = config;

module.exports = function(io, socket){
    // удалить разорванное соединение из списка текущих соединений
    let index;
    users.forEach((item, i) => {
        if(item.id == socket.id){
            index = i;
        }
    });
    //оповещаем об уходе пользователя
    sendMessage(io, {text:`${users[index].name} ${hints[5]}`, author: users[0].name});
    //удалить пользователя из массива текущих пользователей  
    users.splice(index, 1);
    // обновить список пользователей на клиенте 
    io.sockets.emit('users loaded', { users })
    console.log(hints[2], users.length);
}

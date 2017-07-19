// бот-говорун, говорит каждую минуту (60000 мксек)
const config = require('./config');  

let {botMessages, users, messages} = config;

module.exports = function(io){
    setInterval(() => {
        let botMessage = botMessages[Math.round(Math.random() * (botMessages.length - 1))];
        messages.push({text: botMessage, author: users[0].name});
        io.sockets.emit('chat message', {text: botMessage, author: users[0].name});
    }, 60000);
}

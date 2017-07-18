// бот-говорун, говорит каждую минуту (60000 мксек)

module.exports = function(io, botMessages, users, messages){
    setInterval(() => {
        let botMessage = botMessages[Math.round(Math.random() * (botMessages.length - 1))];
        messages.push({text: botMessage, author: users[0].name});
        io.sockets.emit('chat message', {text: botMessage, author: users[0].name});
    }, 60000);
}

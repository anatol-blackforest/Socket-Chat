// подключение express и socket.io 
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const escape_html = require('escape-html');
const path = require('path'); 
const port = 8080; 

let name, botMessage, unicalName;

// массив для хранения текущих подключений 
let users = [{id: 12345, name:"Говорун"}];
// массив для хранения текущих сообщений 
let messages = []; 
let botMessages = ["Че молчим? 😁", "Cкучно 😡", "Расскажите анекдот 😤"]; 

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'auth.html')); 
});

setInterval(() => {
	// бот-говорун, говорит каждую минуту (60000 мксек)
    botMessage = botMessages[Math.round(Math.random() * (botMessages.length - 1))];
    messages.push({text: botMessage, author: users[0].name});
    io.sockets.emit('chat message', {text: botMessage, author: users[0].name});
}, 60000);

app.get('/:id', function (req, res) {

    if (req.params.id == 'client.js') {
        res.sendFile(path.join(__dirname, 'client.js'));
    }
    else if (req.params.id == 'favicon.ico') {
        res.sendStatus(404); 
    }
    else {
        name = escape_html(req.params.id).substring(0,50);
        res.sendFile(path.join(__dirname, 'index.html'));
    }

});

// установка соединения
io.on('connection', function (socket) {

        //вставляем уникальное имя
        unicalName = true;
        users.map(item => {
            if(item.name == name){
                unicalName = false;
            }
        });

        if(unicalName){

            users.push({id: socket.id, name});
            // обработка сообщения 
            socket.on('send message', function (data) {
                // сохранить сообщение
                messages.push({text: escape_html(data.text), author: escape_html(data.author)});

                // сгенерировать событие chat message и отправить его всем доступным подключениям 
                io.sockets.emit('chat message', {text: escape_html(data.text), author: escape_html(data.author)});
            });

            // окончание соединения 
            socket.on('disconnect', function (data) {

                // удалить разорванное соединение из списка текущих соединений и удалить пользователя из массива текущих пользователей  
                // тут говнокод, с утра поколупать:
                let index;
                users.forEach((item, i) => {
                    if(item.id == socket.id){
                        index = i;
                    }
                });

                users.splice(index, 1);

                // обновить список пользователей на клиенте 
                io.sockets.emit('users loaded', { users })

                console.log('Disconnected: %s users connected', users.length);
            });

            // добавить нового пользователя в чат 
            socket.emit('new user', { name: users[users.length - 1]["name"] });
            
        }else{
            socket.emit('nickerror', { error: "Ник уже используется"});
        }
    
        console.log(users);
        console.log(socket.id);
        console.log('Connected: %s users connected', users.length);

        // загрузить пользователей
        socket.on('load users', function () {
            console.log(users)
            io.sockets.emit('users loaded', { users })
        });

        // загрузить сообщения
        socket.on('load messages', function () {
            socket.emit('messages loaded', { messages })
        });

}); 

server.listen(port, function () {
    console.log('app running on port ' + port);
})
// подключение express и socket.io 
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var escape_html = require('escape-html');
var path = require('path'); 

var port = 8080; 
var name;

// массив для хранения текущих подключений 
var users = [];
// массив для хранения текущих сообщений 
var messages = []; 

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'auth.html')); 
});

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
        let ok = true;
        users.map(item => {
            if(item.name == name){
                ok = false;
            }
        });

        if(ok){

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

                console.log('Disconnected: %s sockets connected', users.length);
            });

            // добавить нового пользователя в чат 
            socket.emit('new user', { name: users[users.length - 1]["name"] });
            
        }else{
            socket.emit('nickerror', { error: "Ник уже используется"});
        }
    
        console.log(users);
        console.log(socket.id);
        console.log('Connected: %s sockets connected', users.length);

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
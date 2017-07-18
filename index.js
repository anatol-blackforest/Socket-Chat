// подключение express и socket.io 
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const escape_html = require('escape-html');
const path = require('path'); 
const port = 8080; 

const bot = require('./lib/bot'); 
const render = require('./lib/render'); 
const connection = require('./lib/connection');
const config = require('./lib/config');  

let {name, hints, users, messages, botMessages} = config;

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/html/auth.html')); 
});

// бот-говорун, говорит каждую минуту (60000 мксек)
bot(io, botMessages, users, messages);

// окно чата для входящего юзера
app.get('/:id', function (req, res) {
    render(req, res, name);
});

// установка соединения
io.on('connection', function (socket) {
    connection(io, socket, name, users, messages, hints);
}); 

server.listen(port, function () {
    console.log(hints[3] + port);
});

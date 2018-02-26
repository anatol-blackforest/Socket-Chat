// подключение express и socket.io 

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const escape_html = require('escape-html');
const path = require('path'); 

const bot = require('./lib/bot'); 
const connection = require('./lib/connection');
const config = require('./lib/config');  

let {hints, port, name} = config;

app.use(express.static(path.join(__dirname, 'views', 'script')))
app.use(express.static(path.join(__dirname, 'views', 'style')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'html', 'auth.html')); 
});

// бот-говорун, говорит каждую минуту (60000 мксек)
bot(io);

// окно чата для входящего юзера
app.get('/:id', (req, res) => {
    if(req.params.id !== "favicon.ico"){name.userName = escape_html(req.params.id).substring(0,50)}
    res.sendFile(path.join(__dirname, 'views', 'html', 'index.html'));
});

// установка соединения
io.on('connection', socket => {
    connection(io, socket);
}); 

server.listen(port, () => {
    console.log(`${hints[3]} ${port}`);
});

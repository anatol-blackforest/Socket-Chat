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

let {hints} = config;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './views/html/auth.html')); 
});

// бот-говорун, говорит каждую минуту (60000 мксек)
bot(io);

// окно чата для входящего юзера
app.get('/:id', (req, res) => {
    render(req, res);
});

// установка соединения
io.on('connection', socket => {
    connection(io, socket);
}); 

server.listen(port, () => {
    console.log(hints[3] + port);
});

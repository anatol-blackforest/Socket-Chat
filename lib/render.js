// окно чата для входящего юзера
const path = require('path'); 
const escape_html = require('escape-html');
const config = require('./config');  

let {name} = config;

module.exports = function(req, res){
    if (req.params.id == 'style.css') {
        res.sendFile(path.join(__dirname, '../views/style/style.css'));
    } else if (req.params.id == 'client.js') {
        res.sendFile(path.join(__dirname, '../views/script/client.js'));
    } else if (req.params.id == 'favicon.ico') {
        res.sendStatus(404); 
    } else {
        name.userName = escape_html(req.params.id).substring(0,50);
        res.sendFile(path.join(__dirname, '../views/html/index.html'));
    }
}

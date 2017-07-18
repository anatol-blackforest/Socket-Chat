// окно чата для входящего юзера
const path = require('path'); 
const escape_html = require('escape-html');

module.exports = function(req, res, name){
    if (req.params.id == 'style.css') {
        res.sendFile(path.join(__dirname, '../style.css'));
    } else if (req.params.id == 'client.js') {
        res.sendFile(path.join(__dirname, '../client.js'));
    } else if (req.params.id == 'favicon.ico') {
        res.sendStatus(404); 
    } else {
        name.userName = escape_html(req.params.id).substring(0,50);
        res.sendFile(path.join(__dirname, '../index.html'));
    }
}

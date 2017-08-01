// окно чата для входящего юзера
const path = require('path'); 
const escape_html = require('escape-html');
const config = require('./config');  

let {name} = config;

module.exports = function(req, res){
    switch(req.params.id) {
      case 'style.css':  {
        res.sendFile(path.join(__dirname, '../views/style/style.css'));
        break
      }
      case 'client.js':  {
        res.sendFile(path.join(__dirname, '../views/script/client.js'));
        break
      }
      case 'favicon.ico':  {
        res.sendStatus(404); 
        break
      }
      default: {
        name.userName = escape_html(req.params.id).substring(0,50);
        res.sendFile(path.join(__dirname, '../views/html/index.html'));
      }
    }
}

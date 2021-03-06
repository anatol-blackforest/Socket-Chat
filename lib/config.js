//конфигурация данных сайта
let config = {};

//порт
config.port = parseInt(process.env.PORT) || 8080;
//имя подсоединяющегося пользователя
config.name = {userName: null};
// массив для хранения текущих подключений 
config.users = [{id: 12345, name:"Говорун"}];
// массив для хранения текущих сообщений 
config.messages = []; 
config.hints = [
    "Ник уже используется", 
    "Connected: %s users connected", 
    "Disconnected: %s users connected", 
    "app running on port", 
    "Приветствуем, %s! 😁", 
    "покинул(-а) нас 😡"
]; 
config.botMessages = [
    "Че молчим? 😁", 
    "Cкучно 😡", 
    "Расскажите анекдот 😤"
]; 
//параметры авторизационного апплета на фейсбук
config.clientID = process.env.clientID
config.clientSecret = process.env.clientSecret
config.callbackURL = "https://socket-simplechat.herokuapp.com/auth/facebook/callback"

module.exports = config;

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
config.clientID = 464037280713366
config.clientSecret = "be9afb9e25ed4701cc498ccb7d835952"
config.callbackURL = "/auth/facebook/callback"

module.exports = config;

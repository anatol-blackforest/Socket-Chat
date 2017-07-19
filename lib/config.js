//конфигурация данных сайта
let config = {};

//имя подсоединяющегося пользователя
config.name = {userName: null};
// массив для хранения текущих подключений 
config.users = [{id: 12345, name:"Говорун"}];
// массив для хранения текущих сообщений 
config.messages = []; 
config.hints = ["Ник уже используется", "Connected: %s users connected", "Disconnected: %s users connected", "app running on port "]; 
config.botMessages = ["Че молчим? 😁", "Cкучно 😡", "Расскажите анекдот 😤"]; 

module.exports = config;
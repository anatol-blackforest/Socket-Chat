// подключение express и socket.io 
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const escape_html = require('escape-html');
const path = require('path'); 
const passport = require('passport')
const session = require('cookie-session');
const FacebookStrategy = require('passport-facebook').Strategy;

const bot = require('./lib/bot'); 
const connection = require('./lib/connection');
const config = require('./lib/config');  

let {hints, port, name, clientID, clientSecret, callbackURL} = config;

app.use(express.static(path.join(__dirname, 'views')))
app.use(session({keys: ['betelgeuse']}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
    clientID,
    clientSecret,
    callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
      if(profile){
        done(null, profile);
      }else{
        done(new Error("Acess denied!")); 
      }
  }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',  passport.authenticate('facebook', { successRedirect: '/',  failureRedirect: '/' }));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'html', 'auth.html')));

// бот-говорун, говорит каждую минуту (60000 мксек)
bot(io);

// окно чата для входящего юзера
app.get('/:id', (req, res) => {
    if(!req.isAuthenticated()) return res.redirect("/")
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

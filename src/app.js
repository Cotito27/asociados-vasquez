const express = require('express');
const app = express();

const path = require('path');
const morgan = require('morgan');

const multer = require('multer');
const bcrypt = require('bcrypt');
const cors = require('cors');

// Models
const User = require('./models/User.model');

// PASSPORT
const passport = require('passport'),
cookieParser = require('cookie-parser'),
session = require('express-session'),
secretCookie = process.env.SECRET_COOKIE_PARSER,
PassportLocal = require('passport-local').Strategy;

// settings 
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(cors({origin: '*'}));
app.use(express.urlencoded({extended: true}));

// PASSPORT CONFIG
app.use(cookieParser(secretCookie));
const sessionMiddleware = session({
  secret: secretCookie,
  resave: true,
  saveUninitialized: true
})
app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());

// PASSPORT USER STABLISHED WITH PASSPORTLOCAL
passport.use(new PassportLocal(async function(username, password, done) {
  let verifyUser = false;
  let idUser = 0;
  let nomUser = "";
  let fotoUser = "";
  // let user = await User.findOne({ email: username }).catch((err) => console.log(err));
  // let match;
  // // console.log('Validado');
  // if(user) {
  //   if(user.password == password) {
  //     verifyUser = true;
  //     idUser = user._id;
  //     nomUser = user.name;
  //     fotoUser = user.foto || '/img/placeholder-image.png';
  //   }
  // }
  if(username == process.env.USER_PRIVATE_ADMIN && password == process.env.PASSWORD_PRIVATE_ADMIN) {
    verifyUser = true;
    idUser = 1;
    nomUser = 'Daniel Vasquez';
    fotoUser = 'https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg';
  }
  if(verifyUser) {
    return done(null, {id: idUser, user:username, name: nomUser, foto: fotoUser});
  }
  done(null, false);
}));

// SERIALIZAR USER
passport.serializeUser(function(user, done) {
  done(null, user);
});

// DESERIALIZAR USER
passport.deserializeUser(function(user, done) {
  done(null, user);
});


// static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(multer({
  dest: path.join(__dirname, "public/upload"),
  // limits: { fieldSize: 202600000 }
}).single('archivo'));

// routes
app.use(require('./routes/index').router);   

// 404 handler
app.use((req, res, next) => {
  res.json({msg: 'Page Not Found'});
  // res.status(404).render('404', {
  //   isValidate: true,
  //   redirect: 'login-form',
  // });
});

// starting the server
module.exports = {app, sessionMiddleware};
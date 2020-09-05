var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ExpressSession=require('express-session')
var passport=require('passport')
var usersRouter = require('./routes/users');
var pollRouter = require('./routes/index')
var mongoose = require('mongoose')
var MongoStore = require('connect-mongo')(ExpressSession);
var cors = require('cors')

var app = express();


mongoose
  .connect('mongodb://localhost/mernvoting', {
    useNewUrlParser: true,
    useUnifiedTopology: true 

  })
  
mongoose.connection.on('open', () => {
  console.log("database connected successfully");
  
})

  

app.use(logger('dev'));
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(ExpressSession({
  secret: 'thesupergatsbysecret',
  resave: false,
  saveUninitialized:false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
  }),
  cookie: {
    maxAge: 100 * 60 * 1000,
    secure: false,
    sameSite: true
  }
}))

app.use(passport.initialize())
app.use(passport.session())
/*app.use((req, res, next) => {
 // console.log(req.body);
  
/*  res.header('Access-control-Allow-Origin', 'http://localhost:3000');
 res.header('Access-control-Allow-Headers',"Origin, X-Requested-With,Content-Type,Accept,Authorization")
  
 res.header('Access-control-Allow-Credentials', true)
 if (req.method === 'OPTIONS') {

    res.header('Access-control-Allow-Methods', 'PUT ,POST,PATCH,DELETE,GET')
    return res.status(200).json({})
  }
  next()
})*/
require('./config/passport')


app.use('/user', usersRouter);
app.use('/poll', pollRouter);
  // error handler



module.exports = app;

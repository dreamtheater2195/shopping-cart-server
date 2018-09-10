var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');
var helmet = require('helmet');
var mongoose = require('mongoose');
require('./middlewares/passport');
var authRoutes = require('./routes/auth.routes');
var userRoutes = require('./routes/user.routes');
var app = express();

app.use(helmet());
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {

  authRoutes(app);
  userRoutes(app);
  //404 Not Found Middleware
  app.use(function (req, res, next) {
    res.status(404)
      .type('text')
      .send('Not Found');
  });
});

module.exports = app;

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import logger from 'morgan';
import { protectedValue } from './protected';

const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const authentificationRoutes = require('./routes/authentification');

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

let db;
if (app.settings.env !== 'test') {
  mongoose.connect(protectedValue('dbUri'), { useNewUrlParser: true });
  db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  app.use(cookieParser());
  app.use(session({
    secret: protectedValue('sessionSecret'),
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: db }),
    rolling: true,
    name: 'ArthurDent',
  }));
}

app.use('/', router);
authentificationRoutes(app, router);

process.on('SIGINT', () => {
  db.close(() => {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});

module.exports = app;

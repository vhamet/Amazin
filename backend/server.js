import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import { getProtectedValue } from './protected';
var session = require('express-session');
var cookieParser = require('cookie-parser');
var authentificationRoutes = require('./routes/authentification');
const MongoStore = require('connect-mongo')(session);

// and create our instances
const app = express();
const router = express.Router();

// set our port to either a predetermined port number if you have set it up, or 3001
const API_PORT = process.env.API_PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

mongoose.connect(getProtectedValue('dbUri'), { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cookieParser());
app.use(session({
    secret: getProtectedValue('sessionSecret'),
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: db }),
    rolling: true,
    name: 'ArthurDent'
}));

app.use('/', router);
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
authentificationRoutes(app, router);

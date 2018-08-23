import express from 'express';
var authentification = require('./authentification');

// and create our instances
const app = express();
const router = express.Router();

// set our port to either a predetermined port number if you have set it up, or 3001
const API_PORT = process.env.API_PORT || 3001;

app.use('/', router);
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
authentification(app, router);

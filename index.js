require('dotenv').config();

const express = require('express');
const logger = require('morgan');

const app = express();
const router = express.Router();

const environment = process.env.NODE_ENV;
const stage = require('./config')[environment];

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

if (environment !== 'production') {
    app.use(logger('dev'));
}
const routes = require('./routes/index')
app.use('/api/v1',routes(router));
app.listen(`${stage.port}`, () => {
    console.log(`Server now listening at localhost:${stage.port}`);
});

module.exports = app;
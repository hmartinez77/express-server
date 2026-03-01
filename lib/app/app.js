const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const expressHandlebars = require('express-handlebars');

const config = require('../config.js');
const logger = require('../logger.js');

const secret = require('../secret/secret.js');

const app = express();

app.engine('hbs', expressHandlebars.engine({
    defaultLayout: null,
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', config.projectPath('views'));

app.use(morgan(config.morganFormat, { stream: logger.httpStream }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(expressSession({
    secret: config.sessionSecret,
    saveUninitialized: false,
    resave: false
}));

app.use('/secret', secret.router);

app.use(express.static(config.staticDir));

app.use((req, res) => {
    res.status(404);
    res.type('text/html');
    res.send(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
    <title>Not Found</title>
  </head>
  <body>
    <h1>Not found</h1>
    <p>The URL <code>${req.originalUrl}</code> is not found.</p>
  </body>
</html>`);
});

module.exports = app;
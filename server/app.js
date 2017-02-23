/* eslint-disable max-params*/
/* eslint-disable no-console*/
'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const cookieParser = require('cookie-parser');

app.disable('x-powered-by');

require('dotenv').config();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/players', require('./routes/players'));
app.use('/api/token', require('./routes/token'));

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.use((req, res, next) => {
  const err = new Error('Not Found');

  err.status = 404;
  next(err);
});

app.use((err, _req, res, _next) => {
  if (err.status) {
    return res
    .status(err.status)
    .send(err);
  }

  if (err.output && err.output.statusCode) {
    return res
    .status(err.output.statusCode)
    .set('Content-Type', 'text/plain')
    .send(err.message);
  }

  console.error(err.stack);
  res.sendStatus(500);
});

module.exports = app;

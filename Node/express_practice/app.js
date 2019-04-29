'use strict';

const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/sum', (req, res) => {
  const queries = req.query;
  const a = parseInt(queries.a);
  const b = parseInt(queries.b);
  res.send(`The sum of ${a} and ${b} is ${a+b}.`);
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});
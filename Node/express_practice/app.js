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

app.get('/cipher', (req, res) => {
  const queries = req.query;
  const shift = parseInt(queries.shift);
  const text = queries.text;
  // abc shift = 1
  const cipherMessage = text.split('').map(letter => {
    let charCode = letter.charCodeAt(0);
    if(charCode === 122) {
      charCode = 96;
    }
    const newCharCode = charCode + shift; 
    return String.fromCharCode(newCharCode);
  }).join('');
  res.send(cipherMessage);
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});
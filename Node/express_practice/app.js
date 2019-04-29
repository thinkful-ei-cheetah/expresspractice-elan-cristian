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

app.get("/lotto", (req, res) => {
  const queries = req.query;
  const numbers = queries.arr.map(number => {
    return parseInt(number);
  })
  
  function randomNumberGenerator() {
    const numberArr = []

    for (let i = 0; i < 6; i++) {
      numberArr.push(Math.floor(Math.random() * 20))
    }
    return numberArr
  }

  const winningNumbers = randomNumberGenerator()

  const result = numbers.filter(element => winningNumbers.includes(element));

  if (result.length === 6) {
    res.send('Wow. You could have won the mega millions!')
  }

  else if (result.length === 5) {
    res.send('Congrats. You win $100!')
  }

  else if (result.length === 4) {
    res.send('Congrats. You win a free ticket!')
  }

  res.send(`Sorry, you lose. You only matched ${result.length}`)
})

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});

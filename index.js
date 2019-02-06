const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/*+json' }));

app.get('/', (req, res, next) => {
  console.log('GET /');
  res.status(200).end('Ok');
});

app.get('/callback', (req, res, next) => {
  console.log('GET /callback');
  console.log(req.body.code);
  console.log(req.params.code);
  res.status(200).end('Ok');
});

app.get('/token', (req, res, next) => {
  console.log('GET /token');
  console.log(req.body);
  res.status(200).end('Ok');
});

app.listen(process.env.PORT || 3000);

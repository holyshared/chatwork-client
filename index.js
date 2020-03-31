const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const querystring = require('querystring');

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

  console.log(req.body);
  console.log(req.params);

  const code = req.query.code || req.body.code || req.params.code;

  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;

  const buff = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`);
  const credential = buff.toString('base64');

  const instance = axios.create({
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Basic ${credential}`,
    }
  });
  const payload = querystring({
    grant_type: 'authorization_code',
    code
  });
  axios.post('https://oauth.chatwork.com/token', payload)
  .then(function (res) {
    console.log(res.data);
    res.status(200).end('Ok');
  })
  .catch(function (error) {
    console.log(error.message);
    res.status(503).end('Oops!!');
  });
});

app.get('/token', (req, res, next) => {
  console.log('GET /token');
  console.log(req.body);
  res.status(200).end('Ok');
});

app.listen(process.env.PORT || 3000);

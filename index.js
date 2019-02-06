const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/*+json' }));

app.get('/callback', (req, res, next) => {
  console.log(req.params.code);
});

app.listen(process.env.PORT || 3000);

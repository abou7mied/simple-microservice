const express = require('express');
const Seneca = require('seneca');
const engines = require('consolidate');
const bodyParser = require('body-parser');
const Promise = require('bluebird');

const app = express();
const seneca = Seneca({log: 'silent'});
const client = seneca.client(9010);
const act = Promise.promisify(client.act, {context: client});

app.set('view engine', 'html');
app.engine('html', engines.ejs);
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/hash-password', async (req, res) => {
  const {body} = req;
  const {password} = body;
  try {
    const {hash} = await act('role:utils,cmd:hashPassword', {password});
    res.send(`hash: ${hash}`);
  } catch (error) {
    res.send("error occurred");
  }
});

app.listen(7000);


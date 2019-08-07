const engines = require('consolidate');
const bodyParser = require('body-parser');
const hashPasswordEndPoint = require('./hash-password');

const init = (app) => {
  app.set('view engine', 'html');
  app.engine('html', engines.ejs);
  app.use(bodyParser.urlencoded({extended: true}));

  app.get('/', (req, res) => {
    res.render('index');
  });

  app.post('/hash-password', hashPasswordEndPoint());

};

module.exports = {init};

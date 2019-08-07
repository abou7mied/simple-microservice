const express = require('express');
const controllers = require('./controllers');

const app = express();

controllers.init(app);
app.listen(process.env.PORT || 7000);



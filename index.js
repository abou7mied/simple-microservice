const express = require('express');
const controllers = require('./controllers');

const PORT = process.env.PORT || 7000;
const app = express();

controllers.init(app);
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
});



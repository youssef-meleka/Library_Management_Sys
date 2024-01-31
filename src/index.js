const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

app.use(bodyParser.json());
const PORT = process.env.PORT;


app.listen(PORT, () => {
  console.log(`Welcome the Server is running on port ${PORT}`);
});

module.exports = app;
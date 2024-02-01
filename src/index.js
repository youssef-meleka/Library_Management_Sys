const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const bookRouter = require('./routes/bookRoutes');
const borrowerRouter = require('./routes/borrowerRoutes');
const borrowedBookRouter = require('./routes/borrowedBookRoutes');
const rateLimit = require('express-rate-limit');

dotenv.config();

app.use(bodyParser.json());
const PORT = process.env.PORT;

//limits to 10 requests per 1 minute
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
});


app.use(bookRouter);
app.use(borrowerRouter);
app.use(limiter,borrowedBookRouter); // apply limiter for those paths only

app.listen(PORT, () => {
  console.log(`Welcome the Server is running on port ${PORT}`);
});

module.exports = app;
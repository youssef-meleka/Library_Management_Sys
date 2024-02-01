const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const borrowedBookRouter = express.Router();
const borrowedBookController = require('../controllers/borrowedBookController');


borrowedBookRouter.post('/checkout-book', borrowedBookController.checkoutBook);
borrowedBookRouter.post('/return-book', borrowedBookController.returnBook);
borrowedBookRouter.get('/show-borrowed-books/:borrowerId', borrowedBookController.getBorrowedBooks);
borrowedBookRouter.get('/show-overdue-books', borrowedBookController.getOverdueBooks);


module.exports = borrowedBookRouter;
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const bookRouter = express.Router();
const bookController = require('../controllers/bookController');


bookRouter.get('/books', bookController.get_all_books);
bookRouter.post('/add-book', bookController.create_book);
bookRouter.get('/show-book/:id', bookController.get_book_by_id);
bookRouter.put('/book/:id', bookController.update_book);
bookRouter.delete('/book/:id', bookController.delete_book);

module.exports = bookRouter;
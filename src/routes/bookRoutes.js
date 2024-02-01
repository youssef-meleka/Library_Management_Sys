const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const bookRouter = express.Router();
const bookController = require('../controllers/bookController');


bookRouter.get('/books', bookController.get_all_books);
bookRouter.post('/add-book', bookController.create_book);
bookRouter.get('/search-book/:searchTerm', bookController.search_for_book);
bookRouter.put('/book/:id', bookController.update_book);
bookRouter.delete('/book/:id', bookController.delete_book);

module.exports = bookRouter;
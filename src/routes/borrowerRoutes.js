const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const borrowerRouter = express.Router();
const borrowerController = require('../controllers/borrowerController');


borrowerRouter.get('/borrowers', borrowerController.get_all_borrowers);
borrowerRouter.post('/add-borrower', borrowerController.create_borrower);
borrowerRouter.put('/borrower/:id', borrowerController.update_borrower);
borrowerRouter.delete('/borrower/:id', borrowerController.delete_borrower);

module.exports = borrowerRouter;
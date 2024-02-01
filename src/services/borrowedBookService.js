const BorrowedBook = require('../models/borrowedBookModel');
const Book = require('../models/bookModel');
const User = require('../models/borrowerModel');
const Sequelize = require('sequelize');


// Check out a book
const checkoutBook = async (bookId, borrowerId) => {
  try {
    // Validate availability and borrowing limits (if applicable)
    const book = await Book.findByPk(bookId);
    if (!book) {
      throw new Error('Book not found');
    }
    if (book.isAvailable === false) {
      throw new Error('Book is not available');
    }

    // Check for existing borrowed book
    const existingBorrowedBook = await BorrowedBook.findOne({
      where: { book_id: bookId, is_return: false },
    });
    if (existingBorrowedBook) {
      throw new Error('Book is already checked out');
    }

    // Create the borrowed book record
    const borrowedBook = await BorrowedBook.create({
      book_id: bookId,
      borrower_id: borrowerId,
      due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // Set due date to 14 days from now
    });

    // Update book availability
    await Book.update(
      { isAvailable: false },
      { where: { id: bookId } }
    );

    return borrowedBook;
  } catch (error) {
    throw error; // Rethrow the error to be handled in the controller
  }
};

// Return a book
const returnBook = async (borrowedBookId) => {
  try {
    // Find the borrowed book
    const borrowedBook = await BorrowedBook.findByPk(borrowedBookId);
    if (!borrowedBook) {
      throw new Error('Borrowed book not found');
    }

    // Update the borrowed book record
    await borrowedBook.update({ is_return: true, return_date: new Date() });

    // Update book availability
    await Book.update(
      { isAvailable: true },
      { where: { id: borrowedBook.book_id } }
    );
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to be handled in the controller
  }
};

// Get borrowed books for a borrower
const getBorrowedBooks = async (borrowerId) => {
  try {
    return await BorrowedBook.findAll({
      where: { borrower_id: borrowerId, is_return: false },
      include: [Book], // Include book details
    });
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to be handled in the controller
  }
};

// Get overdue books
const getOverdueBooks = async () => {
  try {
    return await BorrowedBook.findAll({
      where: {
        is_return: false,
        due_date: { [Sequelize.Op.lt]: new Date() },
      },
      include: [Book, User], // Include book and borrower details
    });
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to be handled in the controller
  }
};

module.exports = {
    checkoutBook,
    returnBook,
    getBorrowedBooks,
    getOverdueBooks
};
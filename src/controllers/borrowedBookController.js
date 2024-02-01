const express = require('express');
const borrowedBookService = require('../services/borrowedBookService');

// Check out a book
const checkoutBook = async (req, res) => {
  try {
    const { bookId, borrowerId } = req.body;
    const borrowedBook = await borrowedBookService.checkoutBook(bookId, borrowerId);
    res.status(200).json({ message: 'Book checked out successfully', borrowedBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error checking out book' });
  }
};

// Return a book
const returnBook = async (req, res) => {
  try {
    const { borrowedBookId } = req.body;
    await borrowedBookService.returnBook(borrowedBookId);
    res.status(200).json({ message: 'Book returned successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error returning book' });
  }
};

// Get borrowed books for a borrower
const getBorrowedBooks = async (req, res) => {
  try {
    const { borrowerId } = req.params;
    const borrowedBooks = await borrowedBookService.getBorrowedBooks(borrowerId);
    res.status(200).json({ message: 'Borrowed book returned successfully' ,data: borrowedBooks});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching borrowed books' });
  }
};

// Get overdue books
const getOverdueBooks = async (req, res) => {
  try {
    const overdueBooks = await borrowedBookService.getOverdueBooks();
    res.status(200).json({ message: 'Overdue book returned successfully' ,data: overdueBooks});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching overdue books' });
  }
};

module.exports = {
    checkoutBook,
    returnBook,
    getBorrowedBooks,
    getOverdueBooks
};
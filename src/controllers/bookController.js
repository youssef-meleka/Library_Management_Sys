const express = require('express');
const bookServices = require('../services/bookServices');

const get_all_books = async (req, res) => {
    try {
        const books = await bookServices.get_all_books();
        res.status(200).json({status: 'Success', message: 'Retrieve all books successfully', data: books});
    } catch (error) {
        res.status(500).json({status: 'Failure', message: 'Faild to get all books', data: error});
    }
};

const create_book = async (req, res) => {
    try {
        const data = req.body;
        const new_book = await bookServices.create_book(data);
        res.status(200).json({status: 'Success', message: 'Creating new book successfully', data: new_book});
    } catch (error) {
        res.status(500).json({status: 'Failure', message: 'Faild to create new book', data: error});
    }
};

const search_for_book = async (req, res) => {

    try {
        const { searchTerm } = req.query;
        const books = await bookServices.search_for_book(searchTerm);
        res.status(200).json({ status: 'Success', message: 'Books found', data: books });

    } catch (error) {
        res.status(500).json({ status: 'Failure', message: 'Error searching books' });
    }
};

const update_book = async (req, res) => {

    try {
        const id = req.params.id
        const { title, author, isbn, availableQuantity, shelfLocation } = req.body;
    
        const updatedBook = await bookServices.update_book(id, title, author, isbn, availableQuantity, shelfLocation);
    
        res.status(200).json({ status: 'Success',message: 'Book updated successfully', data: updatedBook });
    } catch (error) {
        console.log(error);

        res.status(500).json({status: 'Failure', message: 'Error updating book', data: error });
    }

};

const delete_book = async (req, res) => {

    try {
        const { id } = req.params;
    
        await bookServices.delete_book(id);
        res.status(200).json({ status: 'Success', message: 'Book deleted successfully' });

    } catch (error) {
        res.status(500).json({ status: 'Failure',message: 'Error deleting book' });
    }

};

module.exports = {
    get_all_books,
    create_book,
    search_for_book,
    update_book,
    delete_book
};
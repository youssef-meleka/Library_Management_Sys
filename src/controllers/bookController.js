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

const get_book_by_id = async (req, res) => {
    try {
        const id = req.params.id
        const book = await bookServices.get_book_by_id(id);
        if (book) {
            res.status(200).json({status: 'Success', message: 'Retrieve book successfully', data: book});
        } else {
            res.status(500).json({status: 'Failure', message: 'Please enter valid id'});
        }
    } catch (error) {
        res.status(500).json({status: 'Failure', message: 'Faild to get this treatment', data: error});
    }
};

const update_book = async (req, res) => {};

const delete_book = async (req, res) => {};

module.exports = {
    get_all_books,
    create_book,
    get_book_by_id,
    update_book,
    delete_book
};
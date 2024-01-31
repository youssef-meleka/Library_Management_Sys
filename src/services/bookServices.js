const express = require('express');
const book = require('../models/bookModel');

const get_all_books = async () => {
    try {
        const result = await book.findAll({});
        return result;
    } catch (error) {
        throw error;
    }
};

const create_book = async (data) => {
    try {
        console.log('inside service');
        const result = await book.create(data);
        console.log('in service result after book creation: ', result);
        return result;
    } catch (error) {
        throw error;
    }
};

const get_book_by_id = async (id) => {
    try {
        const result = await book.findOne({where: {id}});
        return result;
    } catch (error) {
        return false;
    }
};

const update_book = async () => {};

const delete_book = async () => {};

module.exports = {
    get_all_books,
    create_book,
    get_book_by_id,
    update_book,
    delete_book
};
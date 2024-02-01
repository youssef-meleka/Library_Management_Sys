const express = require('express');
const book = require('../models/bookModel');
const { Op } = require('sequelize');

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
        const result = await book.create(data);
        return result;
    } catch (error) {
        throw error;
    }
};

const search_for_book = async (searchTerm) => {
    
    try {
        const where = {
          [Op.or]: [
            { title: { [Op.like]: `%${searchTerm}%` } },
            { author: { [Op.like]: `%${searchTerm}%` } },
            { isbn: searchTerm },
          ],
        };
    
        const books = await book.findAll({ where });
        return books;
    } catch (error) {
        throw new Error('Failed to search books');
    }

};

const update_book = async (id, title, author, isbn, availableQuantity, shelfLocation) => {

    try {
        await book.update(
          {
            title: title,
            author: author,
            isbn: isbn,
            available_quantity: availableQuantity,
            shelf_location: shelfLocation,
          },
          { where: { id: id } }
        );
        console.log("in service after updateing book");

        const updatedBook = await book.findByPk(id);
        console.log("in service updated book: ", updatedBook);
        return updatedBook;
    } catch (error) {
        throw new Error('Failed to update book');
    }

};

const delete_book = async (id) => {

    try {
        await book.destroy({ where: { id: id } });
    } catch (error) {
        throw new Error('Failed to delete book');
    }

};

module.exports = {
    get_all_books,
    create_book,
    search_for_book,
    update_book,
    delete_book
};
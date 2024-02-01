const express = require('express');
const borrowerServices = require('../services/borrowerServices');

const get_all_borrowers = async (req, res) => {
    try {
        const books = await borrowerServices.get_all_borrowers();
        res.status(200).json({status: 'Success', message: 'Retrieve all borrowers successfully', data: books});
    } catch (error) {
        res.status(500).json({status: 'Failure', message: 'Faild to get all borrowers', data: error});
    }
};

const create_borrower = async (req, res) => {

    try {
        const { name, email, registereddate } = req.body;
    
        // Format registeredDate to 'YYYY-MM-DD HH:mm:ss'
        const formattedRegisteredDate = new Date(registereddate).toISOString().slice(0, 19).replace('T', ' ');
    
        const new_borrower = await borrowerServices.create_borrower({
          name,
          email,
          registereddate: formattedRegisteredDate,
        });
    
        res.status(200).json({
          status: 'Success',
          message: 'Creating new borrower successfully',
          data: new_borrower,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
          status: 'Failure',
          message: 'Failed to create new borrower',
          data: error.message, 
        });
    }
};

const update_borrower= async (req, res) => {

    try {
        console.log("in controller");
        const id = req.params.id
        const { name, email, registereddate } = req.body;
        const updatedBook = await borrowerServices.update_borrower(id, name, email, registereddate);
        res.status(200).json({ status: 'Success',message: 'borrower updated successfully', data: updatedBook });
    
    } catch (error) {
        res.status(500).json({status: 'Failure', message: 'Error updating borrower', data: error.message });
    }

};

const delete_borrower = async (req, res) => {

    try {
        const { id } = req.params;
    
        await borrowerServices.delete_borrower(id);
        res.status(200).json({ status: 'Success', message: 'Borrower deleted successfully' });

    } catch (error) {
        res.status(500).json({ status: 'Failure',message: 'Error deleting borrower' });
    }

};

module.exports = {
    get_all_borrowers,
    create_borrower,
    update_borrower,
    delete_borrower
};
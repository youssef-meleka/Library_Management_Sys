const express = require('express');
const borrower = require('../models/borrowerModel');

const get_all_borrowers = async () => {
    try {
        const result = await borrower.findAll({});
        return result;
    } catch (error) {
        throw error;
    }
};

const create_borrower = async ({ name, email, registereddate }) => {

    try {
        const result = await borrower.create({
          name,
          email,
          registereddate,
        });
        return result;

    } catch (error) {
        throw new Error(`Failed to create borrower: ${error.message}`);
    }
};

const update_borrower = async (id, name, email, registereddate) => {

    try {
        await borrower.update(
          {
            name: name,
            email: email,
            registereddate: registereddate,
          },
          { where: { id: id } }
        );
        const updatedBorrower = await borrower.findByPk(id);
        return updatedBorrower;

    } catch (error) {
        throw error;
    }

};

const delete_borrower = async (id) => {

    try {
        await borrower.destroy({ where: { id: id } });
    } catch (error) {
        throw new Error('Failed to delete borrower');
    }

};

module.exports = {
    get_all_borrowers,
    create_borrower,
    update_borrower,
    delete_borrower
};
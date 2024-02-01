const { DataTypes } = require('sequelize');
const connect_db = require('../db_config');
const db_client = connect_db();
const Book = require('./bookModel');
const Borrower = require('./borrowerModel');

const BorrowedBook = db_client.define('borrowedbooks',
  {
    id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    book_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      references: {
        model: Book,
        key: 'id',
      },
      allowNull: false,
      validate: {
        notNull: { msg: 'Please provide book_id for a bowrrowed book.' },
      },
    },
    borrower_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      references: {
        model: Borrower,
        key: 'id',
      },
      allowNull: false,
      validate: {
        notNull: { msg: 'Please provide borrower_id for a bowrrowed book.' },
      },
    },
    return_date: {
      type: DataTypes.DATE,
    },
    is_return: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please provide due_date for a bowrrowed book.' },
      },
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: 'borrowedbooks'
  }
);
BorrowedBook.belongsTo(Book, {
  foreignKey: 'book_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

BorrowedBook.belongsTo(Borrower, {
  foreignKey: 'borrower_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

module.exports = BorrowedBook;
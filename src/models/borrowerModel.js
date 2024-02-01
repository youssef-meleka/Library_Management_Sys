const {DataTypes} = require('sequelize');
const connect_db = require('../db_config');
const db_client = connect_db();
const Sequelize = require('sequelize');


const Borrower = db_client.define('borrowers',{
    id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Name is required.' },
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: 'Email is required.' },
          isEmail: { msg: 'Invalid email format.' },
        },
    },
    registereddate: {
        type: DataTypes.STRING,  // to avoid timezone problems
    },
},
{

    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: 'borrowers'
}
);




module.exports = Borrower;
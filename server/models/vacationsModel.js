const Sequelize = require('sequelize');
const sequelizeDBConnection = require('../utils/database')

const vacationsModel = sequelizeDBConnection.define('vacations', {
    id: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        primaryKey: true,
    },
    destination: {
        type: Sequelize.STRING,
        allowNull: false
    
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
   
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
   
    },
    startDate: {
        type: Sequelize.STRING,
        allowNull: false
    
    },
    endDate: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.STRING,
        allowNull: false
    } ,
    followers: {
        type: Sequelize.STRING,
        allowNull: true
    } 
}, {

    charset: 'utf8',
    collate: 'utf8_general_ci',
});

module.exports = vacationsModel;
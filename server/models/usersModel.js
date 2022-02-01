const Sequelize = require('sequelize');
const sequelize = require('../utils/database')

const usersModel = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  role: {
    type: Sequelize.INTEGER(11),
    allowNull: true
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  sureName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  } 
});
module.exports = usersModel;




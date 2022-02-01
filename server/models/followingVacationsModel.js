const Sequelize = require('sequelize');
const sequelize = require('../utils/database')

const followingVacationsModel = sequelize.define('followingVacations', {
  id: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: Sequelize.INTEGER(11),
    allowNull: false
  },
  vacationId: {
    type: Sequelize.INTEGER(11),
    allowNull: false
  }
});
module.exports = followingVacationsModel;

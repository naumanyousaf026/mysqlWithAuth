const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('TESTDB', 'root', 'Nomikhan@1122', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;

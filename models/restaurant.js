const Sequelize = require('sequelize');

const db = require('./_db');

const Hotel = db.define('restaurant', {
  name: Sequelize.STRING,
  cuisine: Sequelize.STRING,
  price: Sequelize.INTEGER
});

module.exports = Hotel;

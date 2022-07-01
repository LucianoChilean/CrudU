const Sequelize = require('sequelize');

const db = new Sequelize(
    'yt',
    'root',
    '',{
    host: 'localhost',
    dialect: 'mysql',
    //loggging: false
})

module.exports = db;
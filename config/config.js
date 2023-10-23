const {Sequelize} = require("sequelize");
require('dotenv').config();

const dbConfig = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    schema: process.env.DB_SCHEMA,
}
const sequelize = new Sequelize(dbConfig);

module.exports = {
    development: dbConfig,
    sequelize
};



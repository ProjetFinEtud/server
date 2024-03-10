

const { Sequelize } = require("sequelize");
const dbConfig = require("./db");
console.log("variable d'environnement ! ")
console.log(process.env.DB)

const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: "mysql",
});

module.exports = sequelize;


// Configuration de la base de données MySQL
module.exports = {
  HOST: "mysql-masteregel.alwaysdata.net",
  USER: "350248",
  PASSWORD: "MasterEgel2024!",
  DB: "masteregel_db",
};

const { Sequelize } = require("sequelize");
const dbConfig = require("./db");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: "mysql",
});

module.exports = sequelize;


// Configuration de la base de données MySQL
module.exports = {
  HOST: "us-cluster-east-01.k8s.cleardb.net",
  USER: "be289f818608f1",
  PASSWORD: "bacda800",
  DB: "heroku_61772d7d84193e5",
};

const { Sequelize } = require("sequelize");
const dbConfig = require("./db");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: "mysql",
});

module.exports = sequelize;


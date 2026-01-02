const Sequelize = require("sequelize");
//import Sequelize from "sequelize";

// Use diretamente a URL de conexão completa, se estiver no Railway
const sequelize = new Sequelize(
    process.env.DATABASE_URL
);

module.exports = { sequelize, Sequelize };
//export default sequelize;
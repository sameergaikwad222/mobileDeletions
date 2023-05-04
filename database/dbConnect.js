const { Sequelize } = require("sequelize");
const { config } = require("../config/index");

const sequelize = new Sequelize(config.DBURL, {
  logging: false,
});

async function dbConnect() {
  try {
    await sequelize.authenticate();
    console.log("Database Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = { dbConnect, sequelize };

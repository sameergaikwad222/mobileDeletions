const { Sequelize } = require("sequelize");
const config = require("../config/config.json")[process.env.NODE_ENV || "dev"];
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

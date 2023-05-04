const config = require("./config.json")[process.env.NODE_ENV || "dev"];
module.exports = { config };

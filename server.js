const express = require("express");
const app = express();
const user = require("./router/user");
const { config } = require("./config/index");
const { dbConnect } = require("./database/dbConnect");
const { connectRabbit } = require("./Queues/connectRabbit");
app.use("/user", user);

var queueChannel;
app.listen(config.PORT || 3000, async () => {
  try {
    await dbConnect();
  } catch (error) {
    console.log(`Unable to connect to database. Error > : ${error}`);
    console.log("Closing an App.");
    process.exit(1);
  }

  console.log(`App is running on localhost:${config.PORT}`);
});

module.exports = { queueChannel };

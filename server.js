const express = require("express");
const app = express();
const user = require("./router/user");
const config = require("./config/config.json")[process.env.NODE_ENV || "dev"];
const { dbConnect } = require("./database/dbConnect");
app.use("/user", user);

app.listen(config.PORT || 3000, async () => {
  try {
    const resp = await dbConnect();
  } catch (error) {
    console.log(`Unable to connect to database. Error > : ${error}`);
    console.log("Closing an App.");
    process.exit(1);
  }

  console.log(`App is running on localhost:${config.PORT}`);
});

app.get("/", (req, res) => {
  res.send("GET request to the homepage");
});

const express = require("express");
const router = express.Router();
const { parse } = require("csv-parse");
const fs = require("fs");
const { sequelize } = require("../database/dbConnect");
const parser = parse({ delimiter: "," });

router.get("/mobile/:mobNo", async (req, res) => {
  try {
    let { mobNo } = req.params;
    mobNo = +mobNo;

    //Search for user against mobile
    const [res1, meta] = await sequelize.query(
      `select * from kyc where mobile='${mobNo}';`
    );
    let user = res1[0];

    //Delete user if found..

    if (user) {
      // -------*****************Delete the user data*************---------------------
      const [_, metadata] = await sequelize.query(
        `delete from kyc where mobile='${user.mobile}';`
      );

      if (metadata.rowCount > 0) {
        res.send({
          status: "success",
          userdata: user,
          rowDeleted: metadata.rowCount,
          command: metadata.command,
          message: `${user.mobile} user details deleted Successfully !`,
        });
      } else {
        res.send({
          status: "fail",
          userdata: user,
          rowCount: metadata.rowCount,
          command: metadata.command,
          message: `${user.mobile} user details could not be deleted !`,
        });
      }
    } else {
      res.send({
        status: "fail",
        userdata: "",
        message: `${mobNo} user details not found !`,
      });
    }

    // user ? res.send(user) : res.send({ message: "No user found" });
  } catch (error) {
    res.status(500).send({
      status: "Fail",
      err: error.message,
    });
  }
});

router.get("/getMobiles/:count", async (req, res) => {
  try {
    const { count } = req.params;
    let = +count;
    let [mobiles, _] = await sequelize.query(
      `select mobile from kyc limit ${count}`
    );
    mobiles = mobiles.map((v) => v.mobile);
    res.status(200).send({ mobiles });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

module.exports = router;

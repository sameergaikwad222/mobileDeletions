const express = require("express");
const router = express.Router();
const { config } = require("../config/index");
const { sequelize } = require("../database/dbConnect");
const { pushToProcess } = require("../Queues/producer");
const { connectRabbit } = require("../Queues/connectRabbit");
const { logger } = require("../utility/logger");

router.get("/getMobiles/:count", async (req, res) => {
  try {
    let { count } = req.params;
    count = +count;
    let [mobiles, _] = await sequelize.query(
      `select mobile from kyc limit ${count}`
    );
    mobiles = mobiles.map((v) => +v.mobile);

    if (mobiles.length > 0) {
      //create rabbitmq connection
      const channelObject = await connectRabbit();
      const queueName = config.mobileDeletionQueue;
      await channelObject.assertQueue(queueName, {
        durable: true,
      });
      for (let i = 0; i < mobiles.length; i++) {
        pushToProcess(mobiles[i], queueName, channelObject);
      }
      res.status(200).send({ mobiles });
    } else {
      res.status(404).send({ msg: "No data found.." });
    }
  } catch (error) {
    logger.error(error);
    res.status(500).send({ error });
  }
});

module.exports = router;

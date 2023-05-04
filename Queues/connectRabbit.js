var amqp = require("amqplib");
const { config } = require("../config/index");
async function connectRabbit() {
  try {
    const connection = await amqp.connect(config.rabbit.url);
    console.log("RabbitMq Connected Successfully!");
    const channel = await connection.createChannel();
    return channel;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = { connectRabbit };

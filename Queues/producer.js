const { logger } = require("../utility/logger");

async function pushToProcess(data, queueName, channelObject) {
  try {
    channelObject.sendToQueue(queueName, Buffer.from(data + ""));
    logger.info(`${data} Message sent to Queue ${queueName}.`);
    console.log(`${data} Message sent to Queue ${queueName}.`);
  } catch (error) {
    logger.error(`Error sending message to Queue ${queueName}.`);
    throw error;
  }
}

module.exports = { pushToProcess };

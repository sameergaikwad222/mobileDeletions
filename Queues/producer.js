async function pushToProcess(data, queueName, channelObject) {
  try {
    channelObject.sendToQueue(queueName, Buffer.from(data + ""));
    console.log(`${data} Message sent to Queue ${queueName}.`);
  } catch (error) {
    throw error;
  }
}

module.exports = { pushToProcess };

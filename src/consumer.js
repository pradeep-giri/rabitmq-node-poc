const amqp = require('amqplib');

connect();
async function connect() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs");

        channel.consume("jobs", message => {
            let input = JSON.parse(message.content.toString());
            console.log(`Recived job with input ${input.number}`);

            if (input.number == 8) {
                channel.ack(message);
            }
        });

        console.log('Waiting for messages...');
    } catch (err) {
        console.error(err);
    }
}
const connectRabbitMQ = require("./config/rabbitmq");
const sendEmail = require("./Mailer/services/emailService");

const consumeQueue = async () => {
    const channel = await connectRabbitMQ();
    const queue = "email_queue";

    console.log("📥 Waiting for messages in", queue);

    channel.consume(queue, async (msg) => {
        if (msg !== null) {
            const emailData = JSON.parse(msg.content.toString());

            try {
                await sendEmail(emailData);
                channel.ack(msg); // Acknowledge message
            } catch (error) {
                channel.nack(msg); // Requeue message if failed
            }
        }
    });
};

// Start the consumer
consumeQueue();

import amqplib, { Channel } from "amqplib";

class RabbitMQ {
  private _channel?: Channel;

  get channel() {
    if (!this._channel)
      throw new Error("Cannot connect to rabbitmq exchange without a channel");

    return this._channel;
  }

  async connect() {
    const connection = await amqplib.connect(process.env.RABBITMQ_URL!);

    this._channel = await connection.createChannel();

    console.log(`Wallet service rabbitmq connection successful `);
  }
}

export const rabbitMQClient = new RabbitMQ();

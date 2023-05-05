import amqp, { Channel } from "amqplib";

class RabbitMQ {
  private _channel?: Channel;

  get channel() {
    if (!this._channel)
      throw new Error("Cannot connect rabbitmq exhange without a channel");

    return this._channel;
  }

  async connect() {
    const connection = await amqp.connect(process.env.RABBITMQ_URL!);

    this._channel = await connection.createChannel();

    console.log("User service rabbitmq connection succesful");
  }
}

export const rabbitMqClient = new RabbitMQ();

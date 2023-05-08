import amqplib, { Channel } from "amqplib";

class RabbitMQ {
  private _channel?: Channel;

  get channel() {
    if (!this._channel) throw new Error("Channel not created");

    return this._channel;
  }

  async connect() {
    const connection = await amqplib.connect(process.env.RABBITQM_URL!);

    this._channel = await connection.createChannel();

    console.log(`Product service rabbitmq connection successful`);
  }
}

export const rabbitMQClient = new RabbitMQ();

import {
  BaseListener,
  RoutingKey,
  ProductCreatedEvent,
} from "@greateki-ticket-ms-demo/ecommshared";
import { serviceQueueName } from "../queue-name";
import { ConsumeMessage } from "amqplib";
import prisma from "../../config/prisma-client";

export class ProductCreatedListener extends BaseListener<ProductCreatedEvent> {
  routingKey: RoutingKey.ProductCreated = RoutingKey.ProductCreated;
  QueueName: string = serviceQueueName;

  async onMessage(
    data: ProductCreatedEvent["message"],
    msg: ConsumeMessage
  ): Promise<void> {
    await prisma.product.create({
      data: { id: data.id, price: data.price, name: data.name },
    });

    this.channel.ack(msg);
  }
}

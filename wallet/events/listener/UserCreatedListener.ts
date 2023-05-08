import {
  BaseListener,
  UserCreatedEvent,
  RoutingKey,
} from "@greateki-ticket-ms-demo/ecommshared";
import { ConsumeMessage } from "amqplib";
import { serviceQueueName } from "../queue-name";
import prisma from "../../config/prisma-client";

export class UserCreatedListener extends BaseListener<UserCreatedEvent> {
  routingKey: RoutingKey.UserCreated = RoutingKey.UserCreated;
  QueueName: string = serviceQueueName;

  async onMessage(
    data: UserCreatedEvent["message"],
    msg: ConsumeMessage
  ): Promise<void> {
    await prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          ...data,
        },
      });

      await prisma.wallet.create({
        data: {
          user: {
            connect: { id: user.id },
          },
        },
      });
    });

    this.channel.ack(msg);
  }
}

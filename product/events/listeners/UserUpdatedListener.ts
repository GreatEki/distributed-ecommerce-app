import {
  BaseListener,
  RoutingKey,
  UserUpdatedEvent,
} from "@greateki-ticket-ms-demo/ecommshared";
import { serviceQueueName } from "../queue-name";
import { ConsumeMessage } from "amqplib";
import prisma from "../../config/prisma-client";

export class UserUpdatedListener extends BaseListener<UserUpdatedEvent> {
  routingKey: RoutingKey.UserUpdated = RoutingKey.UserUpdated;
  QueueName: string = serviceQueueName;

  async onMessage(
    data: UserUpdatedEvent["message"],
    msg: ConsumeMessage
  ): Promise<void> {
    const user = await prisma.user.findFirst({ where: { id: data.id } });

    if (!user) {
      // create user
      await prisma.user.create({
        data: {
          ...data,
        },
      });

      this.channel.ack(msg);
      return;
    }

    await prisma.user.update({
      where: { id: data.id },
      data: {
        ...data,
      },
    });

    this.channel.ack(msg);
  }
}

import {
  BaseListener,
  UserCreatedEvent,
  RoutingKey,
  UserType,
} from "@greateki-ticket-ms-demo/ecommshared";
import { serviceQueueName } from "../queue-name";
import { ConsumeMessage } from "amqplib";
import prisma from "../../config/prisma-client";

export class UserCreatedListener extends BaseListener<UserCreatedEvent> {
  routingKey: RoutingKey.UserCreated = RoutingKey.UserCreated;
  QueueName: string = serviceQueueName;

  async onMessage(
    data: UserCreatedEvent["message"],
    msg: ConsumeMessage
  ): Promise<void> {
    // create user
    await prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          id: data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          userType: data.userType,
        },
      });

      // create user cart
      await prisma.cart.create({
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

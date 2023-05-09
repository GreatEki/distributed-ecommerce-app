import {
  BaseListener,
  RoutingKey,
  UserCreatedEvent,
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
    // confirm user is customer
    if (!data.userType?.includes(UserType.CUSTOMER)) {
      this.channel.ack(msg);
      return;
    }

    await prisma.user.create({ data: { ...data } });

    this.channel.ack(msg);
  }
}

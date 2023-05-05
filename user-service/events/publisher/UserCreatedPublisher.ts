import {
  BasePublisher,
  RoutingKey,
  UserCreatedEvent,
} from "@greateki-ticket-ms-demo/ecommshared";

export class UserCreatedPublisher extends BasePublisher<UserCreatedEvent> {
  routingKey: RoutingKey.UserCreated = RoutingKey.UserCreated;
}

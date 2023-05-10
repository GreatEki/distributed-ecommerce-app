import {
  BasePublisher,
  RoutingKey,
  UserUpdatedEvent,
} from "@greateki-ticket-ms-demo/ecommshared";

export class UserUpdatedPublisher extends BasePublisher<UserUpdatedEvent> {
  routingKey: RoutingKey.UserUpdated = RoutingKey.UserUpdated;
}

import {
  BasePublisher,
  RoutingKey,
  ProductCreatedEvent,
} from "@greateki-ticket-ms-demo/ecommshared";

export class ProductCreatedPublisher extends BasePublisher<ProductCreatedEvent> {
  routingKey: RoutingKey.ProductCreated = RoutingKey.ProductCreated;
}

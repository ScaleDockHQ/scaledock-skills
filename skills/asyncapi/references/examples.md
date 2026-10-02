# AsyncAPI 3.1 examples

Read this when you need a complete document to start from. Both examples follow AsyncAPI 3.1.0.

## Event notification over Kafka

The application publishes an event when an order ships and consumes payment events.

```yaml
asyncapi: 3.1.0
id: urn:example:order-service
info:
  title: Order service
  version: 1.4.0
defaultContentType: application/json
servers:
  production:
    host: kafka.example.com:9093
    protocol: kafka
    security:
      - $ref: "#/components/securitySchemes/saslScram"
channels:
  orderShipped:
    address: orders.{region}.shipped
    parameters:
      region:
        enum: [eu, us]
        description: Region that shipped the order.
    messages:
      orderShipped:
        $ref: "#/components/messages/orderShipped"
  paymentCaptured:
    address: payments.captured
    messages:
      paymentCaptured:
        $ref: "#/components/messages/paymentCaptured"
operations:
  publishOrderShipped:
    action: send
    channel:
      $ref: "#/channels/orderShipped"
    messages:
      - $ref: "#/channels/orderShipped/messages/orderShipped"
  onPaymentCaptured:
    action: receive
    channel:
      $ref: "#/channels/paymentCaptured"
components:
  messages:
    orderShipped:
      name: OrderShipped
      correlationId:
        location: $message.header#/correlationId
      headers:
        type: object
        properties:
          correlationId:
            type: string
      payload:
        type: object
        required: [orderId, shippedAt]
        properties:
          orderId:
            type: string
          shippedAt:
            type: string
            format: date-time
    paymentCaptured:
      name: PaymentCaptured
      payload:
        type: object
        required: [orderId, amount]
        properties:
          orderId:
            type: string
          amount:
            type: number
  securitySchemes:
    saslScram:
      type: scramSha512
```

Note that the operation's `messages` references the message through the channel, so it stays a subset of the channel's messages (§ Operation Object).

## Request-reply with a dynamic reply address

The application receives a request and replies to the address in the request's `replyTo` header. The reply channel's address is unknown in advance, so it is `null` (§ Channel Object, § Operation Reply Object).

```yaml
asyncapi: 3.1.0
info:
  title: Price quote service
  version: 1.0.0
defaultContentType: application/json
servers:
  production:
    host: broker.example.com
    protocol: amqp
    protocolVersion: 0.9.1
channels:
  quoteRequests:
    address: quotes.requests
    messages:
      quoteRequest:
        payload:
          type: object
          required: [sku]
          properties:
            sku:
              type: string
  quoteReplies:
    address: null
    messages:
      quoteReply:
        payload:
          type: object
          required: [sku, price]
          properties:
            sku:
              type: string
            price:
              type: number
operations:
  replyToQuoteRequest:
    action: receive
    channel:
      $ref: "#/channels/quoteRequests"
    reply:
      address:
        location: $message.header#/replyTo
      channel:
        $ref: "#/channels/quoteReplies"
```

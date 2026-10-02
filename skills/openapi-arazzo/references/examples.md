# Complete examples

Each example is a valid Arazzo 1.1 document shape. Section numbers are from Arazzo 1.1.0.

## Log in, then fetch with the token

```yaml
arazzo: 1.1.0
info:
  title: Order lookup
  version: 1.0.0
sourceDescriptions:
  - name: shop
    url: ./openapi.yaml
    type: openapi
workflows:
  - workflowId: getOrderAfterLogin
    summary: Log in and read one order.
    inputs:
      type: object
      required: [username, password, orderId]
      properties:
        username:
          type: string
        password:
          type: string
          format: password
        orderId:
          type: string
    steps:
      - stepId: login
        operationId: createSession
        requestBody:
          contentType: application/json
          payload:
            username: $inputs.username
            password: $inputs.password
        successCriteria:
          - condition: $statusCode == 201
        outputs:
          token: $response.body#/accessToken
      - stepId: getOrder
        operationId: getOrder
        parameters:
          - name: orderId
            in: path
            value: $inputs.orderId
          - name: Authorization
            in: header
            value: Bearer {$steps.login.outputs.token}
        successCriteria:
          - condition: $statusCode == 200
        outputs:
          status: $response.body#/status
    outputs:
      orderStatus: $steps.getOrder.outputs.status
```

Steps run in order; `getOrder` reads `login`'s output, which is also an implicit dependency (§ 5.8.5.2.4). With one source description, plain `operationId`s are allowed (§ 5.8.5.1).

## Create, then poll until done

```yaml
arazzo: 1.1.0
info:
  title: Export
  version: 1.0.0
sourceDescriptions:
  - name: reports
    url: https://api.example.com/openapi.yaml
    type: openapi
workflows:
  - workflowId: runExport
    steps:
      - stepId: startExport
        operationId: createExport
        successCriteria:
          - condition: $statusCode == 202
        outputs:
          exportId: $response.body#/id
      - stepId: checkExport
        operationId: getExport
        parameters:
          - name: exportId
            in: path
            value: $steps.startExport.outputs.exportId
        successCriteria:
          - condition: $statusCode == 200
          - condition: $response.body.state == 'done'
        onFailure:
          - name: stillRunning
            type: retry
            retryAfter: 5
            retryLimit: 20
            criteria:
              - condition: $response.body.state == 'running'
        outputs:
          downloadUrl: $response.body#/downloadUrl
    outputs:
      downloadUrl: $steps.checkExport.outputs.downloadUrl
```

While the export is running, the success criteria fail and the retry action runs, at most 20 times, 5 seconds apart (§ 5.8.8.1). Any other failure ends the workflow (§ 5.8.5.1).

## Two sources and a reusable action

```yaml
arazzo: 1.1.0
info:
  title: Checkout
  version: 1.0.0
sourceDescriptions:
  - name: cart
    url: ./cart.openapi.yaml
    type: openapi
  - name: payments
    url: ./payments.openapi.yaml
    type: openapi
workflows:
  - workflowId: checkout
    inputs:
      type: object
      required: [cartId]
      properties:
        cartId:
          type: string
    failureActions:
      - reference: $components.failureActions.retryUnavailable
    steps:
      - stepId: readCart
        operationId: $sourceDescriptions.cart.getCart
        parameters:
          - name: cartId
            in: path
            value: $inputs.cartId
        successCriteria:
          - condition: $statusCode == 200
        outputs:
          total: $response.body#/total
      - stepId: pay
        operationId: $sourceDescriptions.payments.createPayment
        requestBody:
          contentType: application/json
          payload:
            amount: $steps.readCart.outputs.total
            reference: $inputs.cartId
        successCriteria:
          - condition: $statusCode == 201
components:
  failureActions:
    retryUnavailable:
      name: retryUnavailable
      type: retry
      retryAfter: 1
      retryLimit: 3
      criteria:
        - condition: $statusCode == 503
```

With two OpenAPI sources, each `operationId` names its source (§ 5.8.5.1). The workflow-level failure action applies to both steps (§ 5.8.4.1).

## Call another workflow

```yaml
steps:
  - stepId: lookupOrder
    workflowId: getOrderAfterLogin
    parameters:
      - name: username
        value: $inputs.username
      - name: password
        value: $inputs.password
      - name: orderId
        value: $inputs.orderId
    outputs:
      status: $workflows.getOrderAfterLogin.outputs.orderStatus
```

Parameters on a `workflowId` step map to the target workflow's inputs and have no `in` (§ 5.8.6.1). To call a workflow in another Arazzo document, list that document as a `type: arazzo` source and use `$sourceDescriptions.<name>.<workflowId>` (§ 5.8.5.1).

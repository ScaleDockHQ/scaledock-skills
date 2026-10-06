# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Payment Request API

Source: https://www.w3.org/TR/payment-request/

This specification standardizes an API to allow merchants (i.e. web sites selling physical or digital goods) to utilize one or more payment methods with minimal integration. User agents (e.g., browsers) facilitate the payment flow between merchant and user.

- **3.1.** The PaymentRequest( methodData , details , options ) constructor MUST act as follows: If this 's relevant global object 's associated Document is not allowed to use the "payment" permission, then throw a " SecurityError " DOMException .
- **3.3.** The show(optional detailsPromise ) method MUST act as follows: Let request be this .
- **3.3.** The user agent SHOULD prioritize the user's preference when presenting payment methods.
- **3.3.** The user interface SHOULD be presented using the language and locale-based formatting that matches the document 's document element's language , if any, or an appropriate fallback if that is not available.
- **3.3.** Optionally, the user agent SHOULD send the appropriate data from request to the
- **3.4.** The abort () method MUST act as follows: Let request be this .
- **3.5.** The canMakePayment () method MUST run the can make payment algorithm .
- **9..** requestBillingAddress member A boolean that indicates whether the user agent SHOULD collect and return the billing address associated with a payment method (e.g., the billing address associated with a credit card).

## Payment Method Identifiers

Source: https://www.w3.org/TR/payment-method-id/

This specification defines payment method identifiers and how they are validated, and, where applicable, minted and formally registered with the W3C . Other specifications (e.g., the Payment Request API ) make use of these identifiers to facilitate monetary transactions on the web platform.

- **1.1.** Validity Specifications that rely on payment method identifiers MUST specify their own rules for handling invalid payment method identifiers.
- **2.2.** Comparison User agents MUST perform comparisons of URL-based payment method identifiers using [ URL ]'s equal .
- **3.2.** Comparison For standardized payment method identifiers , user agents MUST perform string comparisons using is .
- **8. Conformance.** The key words MAY , MUST , and OPTIONAL in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.

## Web-based Payment Handler API

Source: https://www.w3.org/TR/web-based-payment-handler/

This specification defines capabilities that enable Web applications to handle requests for payment.

- **5.3.** Handling a CanMakePaymentEvent Upon receiving a PaymentRequest , the user agent MUST run the following steps: If user agent settings prohibit usage of CanMakePaymentEvent (e.g., in private browsing mode), terminate these steps.
- **6.3.15.** MethodData Population Algorithm To initialize the value of the methodData , the user agent MUST perform the following steps or their equivalent: Let registeredMethods be the set of registered payment method identifier s of the invoked web-based payment handler.
- **6.3.16.** Modifiers Population Algorithm To initialize the value of the modifiers , the user agent MUST perform the following steps or their equivalent: Let registeredMethods be the set of registered payment method identifier s of the invoked web-based payment handler.
- **6.5.** Handling a PaymentRequestEvent Upon receiving a PaymentRequest by way of PaymentRequest.show() and subsequent user selection of a web-based payment handler, the user agent MUST run the following steps: Let registration be the ServiceWorkerRegistration corresponding to the web-based payment handler selected by the user.
- **7..** Note Since user agents know that this method is connected to the PaymentRequestEvent , they SHOULD render the window in a way that is consistent with the flow and not confusing to the user.
- **7..** A single Web-based payment handler SHOULD NOT be allowed to open more than one client window using this method.
- **8.2.** Change Payment Method Algorithm When this algorithm is invoked with methodName and methodDetails parameters, the user agent MUST run the following steps: Run the payment method changed algorithm with PaymentMethodChangeEvent event constructed using the given methodName and methodDetails parameters.
- **8.3.** Change Payment Details Algorithm When this algorithm is invoked with shippingAddress or shippingOption the user agent MUST run the following steps: Run the PaymentRequest updated algorithm with PaymentRequestUpdateEvent event constructed using the updated details ( shippingAddress or shippingOption ).

import { Client, Config, CheckoutAPI, hmacValidator } from "@adyen/api-library";
import { NextResponse } from "next/server";

// Initialize configuration outside the function to avoid re-creating on each request
const config = new Config();
// config.apiKey = process.env.ADYEN_API_KEY;
config.apiKey = "AQEohmfuXNWTK0Qc+iSWnXY9tPC3SZxDW8YYqk75XGyE6jUFlWktkFQgHhDBXVsNvuR83LVYjEgiTGAH-ggABljv3OSam4ELydVQzqJjoZjdsQAKJWGW47U3qli0=-i1iF)e]6mDA4z^a?):(";
config.environment = "TEST"; // Use 'LIVE' for production
const client = new Client({ config });
client.setEnvironment("TEST");
const checkout = new CheckoutAPI(client);
const validator = new hmacValidator();

// const merchantAccount = process.env.ADYEN_MERCHANT_ACCOUNT;
const merchantAccount = "ForestLawn652ECOM";

export async function POST(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  

// YOUR_HMAC_KEY from the Customer Area
// const hmacKey = "32E990A5A7DBBC6156B25046ABE6BDB72E456FEE900C54EF575717AA875FB56B";
// const validator = new hmacValidator()
// // Notification Request JSON
// const notificationRequest = NOTIFICATION_REQUEST_JSON;
// const notificationRequestItems = notificationRequest.notificationItems
// // Handling multiple notificationRequests
// notificationRequestItems.forEach(function(notificationRequestItem) {
//     // Handle the notification
//     if( validator.validateHMAC(notificationRequestItem, hmacKey) ) {
//         // Process the notification based on the eventCode
//         const eventCode = notificationRequestItem.eventCode;
//         console.log(eventCode);

//     } else {
//         // Non valid NotificationRequest
//         console.log("Non valid NotificationRequest");
//     }
// });

// Handling webhook notifications
// console.log(req.body);
// console.log("webhook func");
const notificationRequestItems = req.body.notificationItems;
const notificationRequestItem = notificationRequestItems[0]?.NotificationRequestItem;

// Validate HMAC signature
if (!validator.validateHMAC(notificationRequestItem, "32E990A5A7DBBC6156B25046ABE6BDB72E456FEE900C54EF575717AA875FB56B")) {
  return res.status(401).send("Invalid HMAC signature");
}

// Process the event based on the eventCode
if (notificationRequestItem.success === "true") {
  const { eventCode, merchantReference, pspReference, additionalData } = notificationRequestItem;
  const payment = paymentStore[merchantReference] || findPayment(pspReference);

  if (payment) {
    if (eventCode === "AUTHORISATION") {
      payment.status = "Authorised";
      payment.paymentRef = pspReference;
    } else if (eventCode === "CANCEL_OR_REFUND") {
      const modificationAction = additionalData?.["modification.action"];
      payment.status = modificationAction === "refund" ? "Refunded" : "Cancelled";
    }
  }
}


}

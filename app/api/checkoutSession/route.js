import { Client, Config, CheckoutAPI } from "@adyen/api-library";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const config = new Config();
  const body = await req.json();
  console.log({ body });
  config.apiKey = process.env.ADYEN_API_KEY;
  config.environment = "TEST";
  const client = new Client({ config });
  client.setEnvironment("TEST"); // Use 'LIVE' for production
  const checkout = new CheckoutAPI(client);
  const merchantAccount = process.env.ADYEN_MERCHANT_ACCOUNT;
  console.log({ merchantAccount });
  const uniqueOrderNumber = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  console.log({ uniqueOrderNumber });
  const paymentRequest = {
    amount: body.amount,
    reference: `Your order number ${uniqueOrderNumber}`,
    paymentMethod: body.paymentMethod,
    recurringProcessingModel: "CardOnFile",
    returnUrl: "http://localhost.com",
    merchantAccount: process.env.ADYEN_MERCHANT_ACCOUNT,
    billingAddress: body.billingAddress,
    shopperEmail: body.shopperEmail,
    shopperName: body.shopperName,
    additionalData: {
      "account.number": body.accountNumber,
      "contract.name": body.nameOnContract,
    },
  };
  console.log({ paymentRequest });

  try {
    const paymentResponse = await checkout.PaymentsApi.payments(paymentRequest);
    console.log({ paymentResponse });

    // Check the resultCode to determine if the payment is authorised or refused
    const { resultCode } = paymentResponse;

    if (resultCode === "Authorised") {
      return NextResponse.json({
        message: "Payment authorised",
        paymentResponse,
      });
    } else if (resultCode === "Refused") {
      return NextResponse.json({
        message: "Payment refused",
        paymentResponse,
      });
    } else {
      return NextResponse.json({
        message: "Payment not authorised",
        resultCode,
        paymentResponse,
      });
    }
  } catch (error) {
    console.error("Payment error:", error);
    return NextResponse.json({
      message: "Payment error",
      error: error.message,
    });
  }
}

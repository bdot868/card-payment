// pages/api/checkoutSession.js

import { Client, Config, CheckoutAPI } from "@adyen/api-library";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const config = new Config();
  config.apiKey = process.env.ADYEN_API_KEY;
  const client = new Client({ config });
  client.setEnvironment("TEST"); // Use 'LIVE' for production
  const checkout = new CheckoutAPI(client);

  const paymentRequest = {
    amount: { currency: "USD", value: 1000 }, // Example amount in minor units
    reference: "YOUR_ORDER_REFERENCE",
    paymentMethod: req.body.paymentMethod,
    returnUrl: "https://your-website.com/checkout",
    merchantAccount: process.env.ADYEN_MERCHANT_ACCOUNT,
  };

  try {
    const paymentResponse = await checkout.payments(paymentRequest);
    console.log({paymentResponse});
    console.log({ data });
    return NextResponse.json(paymentResponse);
  } catch (error) {
    return NextResponse.json(error);
  }
}

"use client";
// components/CombinedForm.js
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaRegCalendarDays } from "react-icons/fa6";
import { AdyenCheckout } from "@adyen/adyen-web";
import Review from "./Review";
import Link from "next/link";

// Validation schema
const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  streetAddress: yup.string().required("Street Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zip: yup
    .string()
    .required("Zip Code is required")
    .matches(/^\d{5}$/, "Invalid Zip Code"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d{3}-\d{3}-\d{4}$/, "Invalid phone number"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
  confirmEmail: yup
    .string()
    .oneOf([yup.ref("email"), null], "Emails must match"),
  cardType: yup.string().required("Card Type is required"),
  cardNumber: yup
    .string()
    .required("Card Number is required")
    .matches(/^\d{16}$/, "Card Number must be 16 digits"),
  expirationDate: yup
    .string()
    .required("Expiration Date is required")
    .matches(
      /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/,
      "Invalid expiration date"
    ),
  securityCode: yup
    .string()
    .required("Security Code is required")
    .matches(/^\d{3}$/, "Security Code must be 3 digits"),
  paymentAmount: yup
    .number()
    .required("Payment Amount is required")
    .positive("Payment Amount must be a positive number")
    .typeError("Payment Amount must be a number"),
  accountNumber: yup
    .string()
    .required("Account Number is required")
    .matches(/^\d+$/, "Invalid Account Number"),
  reEnterAccountNumber: yup
    .string()
    .oneOf([yup.ref("accountNumber"), null], "Account Numbers must match")
    .required("Re-enter Account Number is required"),
  nameOnContract: yup.string().required("Name on Contract is required"),
});

const Main = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [checkout, setCheckout] = useState(null);
  const [steps, setSteps] = useState(0);
  const [formData, setFormData] = useState({});
  const [response, setResponse] = useState({});

  useEffect(() => {
    const initCheckout = async () => {
      const script = document.createElement("script");
      script.src =
        "https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/5.0.0/adyen.js";
      script.async = true;
      script.onload = async () => {
        const configuration = {
          clientKey: process.env.NEXT_PUBLIC_ADYEN_CLIENT_KEY,
          locale: "en-US",
          environment: process.env.NEXT_PUBLIC_ADYEN_ENVIRONMENT,
          countryCode: "US",
          paymentMethodsResponse: {}, // Will be fetched below
        };
        const checkoutInstance = await new window.AdyenCheckout(configuration);
        console.log({ checkoutInstance });
        setCheckout(checkoutInstance);
      };
      document.body.appendChild(script);
    };
    initCheckout();
  }, []);

  const onSubmit = async (formData) => {
    // Check if checkout instance is ready
    if (!checkout) {
      console.error("Checkout instance is not ready.");
      return;
    }

    try {
      // Prepare payment method data
      const paymentMethod = {
        type: "scheme",
        encryptedCardNumber: `test_${formData.cardNumber}`,
        encryptedExpiryMonth: `test_${formData.expirationDate.split("/")[0]}`,
        encryptedExpiryYear: `test_${formData.expirationDate.split("/")[1]}`, // Assuming YY format
        encryptedSecurityCode: `test_${formData.securityCode}`,
        holderName: `${formData.firstName} ${formData.lastName}`,
      };
      console.log({ paymentMethod });

      // Prepare the billing address data
      const billingAddress = {
        city: formData.city,
        country: "US", // Assuming country is US
        houseNumberOrName: formData.streetAddress,
        postalCode: formData.zip,
        stateOrProvince: formData.state,
        street: formData.streetAddress,
      };

      // Send the payment data to API
      const res = await fetch("/api/checkoutSession", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentMethod: paymentMethod,
          amount: { value: formData.paymentAmount * 100, currency: "USD" },
          billingAddress: billingAddress,
          shopperEmail: formData.email,
          shopperName: {
            firstName: formData.firstName,
            lastName: formData.lastName,
          },
        }),
      });
      const response = await res.json();
      setResponse(response);
      console.log("Payment response:", response);
      setSteps(2);
      // Handle the payment response accordingly
    } catch (error) {
      console.error("Payment submission error:", error);
    }
};
  const onSubmitReview = (formData) => {
    setFormData(formData);
    setSteps(1);
  };
  return (
    <div className="bg-[#E0e9C6]">
      <nav className="w-full">
        <img src="./nav.jpg" className="w-full" alt="" />
      </nav>
      {steps === 0 && (
        <div className="bg-[#FFFFF0]">
          <div className="w-[80%] mx-auto flex flex-col gap-8 py-[40px]">
            <p>
              Thank you for choosing Forest Lawn's online bill payment option.
              You can make your monthly payment instantly with no user name or
              passwords to remember. All you need is your information and a
              credit card.
            </p>
            <p>
              PLEASE NOTE: You will need your full account information,
              including your Account Number. The Account Number can be found on
              your monthly statement.
            </p>
            <p>
              Once you have your Account Number, simply enter the required
              information below and click SUBMIT. Our Bill Pay system will
              update your account within two (2) business days of your approved
              credit card payment. For your convenience, we accept the following
              methods of payment: Visa, MasterCard and Discover.
            </p>
            <p className="font-bold text-red-600">
              This Bill Pay feature only applies to advance planning accounts
              ("ahead of need" plans). Accounts that are considered at-need
              ("time of loss" plans) cannot use this feature at this time. To
              pay for "at-need" plans, please call the park's cashier at the
              number provided by your Memorial Counselor.
            </p>
            <div className="flex justify-center">
              <p className="w-[85%]">
                If you have any questions, please call 1 (888) 204-3131 and ask
                for Client Accounts. We have staff available to assist you
                Monday through Friday, 8:00 am to 5:00 pm.
              </p>
              <p className="w-[15%] text-end">
                Call Us Directly <br />
                (888) 204-3131
              </p>
            </div>
            <p>
              Thank you again for choosing the quickest and easiest way to make
              a payment with Forest Lawn.
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmitReview)}
            className="space-y-4 p-4 bg-[#FFFFF0]"
          >
            <div className="w-[80%] mx-auto bg-[#E0e9C6] pt-[20px] pb-[30px] px-[20px] ">
              <h2 className=" text-[36px] text-[#626D4D]">
                Card Holder Information
              </h2>
              <p className="text-red-600 italic py-[20px]">
                All fields are required
              </p>
              <p className="italic text-[14px]">
                Enter the card holder name as it appears on the front of the
                credit card.
              </p>
              <div className="flex gap-8 pt-[16px] items-center">
                <label className="block w-[20%] text-[#626D4D]">
                  First Name
                </label>
                <div className="w-[65%]">
                  <input
                    {...register("firstName")}
                    className="mt-1 block w-full "
                    style={{
                      border: errors.firstName
                        ? "3px solid red"
                        : "1px solid black",
                    }}
                  />
                </div>
              </div>
              <div className="flex gap-8 pt-[16px] items-center">
                <label className="block w-[20%] text-[#626D4D]">
                  Last Name
                </label>
                <div className="w-[65%]">
                  <input
                    {...register("lastName")}
                    className="mt-1 block w-full  "
                    style={{
                      border: errors.lastName
                        ? "3px solid red"
                        : "1px solid black",
                    }}
                  />
                </div>
              </div>
              <div className="py-[50px]">
                <p className="text-red-500 font-bold">
                  For account verification, enter the address where you receive
                  the bill for this credit card.
                </p>
              </div>

              <div className="flex gap-8  items-center">
                <label className="block w-[20%] text-[#626D4D]">
                  Street Address
                </label>
                <div className="w-[65%]">
                  <input
                    {...register("streetAddress")}
                    className="mt-1 block w-full  "
                    style={{
                      border: errors.lastName
                        ? "3px solid red"
                        : "1px solid black",
                    }}
                  />
                </div>
              </div>
              <div className="flex gap-8 pt-[16px] items-center">
                <label className="block w-[20%] text-[#626D4D]">City</label>
                <div className="w-[65%]">
                  <input
                    {...register("city")}
                    className="mt-1 block w-full "
                    style={{
                      border: errors.city ? "3px solid red" : "1px solid black",
                    }}
                  />
                </div>
              </div>
              <div className="flex gap-8 pt-[16px] items-center">
                <label className="block w-[20%] text-[#626D4D]">State</label>
                <div className="w-[65%]">
                  <select
                    {...register("state")}
                    className="mt-1 block w-[20%] py-[5px]  "
                    style={{
                      border: errors.state
                        ? "3px solid red"
                        : "1px solid black",
                    }}
                  >
                    <option value="">Select a state</option>
                    <option value="AL">AL</option>
                    <option value="AK">AK</option>
                    <option value="AZ">AZ</option>
                    <option value="AR">AR</option>
                    <option value="CA">CA</option>
                    <option value="CO">CO</option>
                    <option value="CT">CT</option>
                    <option value="DE">DE</option>
                    <option value="FL">FL</option>
                    <option value="GA">GA</option>
                    <option value="HI">HI</option>
                    <option value="ID">ID</option>
                    <option value="IL">IL</option>
                    <option value="IN">IN</option>
                    <option value="IA">IA</option>
                    <option value="KS">KS</option>
                    <option value="KY">KY</option>
                    <option value="LA">LA</option>
                    <option value="ME">ME</option>
                    <option value="MD">MD</option>
                    <option value="MA">MA</option>
                    <option value="MI">MI</option>
                    <option value="MN">MN</option>
                    <option value="MS">MS</option>
                    <option value="MO">MO</option>
                    <option value="MT">MT</option>
                    <option value="NE">NE</option>
                    <option value="NV">NV</option>
                    <option value="NH">NH</option>
                    <option value="NJ">NJ</option>
                    <option value="NM">NM</option>
                    <option value="NY">NY</option>
                    <option value="NC">NC</option>
                    <option value="ND">ND</option>
                    <option value="OH">OH</option>
                    <option value="OK">OK</option>
                    <option value="OR">OR</option>
                    <option value="PA">PA</option>
                    <option value="RI">RI</option>
                    <option value="SC">SC</option>
                    <option value="SD">SD</option>
                    <option value="TN">TN</option>
                    <option value="TX">TX</option>
                    <option value="UT">UT</option>
                    <option value="VT">VT</option>
                    <option value="VA">VA</option>
                    <option value="WA">WA</option>
                    <option value="WV">WV</option>
                    <option value="WI">WI</option>
                    <option value="WY">WY</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-8 pt-[16px] items-center">
                <label className="block w-[20%] text-[#626D4D]">Zip</label>
                <div className="w-[65%]">
                  <input
                    {...register("zip")}
                    className="mt-1 block w-full  "
                    style={{
                      border: errors.zip ? "3px solid red" : "1px solid black",
                    }}
                  />
                </div>
              </div>
              <div className="pt-[16px]">
                <p className="italic text-[14px]">
                  This information will be used if there is a question about
                  your payment and to send receipt confirmation. We do not sell
                  contact information to third parties.
                </p>
              </div>
              <div className="flex gap-8 pt-[16px] items-center">
                <label className="block w-[20%] text-[#626D4D]">Phone</label>
                <div className="w-[65%]">
                  <input
                    {...register("phone")}
                    placeholder="111-555-5555"
                    className="mt-1 block w-full  "
                    style={{
                      border: errors.phone
                        ? "3px solid red"
                        : "1px solid black",
                    }}
                  />
                </div>
              </div>
              <div className="flex gap-8 pt-[16px] items-center">
                <label className="block w-[20%] text-[#626D4D]">
                  Email Address
                </label>
                <div className="w-[65%]">
                  <input
                    {...register("email")}
                    className="mt-1 block w-full "
                    style={{
                      border: errors.email
                        ? "3px solid red"
                        : "1px solid black",
                    }}
                  />
                </div>
              </div>
              <div className="flex gap-8 pt-[16px] items-center">
                <label className="block w-[20%] text-[#626D4D]">
                  Confirm Email Address
                </label>
                <div className="w-[65%]">
                  <input
                    {...register("confirmEmail")}
                    className="mt-1 block w-full  "
                    style={{
                      border: errors.confirmEmail
                        ? "3px solid red"
                        : "1px solid black",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="w-[80%] mx-auto bg-[#E0e9C6]  py-[30px] px-[20px] ">
              <h2 className="text-[36px] text-[#626D4D]">
                Credit Card Information
              </h2>
              <p className="text-red-600 italic py-[20px]">
                All fields are required
              </p>
              <p className="italic text-[14px]">
                We accept Visa, MasterCard, and Discover.
              </p>
              <div className="flex gap-8 pt-[16px] items-center">
                <label className="block w-[20%] text-[#626D4D]">
                  Card Type
                </label>
                <div className="w-[25%]">
                  <select
                    {...register("cardType")}
                    className="mt-1 block w-full py-[4px] "
                    style={{
                      border: errors.cardType
                        ? "3px solid red"
                        : "1px solid black",
                    }}
                  >
                    <option value="">Select Card Type</option>
                    <option value="Visa">Visa</option>
                    <option value="MasterCard">MasterCard</option>
                    <option value="Discover">Discover</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-8 pt-[16px] items-center">
                <label className="block w-[20%] text-[#626D4D]">
                  Card Number
                </label>
                <div className="w-[65%] flex items-center gap-2">
                  <div className="w-[38%] flex gap-4">
                    <input
                      {...register("cardNumber", {
                        required: "Card number is required",
                        minLength: {
                          value: 16,
                          message: "Card number must be exactly 16 digits",
                        },
                        maxLength: {
                          value: 16,
                          message: "Card number must be exactly 16 digits",
                        },
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Only numeric values are allowed",
                        },
                      })}
                      type="number"
                      className="mt-1 block   w-full"
                      style={{
                        border: errors.cardNumber
                          ? "3px solid red"
                          : "1px solid black",
                      }}
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, "");
                      }}
                    />
                  </div>
                  <p className="italic text-[14px] "> No space or dashes</p>
                </div>
              </div>
              <div className="flex gap-8 pt-[16px] items-center">
                <label className="block w-[20%] text-[#626D4D]">
                  Expiration Date
                </label>
                <div className="w-[65%] flex items-center gap-2">
                  <input
                    {...register("expirationDate")}
                    placeholder="mm/yyyy"
                    className="mt-1 block w-[38%]  "
                    style={{
                      border: errors.expirationDate
                        ? "3px solid red"
                        : "1px solid black",
                    }}
                  />
                  <p className="italic text-[14px] flex item-center gap-2">
                    <FaRegCalendarDays />
                    mm/yyyy
                  </p>
                </div>
              </div>
              <div className="flex gap-8 pt-[16px] items-center">
                <label className="block w-[20%] text-[#626D4D]">
                  Security Code
                </label>
                <div className="w-[65%] flex items-center gap-2">
                  <input
                    {...register("securityCode")}
                    className="mt-1 block w-[20%]  "
                    style={{
                      border: errors.securityCode
                        ? "3px solid red"
                        : "1px solid black",
                    }}
                  />
                  <p className="italic text-[14px] flex item-center gap-2">
                    Enter the 3 digit security code on the back of the card.
                  </p>
                </div>
              </div>
              <div className="flex gap-8 pt-[16px] items-center">
                <label className="block w-[20%] text-[#626D4D]">
                  Payment Amount
                </label>
                <div className="w-[65%] flex items-center gap-2">
                  <input
                    type="number"
                    {...register("paymentAmount")}
                    className="mt-1 block w-[38%]  "
                    style={{
                      border: errors.paymentAmount
                        ? "3px solid red"
                        : "1px solid black",
                    }}
                  />
                  <p className="italic text-[14px] flex item-center gap-2">
                    US Dollars only
                  </p>
                </div>
              </div>
              <p className="italic text-[14px] pb-[16px] pt-[24px]">
                Any credit card information entered is not retained and will be
                erased after your payment has processed.
              </p>
            </div>

            <div className="w-[80%] mx-auto bg-[#E0e9C6]  py-[30px] px-[20px] ">
              <h2 className="text-[36px] text-[#626D4D]">
                Purchaser Information
              </h2>
              <p className="text-red-600 italic py-[20px]">
                All fields are required
              </p>

              <div className="flex gap-8 pt-[16px] items-center">
                <label className="block w-[20%] text-[#626D4D]">
                  Account #
                </label>
                <div className="w-[65%]">
                  <input
                    {...register("accountNumber")}
                    className="mt-1 block w-full border border-gray-300 "
                    style={{
                      border: errors.accountNumber
                        ? "3px solid red"
                        : "1px solid black",
                    }}
                  />
                </div>
              </div>
              <div className="flex gap-8 pt-[16px] items-center">
                <label className="block w-[20%] text-[#626D4D]">
                  Re-enter Account #
                </label>
                <div className="w-[65%]">
                  <input
                    {...register("reEnterAccountNumber")}
                    className="mt-1 block w-full border border-gray-300 "
                    style={{
                      border: errors.reEnterAccountNumber
                        ? "3px solid red"
                        : "1px solid black",
                    }}
                  />
                </div>
              </div>
              <div className="flex gap-8 pt-[16px] items-center">
                <label className="block w-[20%] text-[#626D4D]">
                  Name on Contract
                </label>
                <div className="w-[65%]">
                  <input
                    {...register("nameOnContract")}
                    className="mt-1 block w-full border border-gray-300 "
                    style={{
                      border: errors.nameOnContract
                        ? "3px solid red"
                        : "1px solid black",
                    }}
                  />
                </div>
              </div>
              <button
                type="submit"
                style={{ textShadow: "1px 1px 0px rgba(0, 0, 0, 0.5)" }}
                className="mt-8 bg-[#97751E] text-white py-2 px-4 rounded"
              >
                Review Payment Method
              </button>
              {/* footer section */}
              <div className="w-[80%] mt-[20px] mx-auto border-y-[1.5px] border-solid border-[#8D8866] py-[20px]">
                <p className="text-[#626D4D] text-[11px] text-center">
                  Thank you for your interest in Forest Lawn.
                </p>
                <div className="gap-8 flex pt-[10px]">
                  <p className="text-[#626D4D] text-[12px]">
                    Copyright @ 2024 FOREST LAWN MEMORIAL-PARK ASSOCATION FOREST
                    LAWN MEMORIAL-PARKS & MORTUARIES
                  </p>
                  <div className="flex ">
                    <p className="text-[#626D4D] text-[11px] ">
                      We respect your privacy and will not sell your personal
                      information. Forest Lawn will collect and use the
                      information you provide here to periodically email, call
                      or text you with information about products, services, and
                      events according to the terms of the Forest Lawn{" "}
                      <Link href={""} className="underline">
                        Privacy Policy and Terms of Use
                      </Link>{" "}
                      , until you change your communication preferences at
                      <Link href={""} className="underline">
                        www.forestlawn.com/preferences.
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-[16px] flex flex-col gap-2">
                <p className="text-[#626D4D] text-center text-[11px] font-light">
                  ARCADIA FD 2186 | CATHEDRAL CITY FD 1847 | CITY OF INDUSTRY FD
                  2121 | COACHELLA FD 640 | COVINA HILLS FD 1150 | CYPRESS FD
                  1051
                </p>
                <p className="text-[#626D4D] text-center text-[11px] font-light">
                  GLENDALE FD 656 | HOLLYWOOD HILLS FD 904 | INDIO FD 967 | LONG
                  BEACH FD 1151 | MONROVIA FD 221 | SAN DIMAS FD 1783 | WHITTIER
                  FD 2302
                </p>
              </div>
            </div>
          </form>
        </div>
      )}
      {steps === 1 && (
        <Review
          formData={formData}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
      )}
      {steps === 2 && (
        <div className="flex flex-col items-center justify-center bg-[#E0e9C6] h-screen">
          {response ? (
            <div className="p-6 rounded-lg">
              {response.paymentResponse.resultCode === "Authorised" ? (
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-green-600">
                    Thank You!
                  </h2>
                  <p className="mt-4 text-gray-700">
                    Your payment was successfully authorised.
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-red-600">
                    Payment Failed
                  </h2>
                  <p className="mt-4 text-gray-700">
                    Unfortunately, your payment was refused.
                  </p>
                  <p className="mt-2 text-gray-500">
                    Reason: {response?.paymentResponse?.refusalReason}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-600">
                Processing Payment...
              </h2>
            </div>
          )}
          <button
            onClick={() => setSteps(0)}
            style={{ textShadow: "1px 1px 0px rgba(0, 0, 0, 0.5)" }}
            className="bg-[#385624] hover:bg-[#385624d4] text-white h-[40px] w-[6rem] rounded-md"
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
};

export default Main;

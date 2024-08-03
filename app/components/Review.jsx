import React from "react";

const Review = ({ formData, handleSubmit, onSubmit }) => {
  return (
    <form className="space-y-4 p-4 bg-green-100">
      <div className="w-[80%] mx-auto bg-[#E0e9C6] pt-[20px] pb-[30px] px-[20px]">
        <h2 className="text-[36px] text-[#626D4D]">Card Holder Information</h2>
        <p className="text-red-600 italic py-[20px]">All fields are required</p>
        <div className="flex gap-8 pt-[16px] items-center">
          <label className="block w-[20%] text-[#626D4D]">First Name</label>
          <div className="w-[65%]">
            <input
              value={formData.firstName || ""}
              readOnly
              className="mt-1 block w-full"
              style={{ border: "1px solid #ccc" }}
            />
          </div>
        </div>
        <div className="flex gap-8 pt-[16px] items-center">
          <label className="block w-[20%] text-[#626D4D]">Last Name</label>
          <div className="w-[65%]">
            <input
              value={formData.lastName || ""}
              readOnly
              className="mt-1 block w-full"
              style={{ border: "1px solid #ccc" }}
            />
          </div>
        </div>
        <div className="flex gap-8 items-center">
          <label className="block w-[20%] text-[#626D4D]">Street Address</label>
          <div className="w-[65%]">
            <input
              value={formData.streetAddress || ""}
              readOnly
              className="mt-1 block w-full"
              style={{ border: "1px solid #ccc" }}
            />
          </div>
        </div>
        <div className="flex gap-8 pt-[16px] items-center">
          <label className="block w-[20%] text-[#626D4D]">City</label>
          <div className="w-[65%]">
            <input
              value={formData.city || ""}
              readOnly
              className="mt-1 block w-full"
              style={{ border: "1px solid #ccc" }}
            />
          </div>
        </div>
        <div className="flex gap-8 pt-[16px] items-center">
          <label className="block w-[20%] text-[#626D4D]">State</label>
          <div className="w-[65%]">
            <input
              value={formData.state || ""}
              readOnly
              className="mt-1 block w-full"
              style={{ border: "1px solid #ccc" }}
            />
          </div>
        </div>
        <div className="flex gap-8 pt-[16px] items-center">
          <label className="block w-[20%] text-[#626D4D]">Zip</label>
          <div className="w-[65%]">
            <input
              value={formData.zip || ""}
              readOnly
              className="mt-1 block w-full"
              style={{ border: "1px solid #ccc" }}
            />
          </div>
        </div>
        <div className="flex gap-8 pt-[16px] items-center">
          <label className="block w-[20%] text-[#626D4D]">Phone</label>
          <div className="w-[65%]">
            <input
              value={formData.phone || ""}
              readOnly
              className="mt-1 block w-full"
              style={{ border: "1px solid #ccc" }}
            />
          </div>
        </div>
        <div className="flex gap-8 pt-[16px] items-center">
          <label className="block w-[20%] text-[#626D4D]">Email Address</label>
          <div className="w-[65%]">
            <input
              value={formData.email || ""}
              readOnly
              className="mt-1 block w-full"
              style={{ border: "1px solid #ccc" }}
            />
          </div>
        </div>
        <div className="flex gap-8 pt-[16px] items-center">
          <label className="block w-[20%] text-[#626D4D]">
            Confirm Email Address
          </label>
          <div className="w-[65%]">
            <input
              value={formData.confirmEmail || ""}
              readOnly
              className="mt-1 block w-full"
              style={{ border: "1px solid #ccc" }}
            />
          </div>
        </div>
        <div className="w-[80%] mx-auto bg-[#E0e9C6] py-[30px] px-[20px]">
          <h2 className="text-[36px] text-[#626D4D]">
            Credit Card Information
          </h2>
          <div className="flex gap-8 pt-[16px] items-center">
            <label className="block w-[20%] text-[#626D4D]">Card Type</label>
            <div className="w-[65%]">
              <input
                value={formData.cardType || ""}
                readOnly
                className="mt-1 block w-full"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>
          <div className="flex gap-8 pt-[16px] items-center">
            <label className="block w-[20%] text-[#626D4D]">Card Number</label>
            <div className="w-[65%]">
              <input
                value={formData.cardNumber}
                readOnly
                className="mt-1 block w-full"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>
          <div className="flex gap-8 pt-[16px] items-center">
            <label className="block w-[20%] text-[#626D4D]">
              Expiration Date
            </label>
            <div className="w-[65%]">
              <input
                value={formData.expirationDate || ""}
                readOnly
                className="mt-1 block w-full"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>
          <div className="flex gap-8 pt-[16px] items-center">
            <label className="block w-[20%] text-[#626D4D]">
              Security Code
            </label>
            <div className="w-[65%]">
              <input
                value={formData.securityCode}
                readOnly
                className="mt-1 block w-full"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>
          <div className="flex gap-8 pt-[16px] items-center">
            <label className="block w-[20%] text-[#626D4D]">
              Payment Amount
            </label>
            <div className="w-[65%]">
              <input
                value={formData.paymentAmount || ""}
                readOnly
                className="mt-1 block w-full"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>
        </div>
        <div className="w-[80%] mx-auto bg-[#E0e9C6] py-[30px] px-[20px]">
          <h2 className="text-[36px] text-[#626D4D]">Purchaser Information</h2>
          <div className="flex gap-8 pt-[16px] items-center">
            <label className="block w-[20%] text-[#626D4D]">Account #</label>
            <div className="w-[65%]">
              <input
                value={formData.accountNumber || ""}
                readOnly
                className="mt-1 block w-full"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>
          <div className="flex gap-8 pt-[16px] items-center">
            <label className="block w-[20%] text-[#626D4D]">
              Re-enter Account #
            </label>
            <div className="w-[65%]">
              <input
                value={formData.reEnterAccountNumber || ""}
                readOnly
                className="mt-1 block w-full"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>
          <div className="flex gap-8 pt-[16px] items-center">
            <label className="block w-[20%] text-[#626D4D]">
              Name on Contract
            </label>
            <div className="w-[65%]">
              <input
                value={formData.nameOnContract || ""}
                readOnly
                className="mt-1 block w-full"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>
        </div>
        <div className="items-center flex gap-4">
          <button
            style={{ textShadow: "1px 1px 0px rgba(0, 0, 0, 0.5)" }}
            className="bg-[#385624] text-white h-[40px] w-[6rem] rounded-md"
          >
            Go Back
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              onSubmit(formData);
            }}
            style={{ textShadow: "1px 1px 0px rgba(0, 0, 0, 0.5)" }}
            className="bg-[#97751E] text-white h-[40px] w-[10rem] rounded-md"
          >
            Submit Payment
          </button>
        </div>
      </div>
    </form>
  );
};

export default Review;

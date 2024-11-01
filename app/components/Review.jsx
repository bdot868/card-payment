import Link from "next/link";
import React from "react";

const Review = ({ formData, handleSubmit, onSubmit }) => {
  return (
    <div className="bg-green-100">
      
      <form className="space-y-4 p-4 bg-green-100">
        {/* Card information */}
        <div className="md:w-[60%] mx-auto bg-[#E0e9C6] pt-[20px] pb-[30px] px-[20px]">
          <h2 className=" text-[24px] md:text-[36px] text-[#626D4D]">
            Card Holder Information
          </h2>
          <p className="text-red-600 italic py-[20px]">
            All fields are required
          </p>
          <div className="flex gap-8 pt-[16px] items-center">
            <label className="block w-[50%] md:w-[20%] text-sm md:text-base text-[#626D4D]">First Name</label>
            <div className="w-[65%]">
              <input
                value={formData.firstName || ""}
                readOnly
                className="mt-1 block w-full text-sm bg-gray-100 md:text-base"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>
          <div className="flex gap-8 pt-[16px] items-center">
            <label className="block w-[50%] md:w-[20%] text-sm md:text-base text-[#626D4D]">Last Name</label>
            <div className="w-[65%]">
              <input
                value={formData.lastName || ""}
                readOnly
                className="mt-1 block w-full text-sm bg-gray-100 md:text-base"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>
          <div className="flex gap-8 items-center pt-[16px]">
            <label className="block w-[50%] md:w-[20%] text-sm md:text-base text-[#626D4D]">
              Street Address
            </label>
            <div className="w-[65%]">
              <input
                value={formData.streetAddress || ""}
                readOnly
                className="mt-1 block w-full text-sm bg-gray-100 md:text-base"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>
          <div className="flex gap-8 pt-[16px] items-center">
            <label className="block w-[50%] md:w-[20%] text-sm md:text-base text-[#626D4D]">City</label>
            <div className="w-[65%]">
              <input
                value={formData.city || ""}
                readOnly
                className="mt-1 block w-full text-sm bg-gray-100 md:text-base"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>
          <div className="flex gap-8 pt-[16px] items-center">
            <label className="block w-[50%] md:w-[20%] text-sm md:text-base text-[#626D4D]">State</label>
            <div className="w-[65%]">
              <input
                value={formData.state || ""}
                readOnly
                className="mt-1 block w-full text-sm bg-gray-100 md:text-base"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>
          <div className="flex gap-8 pt-[16px] items-center">
            <label className="block w-[50%] md:w-[20%] text-sm md:text-base text-[#626D4D]">Zip</label>
            <div className="w-[65%]">
              <input
                value={formData.zip || ""}
                readOnly
                className="mt-1 block w-full text-sm bg-gray-100 md:text-base"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>
          <div className="flex gap-8 pt-[16px] items-center">
            <label className="block w-[50%] md:w-[20%] text-sm md:text-base text-[#626D4D]">Phone</label>
            <div className="w-[65%]">
              <input
                value={formData.phone || ""}
                readOnly
                className="mt-1 block w-full text-sm bg-gray-100 md:text-base"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>
          <div className="flex gap-8 pt-[16px] items-center">
            <label className="block w-[50%] md:w-[20%] text-sm md:text-base text-[#626D4D]">
              Email Address
            </label>
            <div className="w-[65%]">
              <input
                value={formData.email || ""}
                readOnly
                className="mt-1 block w-full text-sm bg-gray-100 md:text-base"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>
          <div className="flex gap-8 pt-[16px] items-center">
            <label className="block w-[50%] md:w-[20%] text-sm md:text-base text-[#626D4D]">
              Confirm Email Address
            </label>
            <div className="w-[65%]">
              <input
                value={formData.confirmEmail || ""}
                readOnly
                className="mt-1 block w-full text-sm bg-gray-100 md:text-base"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>
        </div>
        {/* Credit card information */}
        <div className="md:w-[60%] mx-auto bg-[#E0e9C6] py-[30px] px-[20px]">
          <h2 className=" text-[24px] md:text-[36px] text-[#626D4D]">
            Credit Card Information
          </h2>
          <div className="flex gap-8 pt-[16px] items-center">
            <label className="block w-[50%] md:w-[20%] text-sm md:text-base text-[#626D4D]">Card Type</label>
            <div className="w-[65%]">
              <input
                value={formData.cardType || ""}
                readOnly
                className="mt-1 block w-full text-sm bg-gray-100 md:text-base"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>
          <div className="flex gap-8 pt-[16px] items-center">
            <label className="block w-[50%] md:w-[20%] text-sm md:text-base text-[#626D4D]">Card Number</label>
            <div className="w-[65%]">
              <input
                value={formData.cardNumber}
                readOnly
                className="mt-1 block w-full text-sm bg-gray-100 md:text-base"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>
          <div className="flex gap-8 pt-[16px] items-center">
            <label className="block w-[50%] md:w-[20%] text-sm md:text-base text-[#626D4D]">
              Expiration Date
            </label>
            <div className="w-[65%]">
              <input
                value={formData.expirationDate || ""}
                readOnly
                className="mt-1 block w-full text-sm bg-gray-100 md:text-base"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>
          <div className="flex gap-8 pt-[16px] items-center">
            <label className="block w-[50%] md:w-[20%] text-sm md:text-base text-[#626D4D]">
              Security Code
            </label>
            <div className="w-[65%]">
              <input
                value={formData.securityCode}
                readOnly
                className="mt-1 block w-full text-sm bg-gray-100 md:text-base"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>
          <div className="flex gap-8 pt-[16px] items-center">
            <label className="block w-[50%] md:w-[20%] text-sm md:text-base text-[#626D4D]">
              Payment Amount
            </label>
            <div className="w-[65%]">
              <input
                value={formData.paymentAmount || ""}
                readOnly
                className="mt-1 block w-full text-sm bg-gray-100 md:text-base"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>
        </div>
        {/* purchaser information */}
        <div className="md:w-[60%] mx-auto bg-[#E0e9C6] py-[30px] px-[20px]">
          <h2 className=" text-[24px] md:text-[36px] text-[#626D4D]">Purchaser Information</h2>
          <div className="flex gap-8 pt-[16px] items-center">
            <label className="block w-[50%] md:w-[20%] text-sm md:text-base text-[#626D4D]">Account #</label>
            <div className="w-[65%]">
              <input
                value={formData.accountNumber || ""}
                readOnly
                className="mt-1 block w-full text-sm bg-gray-100 md:text-base"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>
          <div className="flex gap-8 pt-[16px] items-center">
            <label className="block w-[50%] md:w-[20%] text-sm md:text-base text-[#626D4D]">
              Re-enter Account #
            </label>
            <div className="w-[65%]">
              <input
                value={formData.reEnterAccountNumber || ""}
                readOnly
                className="mt-1 block w-full text-sm bg-gray-100 md:text-base"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>
          <div className="flex gap-8 pt-[16px] items-center">
            <label className="block w-[50%] md:w-[20%] text-sm md:text-base text-[#626D4D]">
              Name on Contract
            </label>
            <div className="w-[65%]">
              <input
                value={formData.nameOnContract || ""}
                readOnly
                className="mt-1 block w-full text-sm bg-gray-100 md:text-base"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          </div>
          {/* button div */}
          <div className="items-center flex gap-4 pt-[30px]">
            <button
              style={{ textShadow: "1px 1px 0px rgba(0, 0, 0, 0.5)" }}
              className="bg-[#385624] text-sm md:text-base text-white h-[40px] w-[6rem] rounded-md"
            >
              Go Back
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                onSubmit(formData);
              }}
              style={{ textShadow: "1px 1px 0px rgba(0, 0, 0, 0.5)" }}
              className="bg-[#97751E] text-sm md:text-base text-white h-[40px] w-[10rem] rounded-md"
            >
              Submit Payment
            </button>
          </div>
          {/* footer section */}
          <div className="md:w-[60%] mt-[20px] mx-auto border-y-[1.5px] border-solid border-[#8D8866] py-[20px]">
            <p className="text-[#626D4D] text-[11px] text-center">
              Thank you for your interest in Forest Lawn.
            </p>
            <div className="gap-8 flex flex-col md:flex-row pt-[10px]">
              <p className="text-[#626D4D] text-[12px]">
                Copyright @ 2024 FOREST LAWN MEMORIAL-PARK ASSOCATION FOREST
                LAWN MEMORIAL-PARKS & MORTUARIES
              </p>
              <div className="flex ">
                <p className="text-[#626D4D] text-[11px] ">
                  We respect your privacy and will not sell your personal
                  information. Forest Lawn will collect and use the information
                  you provide here to periodically email, call or text you with
                  information about products, services, and events according to
                  the terms of the Forest Lawn{" "}
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
              2121 | COACHELLA FD 640 | COVINA HILLS FD 1150 | CYPRESS FD 1051
            </p>
            <p className="text-[#626D4D] text-center text-[11px] font-light">
              GLENDALE FD 656 | HOLLYWOOD HILLS FD 904 | INDIO FD 967 | LONG
              BEACH FD 1151 | MONROVIA FD 221 | SAN DIMAS FD 1783 | WHITTIER FD
              2302
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Review;

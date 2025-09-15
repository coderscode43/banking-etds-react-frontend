import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import React, { useState } from "react";
import { Fragment } from "react";

const UpdateForm27EQDeductee = () => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="cursor-pointer rounded-md bg-blue-600 p-2 px-4 font-semibold text-white"
        >
          <i className="fa-solid fa-pen-to-square"></i>&nbsp; Edit
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 rounded-md"
          onClose={closeModal}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="relative w-full max-w-6xl transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h2"
                    className="mb-5 text-lg leading-6 font-medium text-gray-900"
                  >
                    Update Form 27EQ Deductee
                  </DialogTitle>
                  <div className="justify-center">
                    <Field className="mb-3 flex flex-wrap gap-3">
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Quarter
                        </label>

                        <input
                          name="quarter"
                          id="quarter"
                          placeholder="Quarter"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Month
                        </label>
                        <input
                          name="month"
                          id="month"
                          placeholder="Month"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Branch Code
                        </label>

                        <input
                          name="branchCode"
                          id="branchCode"
                          placeholder="Branch Code"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>

                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Customer/Vendor ID
                        </label>

                        <input
                          name="customerVendorID"
                          id="customerVendorID"
                          placeholder="Customer/Vendor Id"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          RO Code
                        </label>

                        <input
                          name="roCode"
                          id="roCode"
                          placeholder="RO Code"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          TAN
                        </label>
                        <input
                          name="TAN"
                          id="TAN"
                          placeholder="TAN"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>

                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Unique Ref No.
                        </label>
                        <input
                          name="uniqueRefNo"
                          id="uniqueRefNo"
                          placeholder="Unique Ref No."
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>

                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Account No
                        </label>

                        <input
                          name="accountNo"
                          id="accountNo"
                          placeholder="Account No"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Challan Heading
                        </label>

                        <input
                          name="challanHeading"
                          id="challanHeading"
                          placeholder="Challan Heading"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Party Reference No
                        </label>
                        <input
                          name="partyReferenceNo"
                          id="partyReferenceNo"
                          placeholder="Party Reference No"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>

                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Party Code
                        </label>

                        <input
                          name="partyCode"
                          id="partyCode"
                          placeholder="Party Code"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>

                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          PAN of the Party
                        </label>
                        <input
                          name="panOfTheParty"
                          id="panOfTheParty"
                          placeholder="PAN of the Party"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Name of the Party
                        </label>

                        <input
                          name="nameoftheParty"
                          id="nameoftheParty"
                          placeholder="Name of the Party"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>

                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Amount Receipt/Debited
                        </label>
                        <input
                          name="amountReceiptORDebited "
                          id="amountReceiptORDebited"
                          placeholder="Amount Receipt/Debited"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Date of Received/Debited Date Of Payment
                        </label>

                        <input
                          type="date"
                          name="dateofReceivedORDebitedDateOfPayment"
                          id="dateofReceivedORDebitedDateOfPayment"
                          placeholder="Date of Received/Debited Date Of Payment "
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          TDS
                        </label>

                        <input
                          name="TDS"
                          id="TDS"
                          placeholder="TDS"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Surcharge
                        </label>

                        <input
                          name="surcharge"
                          id="surcharge"
                          placeholder="Surcharge"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Education Cess
                        </label>
                        <input
                          name="educationCess"
                          id="educationCess"
                          placeholder="Education Cess"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Total Tax Collected
                        </label>

                        <input
                          name="totalTaxCollected"
                          id="totalTaxDeducted"
                          placeholder="Total Tax Collected"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Total Tax Deposited
                        </label>

                        <input
                          name="totalTaxDeposited"
                          id="totalTaxDeposited"
                          placeholder="Total Tax Deposited"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Date of Collected
                        </label>

                        <input
                          type="date"
                          name="dateofCollected"
                          id="dateofCollected"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Total Value of Purchase
                        </label>
                        <input
                          name="totalValueofPurchase"
                          id="totalValueofPurchase"
                          placeholder="Total Value of Purchase"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Rate at Which Tax Collected
                        </label>

                        <input
                          name="rateatwhichTaxCollected"
                          id="rateatwhichTaxCollected"
                          placeholder="Rate at which Tax Collected"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Reason for Non Collection
                        </label>

                        <input
                          name="reasonforNonCollection"
                          id="reasonforNonCollection"
                          placeholder="Reason for Non Collection"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Section / Collection Code
                        </label>
                        <input
                          name="sectionORCollectionCode"
                          id="sectionORCollectionCode"
                          placeholder="Section / Collection Code"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Certificate Number
                        </label>
                        <input
                          name="certificateNumber"
                          id="certificateNumber"
                          placeholder="Certificate Number"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Deductee is Non-Resident
                        </label>
                        <input
                          name="deducteeisNon-Resident"
                          id="deducteeisNon-Resident"
                          placeholder="Deductee is Non-Resident"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>

                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Permanent Establishment
                        </label>
                        <input
                          name="permanentEstablishment"
                          id="permanentEstablishment"
                          placeholder="Permanent Establishment"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Reason For NonCollection F or G
                        </label>
                        <input
                          name="reasonForNonCollectionForG"
                          id="reasonForNonCollectionForG"
                          placeholder="Reason For NonCollection F or G"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="text-[15px] font-semibold text-[var(--primary-color)]">
                          If Answer to 681A is Yes Then Challan Number
                        </label>
                        <input
                          name="ifAnswerto681AisYesThenChallanNumber"
                          id="ifAnswerto681AisYesThenChallanNumber"
                          placeholder="If Answer to 681A is Yes Then Challan Number"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Payment Of TDS To Central Government
                        </label>

                        <input
                          name="paymentOfTDSToCentralGovernment"
                          id="paymentOfTDSToCentralGovernment"
                          placeholder="Payment Of TDS To Central Government"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>

                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Error Description
                        </label>

                        <input
                          name="errorDescription "
                          id="errorDescription"
                          placeholder="Error Description "
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Warning Description
                        </label>
                        <input
                          name="waringDescription"
                          id="waringDescription"
                          placeholder="Warning Description"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>

                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Short Deduction
                        </label>

                        <input
                          name="shortDeduction"
                          id="shortDeduction"
                          placeholder="Short Deduction"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Interest On Short Deduction
                        </label>

                        <input
                          name="interestOnShortDeduction"
                          id="interestOnShortDeduction"
                          placeholder="Interest On Short Deduction"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>

                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Interest On Late Payment
                        </label>

                        <input
                          name="interestOnLatePayment"
                          id="interestOnLatePayment"
                          placeholder="Interest On Late Payment"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Status
                        </label>

                        <input
                          name="status"
                          id="status"
                          placeholder="Status"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>

                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Interest on Late Deduction
                        </label>

                        <input
                          name="interestonLateDeduction"
                          id="interestonLateDeduction"
                          placeholder="Interest on Late Deduction"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                    </Field>

                    <div
                      className="absolute top-7 right-10 cursor-pointer"
                      onClick={closeModal}
                    >
                      <i className="fa-solid fa-x"></i>
                    </div>
                  </div>

                  <div className="mt-5 flex justify-end">
                    <button className="mr-2.5 cursor-pointer rounded-md bg-[#1761fd] p-2 px-4 font-semibold text-white">
                      Update
                    </button>

                    <button
                      onClick={closeModal}
                      className="cursor-pointer rounded-md bg-red-600 p-2 px-4 font-semibold text-white"
                    >
                      Close
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default UpdateForm27EQDeductee;

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

const UpdateForm27QDeductee = () => {
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
                    Update Form 27Q Deductee
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
                          Deductee Reference No
                        </label>
                        <input
                          name="deducteeReferenceNo"
                          id="deducteeReferenceNo"
                          placeholder="Deductee Reference No"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>

                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Unique Knowledge No
                        </label>

                        <input
                          name="uniqueKnowledgeNo"
                          id="uniqueKnowledgeNo"
                          placeholder="Unique Knowledge No"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>

                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          No of certificate under section
                        </label>
                        <input
                          name="noOfCertificateUnderSection"
                          id="noOfCertificateUnderSection"
                          placeholder="No of certificate under section"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Country
                        </label>

                        <input
                          name="country "
                          id="country"
                          placeholder="Country "
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>

                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          TDS Rate as Per IT Acts
                        </label>
                        <input
                          name="TDSRateasPerITActs"
                          id="TDSRateasPerITActs"
                          placeholder="TDS Rate as Per IT Acts"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Grossing Up Indicator
                        </label>

                        <input
                          type="date"
                          name="grossingUpIndicator"
                          id="grossingUpIndicator"
                          placeholder="Grossing Up Indicator"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Email ID
                        </label>

                        <input
                          name="emailID"
                          id="emailID"
                          placeholder="Email ID"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Contact No
                        </label>

                        <input
                          name="contactNo"
                          id="contactNo"
                          placeholder="Contact No"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Nature of Remittance
                        </label>
                        <input
                          name="natureofRemittance"
                          id="natureofRemittance"
                          placeholder="Nature of Remittance"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Deductee Code
                        </label>

                        <input
                          name="deducteeCode"
                          id="deducteeCode"
                          placeholder="Deductee Code"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Address of Deductee
                        </label>

                        <input
                          name="addressofDeductee"
                          id="addressofDeductee"
                          placeholder="Address of Deductee"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          PAN
                        </label>

                        <input
                          name="PAN"
                          id="PAN"
                          placeholder="PAN"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Tax Identification Number
                        </label>
                        <input
                          name="taxIdentificationNumber"
                          id="taxIdentificationNumber"
                          placeholder="Tax Identification Number"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Name
                        </label>

                        <input
                          name="name"
                          id="name"
                          placeholder="Name"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Cash Withdrawal 194N
                        </label>

                        <input
                          name="cashWithdrawal194N"
                          id="cashWithdrawal194N"
                          placeholder="Cash Withdrawal 194N"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Section Code
                        </label>
                        <input
                          name="sectionCode"
                          id="sectionCode"
                          placeholder="Section Collection Code"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Cash Withdrawl 194N(20L to 1cr)
                        </label>
                        <input
                          name="cashWithdrawl194N(20Lto1cr)"
                          id="cashWithdrawl194N(20Lto1cr)"
                          placeholder="Cash Withdrawl 194N(20L to 1cr)"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Date Of Payment
                        </label>
                        <input
                          type="date"
                          name="dateOfPayment"
                          id="dateOfPayment"
                          placeholder="Date Of Payment"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>

                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Cash Withdrawal 194N &gt;1Cr
                        </label>
                        <input
                          name="cashWithdrawal194N>1Cr"
                          id="cashWithdrawal194N>1Cr"
                          placeholder="Cash Withdrawal 194N >1Cr"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Amount Paid
                        </label>
                        <input
                          name="amountPaid"
                          id="amountPaid"
                          placeholder="Amount Paid"
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
                        <label className="text-[15px] font-semibold text-[var(--primary-color)]">
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
                          Total Tax Deducted
                        </label>

                        <input
                          name="totalTaxDeducted"
                          id="totalTaxDeducted"
                          placeholder="Total Tax Deducted"
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
                          Interest On Late Deduction
                        </label>

                        <input
                          name="interestOnLateDeduction"
                          id="interestOnLateDeduction"
                          placeholder="Interest On Late Deduction"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>

                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Date Of Deduction
                        </label>

                        <input
                          type="date"
                          name="dateOfDeduction"
                          id="dateOfDeduction"
                          placeholder="Date Of Deduction"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>

                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Reason for non Deduction
                        </label>

                        <input
                          name="reasonfornonDeduction"
                          id="reasonfornonDeduction"
                          placeholder="Reason for non Deduction"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>

                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Rate at Which Tax Collected
                        </label>

                        <input
                          name="rateAtWhichTaxCollected"
                          id="rateAtWhichTaxCollected"
                          placeholder="Rate at Which Tax Collected"
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

export default UpdateForm27QDeductee;

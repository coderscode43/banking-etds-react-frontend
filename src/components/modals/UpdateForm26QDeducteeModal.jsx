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

const UpdateForm26QDeductee = () => {
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
          onClose={() => {}}
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
                <DialogPanel className="relative w-full max-w-6xl transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h2"
                    className="mb-5 bg-[#eaf0f9] p-[2%] text-lg leading-6 font-medium text-gray-900"
                  >
                    Update Form 26Q Deductee
                  </DialogTitle>
                  <div className="justify-center px-5">
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
                          Financial Year
                        </label>

                        <input
                          name="fy"
                          id="fy"
                          placeholder="Financial Year"
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
                          Section Code
                        </label>
                        <input
                          name="sectionCode"
                          id="sectionCode"
                          placeholder="Section Code"
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
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>

                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Amount Paid{" "}
                        </label>
                        <input
                          name="amountPaid "
                          id="amountPaid"
                          placeholder="Amount Paid "
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
                          placeholder="TDS "
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
                          Date Of Deduction
                        </label>

                        <input
                          type="date"
                          name="dateOfDeduction"
                          id="dateOfDeduction"
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
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Remarks Reason
                        </label>

                        <input
                          name="remarksReason"
                          id="remarksReason"
                          placeholder="Remarks Reason"
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
                          Deductee Ref No
                        </label>
                        <input
                          name="deducteeRefNo"
                          id="deducteeRefNo"
                          placeholder="Deductee Ref No"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Challan SR No
                        </label>
                        <input
                          name="challanSRNo"
                          id="challanSRNo"
                          placeholder="Challan SR No"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>

                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Cash Withdrawal 194N (20L to 1Cr)
                        </label>
                        <input
                          name="cashWithdrawal194N(20Lto1Cr)"
                          id="cashWithdrawal194N(20Lto1Cr)"
                          placeholder="Cash Withdrawal 194N (20L to 1Cr)"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Cash Withdrawal 194N (1Cr)
                        </label>
                        <input
                          name="cashWithdrawal194N(1Cr)"
                          id="cashWithdrawal194N(1Cr)"
                          placeholder="Cash Withdrawal 194N (1Cr)"
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
                          Comments
                        </label>

                        <input
                          name="comments"
                          id="comments"
                          placeholder="Comments"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>

                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Deductee SR No
                        </label>

                        <input
                          name="deducteeSRNo"
                          id="deducteeSRNo"
                          placeholder="Deductee SR No"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>

                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Transaction Amount
                        </label>

                        <input
                          name="transactionAmount"
                          id="transactionAmount"
                          placeholder="Transaction Amount"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>

                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Additional Detail
                        </label>

                        <input
                          name="additionalDetail"
                          id="additionalDetail"
                          placeholder="Additional Detail"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                    </Field>

                    <div
                      className="absolute top-6 right-10 cursor-pointer"
                      onClick={closeModal}
                    >
                      <i className="fa-solid fa-x"></i>
                    </div>
                  </div>

                  <div className="mt-5 flex justify-end bg-[#eaf0f9] p-[2%]">
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

export default UpdateForm26QDeductee;

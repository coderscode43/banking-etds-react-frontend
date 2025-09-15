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

const UpdateForm24QDeductee = () => {
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
                    Update Form 24Q Deductee
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
                          Transaction Id
                        </label>

                        <input
                          name="transactionId"
                          id="transactionId"
                          placeholder="Transaction Id"
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
                          Party Id
                        </label>
                        <input
                          name="partyId"
                          id="partyId"
                          placeholder="Party Id"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>

                      <div className="w-[32.5%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          PAN Ref No
                        </label>

                        <input
                          name="PANRefNo"
                          id="PANRefNo"
                          placeholder="PAN Ref No"
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
                          Total TDS
                        </label>

                        <input
                          name="totalTDS"
                          id="totalTDS"
                          placeholder="Total TDS"
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
                          Error Description{" "}
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

export default UpdateForm24QDeductee;

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import React, { useState } from "react";
import { Fragment } from "react";

const EditBranchDetails = () => {
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
                <DialogPanel className="relative w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h2"
                    className="mb-5 text-lg leading-6 font-medium text-gray-900"
                  >
                    Edit Branch Details
                  </DialogTitle>
                  <div className="justify-center">
                    <div className="mb-3 flex flex-wrap gap-2">
                      <div className="w-[49%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          RO Code<span className="text-red-600">*</span>
                        </label>
                        <input
                          name="roCode"
                          id="roCode"
                          placeholder="RO Code"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>

                      <div className="w-[49%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          Branch Code
                        </label>
                        <span className="text-red-600">*</span>
                        <input
                          name="branchCode"
                          id="branchCode"
                          placeholder="Branch Code"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="mb-3 flex flex-wrap gap-2">
                      <div className="w-[49%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          RO Name<span className="text-red-600">*</span>
                        </label>
                        <input
                          name="roName"
                          id="roName"
                          placeholder="RO Name"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>

                      <div className="w-[49%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          RO Email
                        </label>
                        <span className="text-red-600">*</span>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Email"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="mb-3 flex flex-wrap gap-2">
                      <div className="w-[49%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          RO Contact No<span className="text-red-600">*</span>
                        </label>
                        <input
                          name="roContactNumber"
                          id="roContactNumber"
                          placeholder="RO Contact No"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>

                      <div className="w-[49%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          RO Address
                        </label>
                        <span className="text-red-600">*</span>
                        <input
                          name="roAddress"
                          id="roAddress"
                          placeholder="RO Address"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="mb-3 flex flex-wrap gap-2">
                      <div className="w-[49%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          RO Pin code<span className="text-red-600">*</span>
                        </label>
                        <input
                          name="roPinCode"
                          id="roPinCode"
                          placeholder="RO Pin code"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>

                      <div className="w-[49%]">
                        <label className="font-semibold text-[var(--primary-color)]">
                          RO State
                        </label>
                        <span className="text-red-600">*</span>
                        <select
                          name="state"
                          id="state"
                          className="mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        >
                          <option value="">Select State</option>
                          <option value="state1">state 1</option>
                          <option value="state2">state 2</option>
                        </select>
                      </div>
                    </div>

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

export default EditBranchDetails;

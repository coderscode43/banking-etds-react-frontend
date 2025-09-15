import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import React, { useState } from "react";
import { Fragment } from "react";

const AddRegularReturnResponse = () => {
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
          <i className="fa-solid fa-plus"></i>&nbsp; Add Response
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
                <DialogPanel className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h2"
                    className="mb-5 text-lg leading-6 font-medium text-gray-900"
                  >
                    Add Regular Return Response
                  </DialogTitle>
                  <div className="justify-center">
                    <div className="w-full">
                      <label className="font-semibold text-[var(--primary-color)]">
                        Remark<span className="text-red-600">*</span>
                      </label>
                      <textarea
                        name="remark"
                        id="remark"
                        className="mt-1 block h-[50%] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                      />
                    </div>

                    <div className="w-full">
                      <label className="font-semibold text-[var(--primary-color)]">
                        Select Status<span className="text-red-600">*</span>
                      </label>
                      <select
                        name="status"
                        id="status"
                        className="mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                      >
                        <option value="">Status</option>
                        <option value="status1">status 1</option>
                        <option value="status2">status 2</option>
                        <option value="status3">status 3</option>
                      </select>
                    </div>

                    <div className="w-full">
                      <label className="font-semibold text-[var(--primary-color)]">
                        Supporting Document
                      </label>
                      <input
                        type="file"
                        name="supportDocument"
                        id="supportDocument"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                      />
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
                      Add
                    </button>

                    <button
                      onClick={closeModal}
                      className="cursor-pointer rounded-md bg-red-600 p-2 px-4 font-semibold text-white"
                    >
                      No
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

export default AddRegularReturnResponse;

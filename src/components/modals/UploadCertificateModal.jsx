import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import React, { useState, useContext } from "react";
import { TooltipWrapper } from "@/components/component/Tooltip";
import staticDataContext from "@/context/staticDataContext";
import { Fragment } from "react";

const AddRegularReturnResponse = () => {
  let [isOpen, setIsOpen] = useState(false);
  const { Tan, typeOfCertificate, financialYear, Quarter } =
    useContext(staticDataContext);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <div className="flex items-center justify-center">
        <TooltipWrapper tooltipText="Upload Button">
          <button
            onClick={openModal}
            className="h-[38px] cursor-pointer rounded-sm bg-[#f5325c] px-3 text-2xl font-black text-white"
          >
            <i className="fa-solid fa-upload"></i>
          </button>
        </TooltipWrapper>
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
                <DialogPanel className="relative w-full max-w-md transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h2"
                    className="mb-5 bg-[#eaf0f9] p-[5%] text-lg leading-6 font-medium text-gray-900"
                  >
                    Upload Certificate
                  </DialogTitle>
                  <div className="justify-center px-5">
                    <div className="mt-3 w-full">
                      <label className="font-semibold text-[var(--primary-color)]">
                        TAN Number<span className="text-red-600">*</span>
                      </label>
                      <select
                        name="tan"
                        id="tan"
                        className="mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                      >
                        <option value="">Select TAN No.</option>
                        {Tan &&
                          Tan.length > 0 &&
                          Tan.map((tan, index) => {
                            return (
                              <option key={index} value={tan}>
                                {tan}
                              </option>
                            );
                          })}
                      </select>
                    </div>

                    <div className="mt-3 w-full">
                      <label className="font-semibold text-[var(--primary-color)]">
                        Type of Certificate
                        <span className="text-red-600">*</span>
                      </label>
                      <select
                        name="typeofCertificate"
                        id="typeofCertificate"
                        className="mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                      >
                        <option value="">Select Certificate</option>
                        {typeOfCertificate &&
                          typeOfCertificate.length > 0 &&
                          typeOfCertificate.map((certificate, index) => {
                            return (
                              <option key={index} value={certificate}>
                                {certificate}
                              </option>
                            );
                          })}
                      </select>
                    </div>

                    <div className="mt-3 w-full">
                      <label className="font-semibold text-[var(--primary-color)]">
                        Financial Year<span className="text-red-600">*</span>
                      </label>
                      <select
                        name="financialYear"
                        id="financialYear"
                        className="mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                      >
                        <option value="">Select Financial Year</option>
                        {financialYear &&
                          financialYear.length > 0 &&
                          financialYear.map((fy, index) => {
                            return (
                              <option key={index} value={fy}>
                                {fy}
                              </option>
                            );
                          })}
                      </select>
                    </div>

                    <div className="mt-3 w-full">
                      <label className="font-semibold text-[var(--primary-color)]">
                        Quarter<span className="text-red-600">*</span>
                      </label>
                      <select
                        name="quarter"
                        id="quarter"
                        className="mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                      >
                        <option value="">Select Quarter</option>
                        {Quarter &&
                          Quarter.length > 0 &&
                          Quarter.map((qtr, index) => {
                            return (
                              <option key={index} value={qtr}>
                                {qtr}
                              </option>
                            );
                          })}
                      </select>
                    </div>

                    <div className="mt-3 w-full">
                      <label className="font-semibold text-[var(--primary-color)]">
                        Upload Certificate
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="file"
                        name="supportDocument"
                        id="supportDocument"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                      />
                    </div>

                    <div
                      className="absolute top-6 right-6 cursor-pointer"
                      onClick={closeModal}
                    >
                      <i className="fa-solid fa-x"></i>
                    </div>
                  </div>

                  <div className="mt-5 flex justify-end bg-[#eaf0f9] p-[4%]">
                    <button className="mr-2.5 cursor-pointer rounded-md bg-[#1761fd] p-2 px-4 font-semibold text-white">
                      Upload
                    </button>

                    <button
                      onClick={closeModal}
                      className="cursor-pointer rounded-md bg-red-600 p-2 px-4 font-semibold text-white"
                    >
                      Cancel
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

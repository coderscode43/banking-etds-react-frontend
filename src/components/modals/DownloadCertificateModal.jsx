import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import React, { useState } from "react";
import { Fragment } from "react";

const DownloadCertificateModal = () => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <div>
        <button
          type="button"
          onClick={openModal}
          className="cursor-pointer rounded-md bg-[#00c950] p-2 px-4 font-semibold text-white"
        >
          <i className="fa-solid fa-plus"></i>&nbsp; Download
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
                <DialogPanel className="relative w-full max-w-sm transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all">
                  <div className="bg-[#eaf0f9] p-[6%]">
                    <DialogTitle
                      as="h1"
                      className="text-center text-[22px] leading-6 font-medium text-red-500"
                    >
                      <img
                        className="errorImage absolute top-[22px] left-5 h-6"
                        src="/images/error.png"
                        alt="error image"
                      />
                      Certificate not available!
                    </DialogTitle>
                  </div>

                  <div className="mt-8 justify-center">
                    <p className="text-center text-[18px] leading-normal text-[#303e67]">
                      File not found for this PAN Number.
                    </p>
                  </div>

                  <div className="mt-7 flex justify-end bg-[#eaf0f9] p-[3%]">
                    <button
                      onClick={closeModal}
                      className="cursor-pointer rounded-md bg-blue-500 p-2 px-3 font-semibold text-white"
                    >
                      Ok
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

export default DownloadCertificateModal;

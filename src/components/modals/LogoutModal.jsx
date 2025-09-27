import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

export default function LogoutModal({ isOpen, onClose }) {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={onClose}
    >
      {/* Overlay with light semi-transparent background */}
      <div className="fixed inset-0 bg-black/10" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-sm rounded-md bg-white shadow-lg">
            <div className="bg-[#eaf0f9] p-[6%]">
              <DialogTitle
                as="h1"
                className="text-center text-[25px] leading-6 font-medium text-[#101828]"
              >
                Are you sure?
              </DialogTitle>
            </div>

            <div className="mt-8 justify-center">
              <p className="text-center text-[20px] leading-normal text-[#303e67]">
                Do you want to logout !!!
              </p>
            </div>

            <div className="mt-7 flex justify-end bg-[#eaf0f9] p-[3%]">
              <button className="mr-2.5 cursor-pointer rounded-md bg-[#03d87f] p-2 px-4 font-semibold text-white">
                Yes
              </button>
              <button
                onClick={onClose}
                className="cursor-pointer rounded-md bg-[#f5325c] p-2 px-3 font-semibold text-white"
              >
                No
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

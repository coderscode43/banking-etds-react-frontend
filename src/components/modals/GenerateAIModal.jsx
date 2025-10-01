import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

export default function GenerateAIModal({ isOpen, onClose }) {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={() => {}}
    >
      {/* Overlay with light semi-transparent background */}
      <div className="fixed inset-0 bg-black/10" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="absolute right-3 bottom-2 h-[450px] w-full max-w-sm rounded-md bg-white p-3 shadow-lg">
            <div>
              <DialogTitle
                as="h1"
                className="text-center text-[25px] leading-6 font-medium text-[#101828]"
              ></DialogTitle>
            </div>

            <div className="mb-3 flex items-center justify-around gap-3">
              <div className="rounded-xl border border-[#cccccc] p-2 font-semibold text-[#404d64]">
                <span>
                  Generate Data <br /> with AI
                </span>{" "}
                <i className="fa-solid fa-robot m-1"></i>
              </div>
              <div>
                <button className="flex cursor-pointer items-center gap-2 rounded-md border-[#9ba7ca] bg-[#9ba7ca] px-2 py-2 font-semibold text-[#ffff]">
                  <i className="fa-solid fa-comment"></i> <span>New Chat</span>
                </button>
              </div>
              <div>
                <i
                  onClick={onClose}
                  className="fa-solid fa-x mt-5 cursor-pointer rounded-md border border-[#9ba7ca] p-2 text-[#8d94a2]"
                ></i>
              </div>
            </div>
            <hr className="border-t-2 border-[#eaf0f9]" />

            <div className="mt-[83%] flex justify-end">
              <span>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Type your prompt here..."
                  className="h-[40px] w-[98%] rounded-md border border-[#9ba7ca] p-3 text-[#404d64] placeholder-[#404d64] focus:outline-none"
                />
              </span>

              <button className="cursor-pointer rounded-md bg-blue-600 p-2 px-4 font-semibold text-white">
                send
              </button>
            </div>

            {/* <div className="mt-7 flex justify-end bg-[#eaf0f9] p-[3%]">
              <button className="mr-2.5 cursor-pointer rounded-md bg-[#03d87f] p-2 px-4 font-semibold text-white">
                Yes
              </button>
              <button
                onClick={onClose}
                className="cursor-pointer rounded-md bg-[#f5325c] p-2 px-3 font-semibold text-white"
              >
                No
              </button>
            </div> */}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

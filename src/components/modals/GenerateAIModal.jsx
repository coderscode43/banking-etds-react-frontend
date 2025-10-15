import { Dialog, DialogPanel, TransitionChild } from "@headlessui/react";
import { Fragment } from "react";
import chatbotImg from "/public/images/chatbot.png";

export default function GenerateAIModal({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} as="div" className="relative z-10" onClose={() => {}}>
      {/* Overlay */}
      <TransitionChild
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0" />
      </TransitionChild>

      {/* Modal Panel */}
      <div className="fixed inset-0 flex items-end justify-end p-4">
        <TransitionChild
          as={Fragment}
          enter="transform transition duration-700 ease-out"
          enterFrom="translate-x-full opacity-0"
          enterTo="translate-x-0 opacity-100"
          leave="transform transition duration-500 ease-in"
          leaveFrom="translate-x-0 opacity-100"
          leaveTo="translate-x-full opacity-0"
        >
          <DialogPanel className="ring-opacity-5 relative flex h-[90vh] w-full max-w-sm flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-5 right-4 z-10 text-gray-600 hover:text-gray-800"
            >
              <i className="fa-solid fa-xmark cursor-pointer text-xl text-white"></i>
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 rounded-t-2xl bg-gradient-to-r from-blue-500 to-blue-700 px-6 py-4 text-white shadow-sm">
              <div className="flex-shrink-0 rounded-full bg-white p-2">
                <img src={chatbotImg} alt="AI Chatbot" className="h-8 w-8" />
              </div>
              <div className="ml-2 text-lg font-semibold">
                Chat with TAXO AI
                <div className="flex items-center text-sm text-blue-100">
                  <span className="mr-1 h-2 w-2 rounded-full bg-green-400"></span>
                  Online
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow space-y-3 overflow-y-auto px-4 py-4">
              {/* AI Message */}
              <div className="w-fit max-w-[80%] rounded-lg bg-blue-100 px-4 py-3 text-blue-900 shadow">
                <p>
                  <strong>AI:</strong> Hey! How can I help you?
                </p>
              </div>

              {/* User Message */}
              <div className="ml-auto w-fit max-w-[80%] rounded-lg bg-gray-100 px-4 py-3 text-gray-800 shadow">
                <p>
                  <strong>You:</strong> What is data?
                </p>
              </div>

              {/* Typing Indicator (optional) */}
              <div className="w-fit max-w-[80%] rounded-lg bg-blue-100 px-4 py-2 text-blue-900 shadow">
                <div className="flex space-x-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500"></span>
                  <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 delay-75"></span>
                  <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 delay-150"></span>
                </div>
              </div>
            </div>

            {/* Input Box */}
            <div className="border-t border-gray-200 bg-white px-4 py-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-grow rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-800 placeholder-gray-700 shadow-sm focus:outline-none"
                />
                <button
                  className="w-[15%] cursor-pointer rounded-full bg-blue-600 p-1.5 text-white transition hover:bg-blue-700"
                  aria-label="Send message"
                >
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  );
}

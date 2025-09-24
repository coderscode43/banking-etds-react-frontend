import React from "react";

const ErrorModal = ({ errorModal, setErrorModal, errorMessage }) => {
  const closeModal = () => setErrorModal(false);

  return (
    <div
      className={`bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/20 transition-opacity duration-300 ${
        errorModal ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="relative w-full max-w-[18rem] rounded-md bg-white shadow-xl transition-all">
        {/* Header with image */}
        <div className="flex flex-col items-center justify-center rounded-t-md bg-[#e3efff] p-4 text-center">
          <img
            src="/images/errorNew.png"
            alt="Error"
            className="mb-2 h-20 w-20 object-contain"
          />
          <p className="text-3xl antialiased">Error</p>
        </div>

        {/* Error message */}
        <div className="relative px-6 py-4 text-gray-700">{errorMessage}</div>

        {/* Footer */}
        <div className="flex justify-center rounded-b-md bg-[#e3efff] p-4">
          <button
            onClick={closeModal}
            className="rounded-md bg-[#fd1717] px-4 py-2 font-medium text-white hover:bg-red-600"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;

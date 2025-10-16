import React from "react";

const RequestGenerateZipModal = ({ isModalOpen, closeZipModal }) => {
  return (
    <div
      className={`fixed inset-0 z-20 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${
        isModalOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="relative w-full max-w-[20rem] rounded-2xl bg-white px-4 py-6 shadow-xl transition-all">
        <div className="absolute top-4 right-4 cursor-pointer"></div>
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <div className="rounded-full-100 p-1">
            <i className="fa-solid fa-circle-check text-5xl text-green-600"></i>
          </div>

          <p className="text-xl font-medium">
            Request generated successfully!!!
          </p>
        </div>

        <div className="relative pt-1.5 pb-6 text-center text-gray-600">
          <p>Zip will be available in 2 hours for download</p>
        </div>

        <div className="flex w-full justify-between rounded-b-md">
          <button
            onClick={() => {
              closeZipModal();
            }}
            className="mx-auto mb-[1%] w-[50%] cursor-pointer rounded-lg bg-green-600 py-2 font-medium text-white hover:bg-green-500"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestGenerateZipModal;

const BulkUploadModal = ({ isOpen, onClose }) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        } `}
      >
        <div className="relative w-full max-w-lg rounded-md bg-white shadow-lg">
          {/* Modal Header */}
          <div className="flex items-center justify-between rounded-t-md bg-blue-100 px-4 py-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Generate Zip Files
            </h2>
            <button onClick={onClose}>
              <i className="fa-solid fa-xmark cursor-pointer text-xl text-gray-600" />
            </button>
          </div>

          {/* Modal Form */}
          <div className="space-y-4 p-6">
            {/* Type of Certificate */}
            <div>
              <label className="font-semibold text-[var(--primary-color)]">
                Add Document
              </label>
              <input
                type="file"
                className="mt-1 w-full cursor-pointer rounded-md border border-gray-300 px-3 py-2"
              />
              {/* <ErrorMessage error={errors.form} /> */}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-3 rounded-b-md bg-blue-100 px-4 py-4">
            <button
              type="submit"
              className="cursor-pointer rounded-md bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-500"
            >
              Upload
            </button>
            <button
              type="button"
              className="cursor-pointer rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-500"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BulkUploadModal;

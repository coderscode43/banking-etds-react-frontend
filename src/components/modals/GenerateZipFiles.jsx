import { useContext, useState } from "react";
import common from "@/common/common";
import ErrorMessage from "@/components/component/ErrorMessage";
import RequestGenerateZipModal from "@/components/modals/RequestGenerateZipModal";
import staticDataContext from "@/context/staticDataContext";
import useLockBodyScroll from "@/hooks/useLockBodyScroll";

const GenerateZipFiles = () => {
  const entity = "downloadCertificate";

  const { typeOfCertificate, financialYear, Quarter } =
    useContext(staticDataContext);

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [showGenerateZipModal, setGenerateZipModal] = useState(false);
  useLockBodyScroll(isOpen);

  const closeZipModal = () => setGenerateZipModal(false);

  const validate = (data) => {
    const newErrors = {};

    const prettyFieldName = (field) =>
      field
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());

    const requiredFields = ["form", "fy", "quarter"];

    requiredFields.forEach((field) => {
      if (!data[field] || data[field].trim() === "") {
        newErrors[field] = `${prettyFieldName(field)} is required`;
      }
    });

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (!name) return;

    setFormData((prev) => ({ ...prev, [name]: value }));

    const fieldError = validate({ ...formData, [name]: value })[name];

    setErrors((prev) => {
      const { [name]: _removed, ...rest } = prev;
      return fieldError ? { ...rest, [name]: fieldError } : rest;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await common.getGenerateZipFile(entity, formData);
      setIsOpen(false);
      setFormData({});
      setErrors({});
      setGenerateZipModal(true);
    } catch (error) {
      setFormData({});
      setErrors({});
      console.error(error);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <div className="flex items-center justify-center">
        <button
          onClick={() => setIsOpen(true)}
          className="h-[38px] cursor-pointer rounded-sm bg-[#dc143c] px-2 text-white"
        >
          Generate Zip Files
        </button>
      </div>

      {/* Custom Modal */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="relative w-full max-w-lg rounded-md bg-white shadow-lg">
          {/* Modal Header */}
          <div className="flex items-center justify-between rounded-t-md bg-blue-100 px-6 py-5">
            <h2 className="text-lg font-semibold text-gray-800">
              Generate Zip Files
            </h2>
            <button
              onClick={() => {
                setIsOpen(false);
                setFormData({});
                setErrors({});
              }}
            >
              <i className="fa-solid fa-xmark cursor-pointer text-xl text-gray-600" />
            </button>
          </div>

          {/* Modal Form */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-4 p-6">
              {/* Type of Certificate */}
              <div>
                <label className="font-semibold text-[var(--primary-color)]">
                  Type of Certificate <span className="text-red-600">*</span>
                </label>
                <select
                  name="form"
                  value={formData.form || ""}
                  onChange={handleInputChange}
                  className="mt-1 w-full cursor-pointer rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="">Select Certificate</option>
                  {typeOfCertificate?.map((type, idx) => (
                    <option key={idx} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <ErrorMessage error={errors.form} />
              </div>

              {/* Financial Year */}
              <div>
                <label className="font-semibold text-[var(--primary-color)]">
                  Financial Year <span className="text-red-600">*</span>
                </label>
                <select
                  name="fy"
                  value={formData.fy || ""}
                  onChange={handleInputChange}
                  className="mt-1 w-full cursor-pointer rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="">Select Financial Year</option>
                  {financialYear?.map((fy, idx) => (
                    <option key={idx} value={fy}>
                      {fy}
                    </option>
                  ))}
                </select>
                <ErrorMessage error={errors.fy} />
              </div>

              {/* Quarter */}
              <div>
                <label className="font-semibold text-[var(--primary-color)]">
                  Quarter <span className="text-red-600">*</span>
                </label>
                <select
                  name="quarter"
                  value={formData.quarter || ""}
                  onChange={handleInputChange}
                  className="mt-1 w-full cursor-pointer rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="">Select Quarter</option>
                  {Quarter?.map((qtr, idx) => (
                    <option key={idx} value={qtr}>
                      {qtr}
                    </option>
                  ))}
                </select>
                <ErrorMessage error={errors.quarter} />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 rounded-b-md bg-blue-100 px-6 py-4">
              <button
                type="submit"
                className="cursor-pointer rounded-md bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-500"
              >
                Generate Zip
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setFormData({});
                  setErrors({});
                }}
                className="cursor-pointer rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal (Assumed existing component) */}
      <RequestGenerateZipModal
        closeZipModal={closeZipModal}
        isModalOpen={showGenerateZipModal}
      />
    </>
  );
};

export default GenerateZipFiles;

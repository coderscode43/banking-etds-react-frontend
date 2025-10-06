import common from "@/common/common";
import ErrorMessage from "@/components/component/ErrorMessage";
import RequestGenerateZipModal from "@/components/modals/RequestGenerateZipModal";
import staticDataContext from "@/context/staticDataContext";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useContext, useState } from "react";

const GenerateZipFiles = () => {
  const entity = "downloadCertificate";

  const { typeOfCertificate, financialYear, Quarter } =
    useContext(staticDataContext);

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [showGenerateZipModal, setGenerateZipModal] = useState(false);

  const closeZipModal = () => setGenerateZipModal(false);

  const validate = (data) => {
    const newErrors = {};

    // Helper function to prettify field names
    const prettyFieldName = (field) => {
      return field
        .replace(/([A-Z])/g, " $1") // add space before uppercase letters
        .replace(/^./, (str) => str.toUpperCase()); // capitalize first letter
    };

    const requiredFields = ["form", "fy", "quarter"];

    requiredFields.forEach((field) => {
      if (!data[field] || data[field].trim() === "") {
        newErrors[field] = `${prettyFieldName(field)} is required`;
      }
    });

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      await common.getGenerateZipFile(entity, formData);
      setIsOpen(false);
      setGenerateZipModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (!name) return;

    // Update form data
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate just this field inside full form context
    const fieldError = validate({ ...formData, [name]: value })[name];

    // Cleanly update errors: overwrite if error exists, remove key if no error
    setErrors((prev) => {
      const { [name]: _removed, ...rest } = prev; // remove old error for this field
      return fieldError ? { ...rest, [name]: fieldError } : rest;
    });
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          onClick={() => setIsOpen(true)}
          className="h-[38px] cursor-pointer rounded-sm bg-[#dc143c] px-2 text-white"
        >
          Generate Zip Files
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
                <DialogPanel className="relative w-full max-w-md transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h2"
                    className="mb-5 bg-[#eaf0f9] p-[5%] text-lg leading-6 font-medium text-gray-900"
                  >
                    Generate Zip Files
                  </DialogTitle>
                  <div>
                    <form
                      className="space-y-3"
                      onSubmit={handleSubmit}
                      noValidate
                    >
                      <div className="justify-center px-5">
                        <div className="mt-3 w-full">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Type of Certificate
                            <span className="text-red-600">*</span>
                          </label>
                          <select
                            name="form"
                            id="form"
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                            value={formData.form || ""}
                            onChange={handleInputChange}
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
                          <ErrorMessage error={errors.form} />
                        </div>

                        <div className="mt-3 w-full">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Financial Year
                            <span className="text-red-600">*</span>
                          </label>
                          <select
                            name="fy"
                            id="fy"
                            className="custom-scrollbar mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                            value={formData.fy || ""}
                            onChange={handleInputChange}
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
                          <ErrorMessage error={errors.fy} />
                        </div>

                        <div className="mt-3 w-full">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Quarter<span className="text-red-600">*</span>
                          </label>
                          <select
                            name="quarter"
                            id="quarter"
                            className="custom-scrollbar mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                            value={formData.quarter || ""}
                            onChange={handleInputChange}
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
                          <ErrorMessage error={errors.quarter} />
                        </div>

                        <div
                          className="absolute top-6 right-6 cursor-pointer"
                          onClick={() => setIsOpen(false)}
                        >
                          <i className="fa-solid fa-x"></i>
                        </div>
                      </div>

                      <div className="mt-5 flex justify-end bg-[#eaf0f9] p-[4%]">
                        <button
                          type="submit"
                          className="mr-2.5 cursor-pointer rounded-md bg-[#03d87f] p-2 px-4 font-semibold text-white"
                        >
                          Generate Zip
                        </button>

                        <button
                          onClick={() => setIsOpen(false)}
                          className="cursor-pointer rounded-md bg-red-600 p-2 px-4 font-semibold text-white"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>

      <RequestGenerateZipModal
        closeZipModal={closeZipModal}
        isModalOpen={showGenerateZipModal}
      />
    </>
  );
};

export default GenerateZipFiles;

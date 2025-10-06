import common from "@/common/common";
import ErrorMessage from "@/components/component/ErrorMessage";
import { TooltipWrapper } from "@/components/component/Tooltip";
import staticDataContext from "@/context/staticDataContext";
import statusContext from "@/context/statusContext";
import { errorMessage } from "@/lib/utils";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useContext, useState } from "react";

const UploadCertificateModal = () => {
  const entity = "uploadCertificate";

  const { showSuccess, showError } = useContext(statusContext);
  const { Tan, typeOfCertificate, financialYear, Quarter } =
    useContext(staticDataContext);

  const [formData, setFormData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = (data) => {
    const newErrors = {};

    // Helper function to prettify field names
    const prettyFieldName = (field) => {
      return field
        .replace(/([A-Z])/g, " $1") // add space before uppercase letters
        .replace(/^./, (str) => str.toUpperCase()); // capitalize first letter
    };

    const requiredFields = [
      "tan",
      "typeofCertificate",
      "financialYear",
      "quarter",
      "blob",
    ];

    requiredFields.forEach((field) => {
      const value = data[field];

      if (field === "blob") {
        if (!value) {
          newErrors[field] = `Certificate is required`;
        }
      } else if (field === "typeofCertificate") {
        if (!value) {
          newErrors[field] = `Type of Certificate is required`;
        }
      } else {
        if (!value || (typeof value === "string" && value.trim() === "")) {
          newErrors[field] = `${prettyFieldName(field)} is required`;
        }
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

    let response;
    try {
      const formDataObj = new FormData();
      formDataObj.append("downloadFile", formData.blob);
      formDataObj.append("tan", formData.tan);
      formDataObj.append("typeofCertificate", formData.typeofCertificate);
      formDataObj.append("fy", formData.financialYear);
      formDataObj.append("quarter", formData.quarter);

      response = await common.getUploadCertificate(entity, formDataObj);
      showSuccess(response.data.message || "Uploaded Successfully!!!");
      setIsOpen(false);
    } catch (error) {
      showError(
        `Can not save  ${error?.response?.data?.entityName}  ${errorMessage(error)}`
      );
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (!name) return;

    const newValue = name === "blob" ? files[0] : value;

    // Update form data
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Validate just this field inside full form context
    const fieldError = validate({ ...formData, [name]: newValue })[name];

    // Cleanly update errors: overwrite if error exists, remove key if no error
    setErrors((prev) => {
      const { [name]: _removed, ...rest } = prev; // remove old error for this field
      return fieldError ? { ...rest, [name]: fieldError } : rest;
    });
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <TooltipWrapper tooltipText="Upload Button">
          <button
            onClick={() => setIsOpen(true)}
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
                <DialogPanel className="relative w-full max-w-lg transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h2"
                    className="mb-5 bg-[#eaf0f9] p-[5%] text-lg leading-6 font-medium text-gray-900"
                  >
                    Upload Certificate
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
                            TAN Number<span className="text-red-600">*</span>
                          </label>
                          <select
                            name="tan"
                            id="tan"
                            className="custom-scrollbar mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                            value={formData.tan || ""}
                            onChange={handleInputChange}
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
                          <ErrorMessage error={errors.tan} />
                        </div>

                        <div className="mt-3 w-full">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Type of Certificate
                            <span className="text-red-600">*</span>
                          </label>
                          <select
                            name="typeofCertificate"
                            id="typeofCertificate"
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                            value={formData.typeofCertificate || ""}
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
                          <ErrorMessage error={errors.typeofCertificate} />
                        </div>

                        <div className="mt-3 w-full">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Financial Year
                            <span className="text-red-600">*</span>
                          </label>
                          <select
                            name="financialYear"
                            id="financialYear"
                            className="custom-scrollbar mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                            value={formData.financialYear || ""}
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
                          <ErrorMessage error={errors.financialYear} />
                        </div>

                        <div className="mt-3 w-full">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Quarter<span className="text-red-600">*</span>
                          </label>
                          <select
                            name="quarter"
                            id="quarter"
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
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

                        <div className="mt-3 w-full">
                          <label className="font-semibold text-[var(--primary-color)]">
                            Upload Certificate
                            <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="file"
                            name="blob"
                            id="blob"
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                            onChange={handleInputChange}
                          />
                          <ErrorMessage error={errors.blob} />
                        </div>
                        <div className="text-[var(--primary-color)]">
                          <p className="text-[15px] font-bold">
                            For single file upload (.pdf) file
                          </p>
                          <p className="text-[15px] font-bold">
                            For bulk files upload (.zip) file
                          </p>
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
                          // onClick={() => setIsOpen(false)}
                          type="submit"
                          className="mr-2.5 cursor-pointer rounded-md bg-[#1761fd] p-2 px-4 font-semibold text-white"
                        >
                          Upload
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
    </>
  );
};

export default UploadCertificateModal;

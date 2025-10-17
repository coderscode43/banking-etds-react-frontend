import common from "@/common/common";
import ErrorMessage from "@/components/component/ErrorMessage";
import { TooltipWrapper } from "@/components/component/Tooltip";
import staticDataContext from "@/context/staticDataContext";
import statusContext from "@/context/statusContext";
import useLockBodyScroll from "@/hooks/useLockBodyScroll";
import { errorMessage } from "@/lib/utils";
import { useContext, useState } from "react";

const UploadCertificateModal = () => {
  const entity = "uploadCertificate";

  const { showSuccess, showError } = useContext(statusContext);
  const { Tan, typeOfCertificate, financialYear, Quarter } =
    useContext(staticDataContext);

  const [formData, setFormData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({});
  useLockBodyScroll(isOpen);

  const validate = (data) => {
    const newErrors = {};
    const prettyFieldName = (field) =>
      field
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());

    const requiredFields = [
      "tan",
      "typeofCertificate",
      "financialYear",
      "quarter",
      "blob",
    ];

    requiredFields.forEach((field) => {
      const value = data[field];
      if (field === "blob" && !value) {
        newErrors[field] = `Certificate is required`;
      } else if (field === "typeofCertificate" && !value) {
        newErrors[field] = `Type of Certificate is required`;
      } else if (!value || (typeof value === "string" && value.trim() === "")) {
        newErrors[field] = `${prettyFieldName(field)} is required`;
      }
    });

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = name === "blob" ? files[0] : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    const fieldError = validate({ ...formData, [name]: newValue })[name];
    setErrors((prev) => {
      const { [name]: _, ...rest } = prev;
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

    setErrors({});

    try {
      const formDataObj = new FormData();
      formDataObj.append("downloadFile", formData.blob);
      formDataObj.append("tan", formData.tan);
      formDataObj.append("typeofCertificate", formData.typeofCertificate);
      formDataObj.append("fy", formData.financialYear);
      formDataObj.append("quarter", formData.quarter);

      const response = await common.getUploadCertificate(entity, formDataObj);
      setIsOpen(false);
      setFormData({});
      setErrors({});
      showSuccess(response.data.successMsg || "Uploaded Successfully!!!");
    } catch (error) {
      setIsOpen(false);
      setFormData({});
      setErrors({});
      showError(
        `Can not save ${error?.response?.data?.entityName} ${errorMessage(error)}`
      );
    }
  };

  return (
    <>
      {/* Upload Button */}
      <TooltipWrapper tooltipText="Upload Button">
        <button
          onClick={() => {
            setFormData({});
            setErrors({});
            setIsOpen(true);
          }}
          className="h-[38px] cursor-pointer rounded-sm bg-[#f5325c] px-3 text-2xl font-black text-white"
        >
          <i className="fa-solid fa-upload"></i>
        </button>
      </TooltipWrapper>

      {/* Modal Overlay */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Modal Box */}
        <div className="relative max-h-[95vh] w-full max-w-lg overflow-y-auto rounded-md bg-white shadow-xl">
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-md bg-blue-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Upload Certificate
            </h2>
            <button
              onClick={() => {
                setIsOpen(false);
                setFormData({});
                setErrors({});
              }}
            >
              <i className="fa-solid fa-xmark cursor-pointer text-xl"></i>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="p-5">
              {/* TAN Number */}
              <div>
                <label className="font-semibold text-[var(--primary-color)]">
                  TAN Number <span className="text-red-600">*</span>
                </label>
                <select
                  name="tan"
                  value={formData.tan || ""}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="">Select TAN No.</option>
                  {Tan?.map((tan, i) => (
                    <option key={i} value={tan}>
                      {tan}
                    </option>
                  ))}
                </select>
                <ErrorMessage error={errors.tan} />
              </div>

              {/* Type of Certificate */}
              <div className="mt-2">
                <label className="font-semibold text-[var(--primary-color)]">
                  Type of Certificate <span className="text-red-600">*</span>
                </label>
                <select
                  name="typeofCertificate"
                  value={formData.typeofCertificate || ""}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="">Select Certificate</option>
                  {typeOfCertificate?.map((type, i) => (
                    <option key={i} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <ErrorMessage error={errors.typeofCertificate} />
              </div>

              {/* Financial Year */}
              <div className="mt-2">
                <label className="font-semibold text-[var(--primary-color)]">
                  Financial Year <span className="text-red-600">*</span>
                </label>
                <select
                  name="financialYear"
                  value={formData.financialYear || ""}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="">Select Financial Year</option>
                  {financialYear?.map((fy, i) => (
                    <option key={i} value={fy}>
                      {fy}
                    </option>
                  ))}
                </select>
                <ErrorMessage error={errors.financialYear} />
              </div>

              {/* Quarter */}
              <div className="mt-2">
                <label className="font-semibold text-[var(--primary-color)]">
                  Quarter <span className="text-red-600">*</span>
                </label>
                <select
                  name="quarter"
                  value={formData.quarter || ""}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="">Select Quarter</option>
                  {Quarter?.map((qtr, i) => (
                    <option key={i} value={qtr}>
                      {qtr}
                    </option>
                  ))}
                </select>
                <ErrorMessage error={errors.quarter} />
              </div>

              {/* Upload File */}
              <div className="mt-2">
                <label className="font-semibold text-[var(--primary-color)]">
                  Upload Certificate <span className="text-red-600">*</span>
                </label>
                <input
                  type="file"
                  name="blob"
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
                <ErrorMessage error={errors.blob} />
              </div>

              {/* Instructions */}
              <div className="text-sm text-[var(--primary-color)]">
                <p className="font-bold">For single file upload: .pdf file</p>
                <p className="font-bold">For bulk file upload: .zip file</p>
              </div>
            </div>

            {/* Actions */}
            <div className="sticky bottom-0 z-10 flex justify-end gap-3 bg-blue-100 p-5">
              <button
                type="submit"
                className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-500"
              >
                Upload
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
    </>
  );
};

export default UploadCertificateModal;

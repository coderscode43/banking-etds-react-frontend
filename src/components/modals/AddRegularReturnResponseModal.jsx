import common from "@/common/common";
import staticDataContext from "@/context/staticDataContext";
import statusContext from "@/context/statusContext";
import { errorMessage } from "@/lib/utils";
import { useContext, useState } from "react";
import ErrorMessage from "../component/ErrorMessage";

const AddRegularReturnResponse = ({ regularReturnId, status }) => {
  const entity = "regularReturnRemark";

  const { regularReturnStatus } = useContext(staticDataContext);
  const { showSuccess, showError } = useContext(statusContext);

  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({});
  let [formData, setFormData] = useState({
    remark: "",
    remarkStatus: "",
    blob: "",
  });

  const validate = (data) => {
    const newErrors = {};

    // Helper function to prettify field names
    const prettyFieldName = (field) => {
      return field
        .replace(/([A-Z])/g, " $1") // add space before uppercase letters
        .replace(/^./, (str) => str.toUpperCase()); // capitalize first letter
    };

    const requiredFields = ["remark", "remarkStatus"];

    requiredFields.forEach((field) => {
      if (!data[field] || data[field].trim() === "") {
        newErrors[field] = `Please enter a valid ${prettyFieldName(field)}`;
      }
    });

    // Conditionally validate returnFilingDate only if remarkStatus === "Return filed"
    if (data.remarkStatus === "Return filed") {
      if (!data.returnFilingDate || data.returnFilingDate.trim() === "") {
        newErrors.returnFilingDate = "Please enter a Return Filing Date";
      }
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (!name) return;

    // If file input, grab File object; else use value
    const fieldValue = name === "blob" ? files[0] : value;

    // Update form data
    setFormData((prev) => ({
      regularReturnId: regularReturnId,
      ...prev,
      [name]: fieldValue,
    }));

    // Validate just this field inside full form context
    const fieldError = validate({ ...formData, [name]: value })[name];

    // Cleanly update errors: overwrite if error exists, remove key if no error
    setErrors((prev) => {
      const { [name]: _removed, ...rest } = prev; // remove old error for this field
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
    let response;
    try {
      formData = common.convertToDateObject(formData);
      const formDataObj = new FormData();
      if (formData.blob === null || formData.blob === undefined) {
        response = await common.getSubmit(entity, formData);
      } else {
        formDataObj.append("blob", formData.blob);
        delete formData.blob;
        formDataObj.append("dec", JSON.stringify(formData));
        response = await common.getSubmitWithFile(entity, formDataObj);
      }

      setIsOpen(false);
      showSuccess(response.data.successMsg);
      setFormData({
        remark: "",
        remarkStatus: "",
        returnFilingDate: "",
        blob: "",
      });
    } catch (error) {
      showError(
        `Can not save ${error?.response?.data?.entityName}  ${errorMessage(error)}`
      );
      console.log(error);
    }
  };

  return (
    <>
      {/* Trigger Button - shown only if status !== 'Certificate Generated' */}
      {status !== "Certificate Generated" && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="cursor-pointer rounded-md bg-blue-600 p-2 px-4 font-semibold text-white"
        >
          <i className="fa-solid fa-plus"></i>&nbsp; Add Response
        </button>
      )}

      {/* Modal */}
      <div
        className={`bg-opacity-50 fixed inset-0 z-10 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${
          isOpen
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      >
        <div
          className="relative w-full max-w-md rounded-md bg-white shadow-xl transition-all"
          onClick={(e) => e.stopPropagation()} // Prevent modal close on clicking inside
        >
          {/* Header */}
          <div className="mb-5 rounded-t-md bg-[#eaf0f9] px-6 pt-6 pb-3 text-left">
            <h2 className="text-lg font-medium text-gray-800">
              Add Regular Return Response
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-5 cursor-pointer text-gray-600 hover:text-gray-900"
              aria-label="Close modal"
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-4 px-6">
              <div>
                <label
                  htmlFor="remark"
                  className="block font-semibold text-[var(--primary-color)]"
                >
                  Remark<span className="text-red-600">*</span>
                </label>
                <textarea
                  id="remark"
                  name="remark"
                  placeholder="Remark"
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                  maxLength={100}
                  value={formData.remark || ""}
                  onChange={handleInputChange}
                />
                <ErrorMessage error={errors.remark} />
              </div>

              <div>
                <label
                  htmlFor="remarkStatus"
                  className="block font-semibold text-[var(--primary-color)]"
                >
                  Select Status<span className="text-red-600">*</span>
                </label>
                <select
                  id="remarkStatus"
                  name="remarkStatus"
                  className="custom-scrollbar mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                  value={formData.remarkStatus || ""}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  {regularReturnStatus?.map((status, idx) => (
                    <option key={idx} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <ErrorMessage error={errors.remarkStatus} />
              </div>

              {formData.remarkStatus === "Return filed" && (
                <div>
                  <label
                    htmlFor="returnFilingDate"
                    className="block font-semibold text-[var(--primary-color)]"
                  >
                    Return Filing Date<span className="text-red-600">*</span>
                  </label>
                  <input
                    id="returnFilingDate"
                    name="returnFilingDate"
                    type="date"
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                    value={formData.returnFilingDate || ""}
                    onChange={handleInputChange}
                  />
                  <ErrorMessage error={errors.returnFilingDate} />
                </div>
              )}

              <div>
                <label
                  htmlFor="blob"
                  className="block font-semibold text-[var(--primary-color)]"
                >
                  Supporting Document
                </label>
                <input
                  id="blob"
                  name="blob"
                  type="file"
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-end space-x-3 rounded-b-md bg-[#eaf0f9] px-6 pt-4 pb-5">
              <button
                className="cursor-pointer rounded-md bg-[#1761fd] px-4 py-2 font-semibold text-white hover:bg-blue-700"
                type="submit"
              >
                Add
              </button>
              <button
                className="cursor-pointer rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
                onClick={() => setIsOpen(false)}
              >
                No
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddRegularReturnResponse;

import common from "@/common/common";
import statusContext from "@/context/statusContext";
import { errorMessage } from "@/lib/utils";
import { useContext, useState } from "react";
import ErrorMessage from "../component/ErrorMessage";

const AddResponseModal = ({
  entity,
  branchCode,
  correctionRequestId,
  fy,
  detail,
}) => {
  const quarter = detail?.quarter;
  const status = detail?.status;
  const { showSuccess, showError } = useContext(statusContext);

  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({});
  let [formData, setFormData] = useState({
    branchCode: branchCode,
    blob: null,
    correctionRemark: "",
    correctionRequestId: correctionRequestId,
    fy: fy,
    remarkStatus: "Remark",
    quarter: detail?.quarter || "",
  });

  // Validate only correctionRemark (required), blob optional
  const validate = (data) => {
    const newErrors = {};
    if (!data.correctionRemark || data.correctionRemark.trim() === "") {
      newErrors.correctionRemark = "Please enter a valid Response";
    }
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (!name) return;

    const fieldValue = name === "blob" ? files[0] : value;

    setFormData((prev) => ({
      quarter: quarter,
      correctionRequestId: correctionRequestId,
      ...prev,
      [name]: fieldValue,
    }));

    // Validate field
    const fieldError = validate({ ...formData, [name]: fieldValue })[name];

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
    setErrors({});

    try {
      let response;
      if (formData?.blob != null && formData?.blob != undefined) {
        const dat = new FormData();
        dat.append("downloadFile", formData?.blob);
        dat.append("branchCode", branchCode);
        dat.append("crId", correctionRequestId);
        dat.append("remark", formData?.correctionRemark);
        dat.append("status", formData?.remarkStatus);
        dat.append("fy", fy);
        dat.append("quarter", quarter);

        response = await common.getAddResponseWithFile(entity, dat);
      } else {
        delete formData.blob;
        response = await common.getAddResponse(entity, formData, quarter);
      }
      setIsOpen(false);
      showSuccess(response.data.successMsg);

      // Reset form
      setFormData({
        correctionRemark: "",
        blob: null,
      });
    } catch (error) {
      showError(
        `Cannot save ${error?.response?.data?.entityName} ${errorMessage(error)}`
      );
      console.error(error);
    }
  };

  return (
    <>
      {status !== "Rejected" &&
        status !== "Resolved" &&
        status !== "Sent for Correction" && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="cursor-pointer rounded-md border border-blue-500 px-2 py-2 font-semibold text-blue-500 transition hover:bg-blue-500 hover:text-white"
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
        onClick={() => setIsOpen(false)}
      >
        <div
          className="relative w-full max-w-md rounded-md bg-white shadow-xl transition-all"
          onClick={(e) => e.stopPropagation()} // prevent closing modal on inner click
        >
          {/* Header */}
          <div className="mb-5 rounded-t-md bg-[#eaf0f9] px-6 pt-6 pb-3 text-left">
            <h2 className="text-lg font-medium text-gray-800">
              Add Correction Request
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-5 cursor-pointer text-gray-600 hover:text-gray-900"
              aria-label="Close modal"
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-4 px-6">
              <div>
                <label
                  htmlFor="correctionRemark"
                  className="block font-semibold text-[var(--primary-color)]"
                >
                  Responses<span className="text-red-600">*</span>
                </label>
                <textarea
                  id="correctionRemark"
                  name="correctionRemark"
                  placeholder="Enter your response"
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                  maxLength={500}
                  value={formData.correctionRemark}
                  onChange={handleInputChange}
                />
                <ErrorMessage error={errors.correctionRemark} />
              </div>

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
                type="submit"
                className="cursor-pointer rounded-md bg-[#1761fd] px-4 py-2 font-semibold text-white hover:bg-blue-700"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="cursor-pointer rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
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

export default AddResponseModal;

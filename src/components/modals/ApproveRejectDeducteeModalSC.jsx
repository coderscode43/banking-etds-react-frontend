import { X } from "lucide-react";
import React from "react";
import { useState, useContext } from "react";
import common from "@/common/common";
import { errorMessage } from "@/lib/utils";
import statusContext from "@/context/statusContext";

import ErrorMessage from "@/components/component/ErrorMessage";

const ApproveRejectDeducteeModalSC = ({
  formTitle,
  entity,
  isModalOpen,
  closeModal,
  rowData,
  deducteeId,
}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const { showSuccess, showError } = useContext(statusContext);

  const validate = (data) => {
    const newErrors = {};
    const prettyFieldName = (field) =>
      field
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());

    if (
      data.typeOfAction === undefined ||
      data.typeOfAction === null ||
      (typeof data.typeOfAction === "string" && data.typeOfAction.trim() === "")
    ) {
      newErrors.typeOfAction = `${prettyFieldName("typeOfAction")} is required`;
    }

    if (data.typeOfAction === "Reject") {
      if (
        data.rejectRemark === undefined ||
        data.rejectRemark === null ||
        (typeof data.rejectRemark === "string" &&
          data.rejectRemark.trim() === "")
      ) {
        newErrors.rejectRemark = `Please enter valid remark`;
      }
    }

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

    const remarkId = rowData?.id;
    const jsonData = rowData?.formdata;
    let response;
    try {
      if (formData.typeOfAction === "Approved") {
        response = await common.getUpdateDeductee(
          entity,
          jsonData,
          remarkId,
          deducteeId
        );
        showSuccess(response.data.setSuccessMsg);
        closeModal();
      }
      // else if (formData.typeOfAction === "Reject"){

      // }
    } catch (error) {
      showError(`Can not update : ${errorMessage(error)}`);
      console.error("Error approving the request: " + error);
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
    <div
      className={`bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/40 ${
        isModalOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="w-[28rem] rounded-md bg-white shadow-lg">
        {/* Modal Header */}
        <div className="flex items-start justify-between rounded-t-md bg-blue-100 px-6 py-4">
          <p className="text-lg font-medium text-gray-800">
            Approve or Reject Form {formTitle} Deductee
          </p>
        </div>
        {/* Modal Body */}
        <form onSubmit={handleSubmit} noValidate className="">
          <div className="flex flex-col gap-3 bg-white px-6 py-4">
            <div>
              <label
                htmlFor="typeOfAction"
                className="font-semibold text-[var(--primary-color)]"
              >
                Action <span className="text-red-600">*</span>
              </label>
              <select
                name="typeOfAction"
                id="typeOfAction"
                value={formData.typeOfAction || ""}
                onChange={handleInputChange}
                className="custom-scrollbar mt-1 block w-full cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
              >
                <option value="">Select type of action</option>
                <option value="Approved">Approve</option>
                <option value="Reject">Reject</option>
              </select>
              <ErrorMessage error={errors.typeOfAction} />
            </div>
            {formData.typeOfAction === "Reject" && (
              <div>
                <label
                  htmlFor="rejectRemark"
                  className="font-semibold text-[var(--primary-color)]"
                >
                  Remark <span className="text-red-600">*</span>
                </label>
                <textarea
                  name="rejectRemark"
                  id="rejectRemark"
                  value={formData.rejectRemark || ""}
                  onChange={handleInputChange}
                  className="mt-1 block h-[10%] w-full cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                />
                <ErrorMessage error={errors.rejectRemark} />
              </div>
            )}
          </div>
          {/* Modal Footer */}
          <div className="flex justify-end gap-2 rounded-b-md bg-blue-100 px-6 py-4">
            <button
              type="submit"
              className="cursor-pointer rounded-lg bg-green-600 px-3 py-2 font-medium text-white hover:bg-green-500"
            >
              Update
            </button>
            <button
              type="button"
              className="cursor-pointer rounded-lg bg-[#d40008] px-3 py-2 font-medium text-white hover:bg-red-500"
              onClick={() => closeModal()}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApproveRejectDeducteeModalSC;

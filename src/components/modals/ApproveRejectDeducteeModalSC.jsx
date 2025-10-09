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
      className={`fixed inset-0 z-20 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${
        isModalOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="relative w-full max-w-[30rem] rounded-xl bg-white p-4 shadow-xl transition-all">
        <div className="absolute top-5 right-3 cursor-pointer">
          <X size={22} onClick={() => closeModal()} />
        </div>
        <div className="flex flex-col text-left">
          <p className="text-xl font-medium">
            Approve or Reject Form {formTitle} Deductee
          </p>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="relative my-5 text-gray-600">
            <label className="text-left text-lg font-semibold text-[var(--primary-color)]">
              Action <span className="text-red-600">*</span>
            </label>
            <select
              name="typeOfAction"
              id="typeOfAction"
              value={formData.typeOfAction || ""}
              onChange={handleInputChange}
              className="mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
            >
              <option value="">Select type of action</option>
              <option value="Approved">Approve</option>
              <option value="Reject">Reject</option>
            </select>
            <ErrorMessage error={errors.typeOfAction} />
          </div>

          {formData.typeOfAction === "Reject" && (
            <div className="my-5 text-gray-600">
              <label className="text-left text-lg font-semibold text-[var(--primary-color)]">
                Remark <span className="text-red-600">*</span>
              </label>
              <textarea
                name="rejectRemark"
                id="rejectRemark"
                value={formData.rejectRemark || ""}
                onChange={handleInputChange}
                className="mt-1 block h-[10%] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
              ></textarea>
              <ErrorMessage error={errors.rejectRemark} />
            </div>
          )}

          <div className="flex w-full justify-between rounded-b-md">
            <button
              type="submit"
              className="mx-2 w-full cursor-pointer rounded-lg bg-green-600 py-2 font-medium text-white hover:bg-green-500"
            >
              Update
            </button>
            <button
              type="button"
              className="mx-2 w-full cursor-pointer rounded-lg bg-[#d40008] py-2 font-medium text-white hover:bg-red-500"
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

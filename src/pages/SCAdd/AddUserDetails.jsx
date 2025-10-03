import common from "@/common/common";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import statusContext from "@/context/statusContext";
import { errorMessage } from "@/lib/utils";
import ErrorMessage from "@/components/component/ErrorMessage";

const AddUserDetails = () => {
  const entity = "userDetails";

  const navigate = useNavigate();
  const { showSuccess, showError } = useContext(statusContext);

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});

  const validate = (data) => {
    const newErrors = {};

    // Helper function to prettify field names
    const prettyFieldName = (field) => {
      return field
        .replace(/([A-Z])/g, " $1") // add space before uppercase letters
        .replace(/^./, (str) => str.toUpperCase()); // capitalize first letter
    };

    const requiredFields = ["employeeId", "typeOfUser"];

    requiredFields.forEach((field) => {
      if (!data[field] || data[field].trim() === "") {
        newErrors[field] = `${prettyFieldName(field)} is required`;
      }
    });

    // Custom validations for specific fields
    if (
      data.employeeId &&
      !/^[a-zA-Z0-9][a-zA-Z0-9 -_]*$/.test(data.employeeId)
    ) {
      newErrors.branchName = "Enter valid Employee ID";
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

    try {
      const response = await common.getSubmit(entity, formData);
      showSuccess(response.data.successMsg, "/home/list/userDetails");
    } catch (error) {
      showError(
        `Can not save ${error?.response?.data?.entityName}  ${errorMessage(error)}`
      );
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
      <div className="space-y-5 rounded-md p-4 text-[var(--primary-color)] shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
        <h1 className="text-2xl font-bold">Add User Details</h1>
        <form className="space-y-3" onSubmit={handleSubmit} noValidate>
          <div className="mt-4">
            <div>
              <div className="mb-3 flex gap-3">
                <div className="w-full md:w-1/2">
                  <label className="font-semibold text-[var(--primary-color)]">
                    Employee Id <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="employeeId"
                    id="employeeId"
                    placeholder="Employee Id"
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                    value={formData.employeeId || ""}
                    onChange={handleInputChange}
                  />
                  <ErrorMessage error={errors.employeeId} />
                </div>
                <div className="w-full md:w-1/2">
                  <label className="font-semibold text-[var(--primary-color)]">
                    Type Of User <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="typeOfUser"
                    id="typeOfUser"
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                    value={formData.typeOfUser || ""}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Type Of User</option>
                    <option value="admin">Admin</option>
                    <option value="Super Admin">Super Admin</option>
                  </select>
                  <ErrorMessage error={errors.typeOfUser} />
                </div>
              </div>
            </div>
            <div className="mt-3 flex justify-end-safe gap-3">
              <button
                type="submit"
                className="cursor-pointer rounded-md bg-green-600 p-2 px-4 font-semibold text-white"
              >
                <i className="fa-solid fa-floppy-disk"></i>&nbsp; Save
              </button>
              <button
                className="cursor-pointer rounded-md bg-red-600 p-2 px-4 font-semibold text-white"
                onClick={() => navigate(-1)}
              >
                <i className="fa-solid fa-reply-all"></i>&nbsp; Back
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddUserDetails;

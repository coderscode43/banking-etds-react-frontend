import common from "@/common/common";
import ErrorMessage from "@/components/component/ErrorMessage";
import staticDataContext from "@/context/staticDataContext";
import statusContext from "@/context/statusContext";
import { errorMessage } from "@/lib/utils";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBranch = () => {
  const entity = "branch";
  const navigate = useNavigate();

  const { State } = useContext(staticDataContext);
  const { showSuccess, showError } = useContext(statusContext);

  const [formData, setFormData] = useState({});
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
      "roCode",
      "branchCode",
      "branchName",
      "branchEmail",
      "branchContactNo",
      "branchAddress",
      "branchPinCode",
      "branchState",
    ];

    requiredFields.forEach((field) => {
      if (!data[field] || data[field].trim() === "") {
        newErrors[field] = `${prettyFieldName(field)} is required`;
      }
    });

    // Custom validations for specific fields
    if (data.roCode) {
      if (data.roCode.length > 10) {
        newErrors.roCode = "RO Code should not be greater than 10 digits";
      } else {
        const roCodePattern = /^[a-zA-Z0-9][a-zA-Z0-9 \\-]*$/;
        if (!roCodePattern.test(data.roCode)) {
          newErrors.roCode = "Enter a valid RO Code";
        }
      }
    }

    if (data.branchCode) {
      if (data.branchCode.length > 10) {
        newErrors.branchCode =
          "Branch Code should not be greater than 10 characters";
      } else {
        const branchCodePattern = /^[0-9]+$/;
        if (!branchCodePattern.test(data.branchCode)) {
          newErrors.branchCode = "Enter valid Branch Code";
        }
      }
    }

    if (
      data.branchName &&
      !/^[a-zA-Z0-9][a-zA-Z0-9\- ]+$/.test(data.branchName)
    ) {
      newErrors.branchName = "Enter valid Branch Name";
    }

    if (
      data.branchEmail &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.branchEmail)
    ) {
      newErrors.branchEmail = "Email ID is invalid";
    }

    if (data.branchContactNo && !/^[0-9]{10}$/.test(data.branchContactNo)) {
      newErrors.branchContactNo = "Enter Valid Branch Contact No";
    }

    if (data.branchAddress && data.branchAddress.length > 50) {
      newErrors.branchAddress =
        "Branch Address should not be Greater than 50 characters";
    }

    if (data.branchPinCode && !/^\d{6}$/.test(data.branchPinCode)) {
      newErrors.branchPinCode = "PinCode must be 6 digits";
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
      showSuccess(response.data.successMsg);
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
      <div className="space-y-5 rounded-md border border-gray-100 p-4 text-[var(--primary-color)] shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
        <h1 className="text-2xl font-bold">Add Branch</h1>
        <form className="space-y-3" onSubmit={handleSubmit} noValidate>
          {/* RO Code */}
          <div className="flex flex-col md:flex-row md:space-x-10">
            <div className="mb-4 flex-1 md:mb-0">
              <label htmlFor="roCode" className="mb-1 block font-semibold">
                RO Code <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="roCode"
                name="roCode"
                placeholder="RO Code"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                value={formData.roCode || ""}
                onChange={handleInputChange}
              />
              <ErrorMessage error={errors.roCode} />
            </div>

            {/* Branch Code */}
            <div className="flex-1">
              <label htmlFor="branchCode" className="mb-1 block font-semibold">
                Branch Code <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="branchCode"
                name="branchCode"
                placeholder="Branch Code"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                value={formData.branchCode || ""}
                onChange={handleInputChange}
              />
              <ErrorMessage error={errors.branchCode} />
            </div>
          </div>

          {/* Branch Name and Email */}
          <div className="flex flex-col md:flex-row md:space-x-10">
            <div className="mb-4 flex-1 md:mb-0">
              <label htmlFor="branchName" className="mb-1 block font-semibold">
                Branch Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="branchName"
                name="branchName"
                placeholder="Branch Name"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                value={formData.branchName || ""}
                onChange={handleInputChange}
              />
              <ErrorMessage error={errors.branchName} />
            </div>

            <div className="flex-1">
              <label htmlFor="branchEmail" className="mb-1 block font-semibold">
                Branch Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                id="branchEmail"
                name="branchEmail"
                placeholder="Branch Email"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                value={formData.branchEmail || ""}
                onChange={handleInputChange}
              />
              <ErrorMessage error={errors.branchEmail} />
            </div>
          </div>

          {/* Branch Contact No and Address */}
          <div className="flex flex-col md:flex-row md:space-x-10">
            <div className="mb-4 flex-1 md:mb-0">
              <label
                htmlFor="branchContactNo"
                className="mb-1 block font-semibold"
              >
                Branch Contact No <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="branchContactNo"
                name="branchContactNo"
                placeholder="Branch Contact No"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                maxLength={10}
                value={formData.branchContactNo || ""}
                onChange={handleInputChange}
              />
              <ErrorMessage error={errors.branchContactNo} />
            </div>

            <div className="flex-1">
              <label
                htmlFor="branchAddress"
                className="mb-1 block font-semibold"
              >
                Branch Address <span className="text-red-600">*</span>
              </label>
              <textarea
                id="branchAddress"
                name="branchAddress"
                placeholder="Address"
                maxLength={100}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                rows={3}
                value={formData.branchAddress || ""}
                onChange={handleInputChange}
              />
              <ErrorMessage error={errors.branchAddress} />
            </div>
          </div>

          {/* Branch Pincode and State */}
          <div className="flex flex-col md:flex-row md:space-x-10">
            <div className="mb-4 flex-1 md:mb-0">
              <label
                htmlFor="branchPinCode"
                className="mb-1 block font-semibold"
              >
                Branch Pincode <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="branchPinCode"
                name="branchPinCode"
                placeholder="Branch Pincode"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                value={formData.branchPinCode || ""}
                onChange={handleInputChange}
              />
              <ErrorMessage error={errors.branchPinCode} />
            </div>

            <div className="flex-1">
              <label htmlFor="branchState" className="mb-1 block font-semibold">
                Branch State <span className="text-red-600">*</span>
              </label>
              <select
                id="branchState"
                name="branchState"
                className="custom-scrollbar mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                value={formData.branchState || ""}
                onChange={handleInputChange}
              >
                <option value="">Select State</option>
                {State?.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <ErrorMessage error={errors.branchState} />
            </div>
          </div>
          <div className="flex justify-end-safe gap-3">
            <button
              type="submit"
              className="mt-7 h-[38px] cursor-pointer rounded-sm bg-green-600 px-2 text-white"
            >
              Submit
            </button>
            <button
              type="button"
              className="mt-7 h-[38px] cursor-pointer rounded-sm bg-red-600 px-2 text-white"
              onClick={() => navigate(-1)}
            >
              <i className="fa-solid fa-reply-all"></i>&nbsp; Back
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddBranch;

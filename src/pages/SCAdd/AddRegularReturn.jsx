import common from "@/common/common";
import ErrorMessage from "@/components/component/ErrorMessage";
import staticDataContext from "@/context/staticDataContext";
import statusContext from "@/context/statusContext";
import { errorMessage } from "@/lib/utils";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddRegularReturn = () => {
  const entity = "regularReturn";
  const navigate = useNavigate();

  const { Quarter, Tan, typeOfForm, financialYear } =
    useContext(staticDataContext);
  const { showError, showSuccess } = useContext(statusContext);

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

    const requiredFields = ["fy", "tan", "quarter", "form"];
    // Custom validations for specific fields

    requiredFields.forEach((field) => {
      if (field === "fy") {
        if (!data[field] || data[field].trim() === "") {
          newErrors[field] = `Financial Year is required`;
        }
      } else if (field === "tan") {
        if (!data[field] || data[field].trim() === "") {
          newErrors[field] = `TAN number is required`;
        }
      } else {
        if (!data[field] || data[field].trim() === "") {
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

    try {
      const response = await common.getSubmit(entity, formData);
      showSuccess(response.data.successMsg, "/home/list/regularReturn");
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
        <h1 className="text-2xl font-bold text-[var(--primary-color)]">
          Add Regular Return
        </h1>

        <div className="mt-4">
          <div>
            <div className="mb-3 flex gap-3">
              <div className="w-full md:w-1/2">
                <label className="font-semibold text-[var(--primary-color)]">
                  Financial Year <span className="text-red-600">*</span>
                </label>
                <select
                  name="fy"
                  id="fy"
                  value={formData.fy || ""}
                  onChange={handleInputChange}
                  className="custom-scrollbar mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
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
              <div className="w-full md:w-1/2">
                <label className="font-semibold text-[var(--primary-color)]">
                  TAN <span className="text-red-600">*</span>
                </label>
                <select
                  name="tan"
                  id="tan"
                  value={formData.tan || ""}
                  onChange={handleInputChange}
                  className="custom-scrollbar mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                >
                  <option value="">Select TAN</option>
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
            </div>
            <div className="flex gap-3">
              <div className="w-full md:w-1/2">
                <label className="font-semibold text-[var(--primary-color)]">
                  Quarter<span className="text-red-600">*</span>
                </label>
                <select
                  name="quarter"
                  id="quarter"
                  value={formData.quarter}
                  onChange={handleInputChange}
                  className="custom-scrollbar mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                >
                  <option value="">Select Quarter</option>
                  {Quarter &&
                    Quarter.length > 0 &&
                    Quarter.map((quarter, index) => {
                      return (
                        <option key={index} value={quarter}>
                          {quarter}
                        </option>
                      );
                    })}
                </select>
                <ErrorMessage error={errors.quarter} />
              </div>
              <div className="w-full md:w-1/2">
                <label className="font-semibold text-[var(--primary-color)]">
                  Form <span className="text-red-600">*</span>
                </label>
                <select
                  name="form"
                  id="form"
                  value={formData.form}
                  onChange={handleInputChange}
                  className="custom-scrollbar mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                >
                  <option value="">Select Form</option>
                  {typeOfForm &&
                    typeOfForm.length > 0 &&
                    typeOfForm.map((form, index) => {
                      return (
                        <option key={index} value={form}>
                          {form}
                        </option>
                      );
                    })}
                </select>
                <ErrorMessage error={errors.form} />
              </div>
            </div>
          </div>
          <div className="mt-3 flex justify-end-safe gap-3">
            <button
              className="cursor-pointer rounded-md bg-green-600 p-2 px-4 font-semibold text-white"
              onClick={handleSubmit}
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
      </div>
    </>
  );
};

export default AddRegularReturn;

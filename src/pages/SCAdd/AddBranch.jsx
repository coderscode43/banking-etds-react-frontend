import staticDataContext from "@/context/staticDataContext";
import { Input, Textarea } from "@headlessui/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBranch = () => {
  const navigate = useNavigate();

  const { State } = useContext(staticDataContext);

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    roCode: "",
    branchCode: "",
    branchName: "",
    branchEmail: "",
    branchContactNo: "",
    branchAddress: "",
    branchPinCode: "",
    branchState: "",
  });

  // Regex patterns for validation
  const patterns = {
    roCode: /^[a-zA-Z0-9][a-zA-Z0-9]+$/,
    branchCode: /^[0-9]+$/,
    branchName: /^[a-zA-Z0-9][a-zA-Z0-9]+$/,
    branchEmail: /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/,
    branchContactNo: /^[0-9]{10}$/,
    branchPinCode: /^[0-9]{6}$/,
  };

  const validate = () => {
    const newErrors = {};

    // RO Code
    if (!formData.roCode) newErrors.roCode = "RO Code is Required.";
    else if (!patterns.roCode.test(formData.roCode))
      newErrors.roCode = "Enter valid RO Code.";
    else if (formData.roCode.length > 10)
      newErrors.roCode = "RO Code should not be greater than 10 characters.";

    // Branch Code
    if (!formData.branchCode) newErrors.branchCode = "Branch Code is Required.";
    else if (!patterns.branchCode.test(formData.branchCode))
      newErrors.branchCode = "Enter valid Branch Code.";
    else if (formData.branchCode.length > 10)
      newErrors.branchCode =
        "Branch Code should not be greater than 10 characters.";

    // Branch Name
    if (!formData.branchName) newErrors.branchName = "Branch Name is Required.";
    else if (!patterns.branchName.test(formData.branchName))
      newErrors.branchName = "Enter valid Branch Name.";

    // Branch Email
    if (!formData.branchEmail) newErrors.branchEmail = "Email ID is Required.";
    else if (!patterns.branchEmail.test(formData.branchEmail))
      newErrors.branchEmail = "Email ID is invalid.";

    // Branch Contact No
    if (!formData.branchContactNo)
      newErrors.branchContactNo = "Branch Contact No is Required.";
    else if (!patterns.branchContactNo.test(formData.branchContactNo))
      newErrors.branchContactNo = "Enter Valid Branch Contact No.";

    // Branch Address
    if (!formData.branchAddress)
      newErrors.branchAddress = "Branch Address is Required.";
    else if (formData.branchAddress.length > 50)
      newErrors.branchAddress =
        "Branch Address should not be greater than 50 characters.";

    // Branch Pincode
    if (!formData.branchPinCode)
      newErrors.branchPinCode = "Branch Pincode is Required.";
    else if (!patterns.branchPinCode.test(formData.branchPinCode))
      newErrors.branchPinCode = "Enter Valid Branch Pincode.";

    // Branch State
    if (!formData.branchState)
      newErrors.branchState = "Branch State is Required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (submitted) {
      validate();
    }
    setErrors(" ");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (validate()) {
      // Submit form data
      alert("Form submitted successfully!");
    }
    errors;
  };

  return (
    <>
      <div className="space-y-5 rounded-md border border-gray-100 p-4 text-[var(--primary-color)] shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
        <h1 className="text-2xl font-bold">Add Branch</h1>
        <form className="space-y-3" onSubmit={handleSubmit} noValidate>
          {/* RO Code */}
          <div className="flex flex-col md:flex-row md:space-x-6">
            <div className="mb-4 flex-1 md:mb-0">
              <label htmlFor="roCode" className="mb-1 block font-semibold">
                RO Code <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="roCode"
                name="roCode"
                placeholder="ROCode"
                value={formData.roCode}
                onChange={handleChange}
                className={`w-full rounded border px-3 py-2 focus:outline-none ${
                  errors.roCode ? "border-red-500" : "border-gray-300"
                }`}
                maxLength={10}
              />
              {errors.roCode && (
                <p className="mt-1 text-sm text-red-600">{errors.roCode}</p>
              )}
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
                value={formData.branchCode}
                onChange={handleChange}
                className={`w-full rounded border px-3 py-2 focus:outline-none ${
                  errors.branchCode ? "border-red-500" : "border-gray-300"
                }`}
                maxLength={10}
              />
              {errors.branchCode && (
                <p className="mt-1 text-sm text-red-600">{errors.branchCode}</p>
              )}
            </div>
          </div>

          {/* Branch Name and Email */}
          <div className="flex flex-col md:flex-row md:space-x-6">
            <div className="mb-4 flex-1 md:mb-0">
              <label htmlFor="branchName" className="mb-1 block font-semibold">
                Branch Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="branchName"
                name="branchName"
                placeholder="Branch Name"
                value={formData.branchName}
                onChange={handleChange}
                className={`w-full rounded border px-3 py-2 focus:outline-none ${
                  errors.branchName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.branchName && (
                <p className="mt-1 text-sm text-red-600">{errors.branchName}</p>
              )}
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
                value={formData.branchEmail}
                onChange={handleChange}
                className={`w-full rounded border px-3 py-2 lowercase focus:outline-none ${
                  errors.branchEmail ? "border-red-500" : "border-gray-300"
                }`}
                style={{ textTransform: "lowercase" }}
              />
              {errors.branchEmail && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.branchEmail}
                </p>
              )}
            </div>
          </div>

          {/* Branch Contact No and Address */}
          <div className="flex flex-col md:flex-row md:space-x-6">
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
                value={formData.branchContactNo}
                onChange={handleChange}
                className={`w-full rounded border px-3 py-2 focus:outline-none ${
                  errors.branchContactNo ? "border-red-500" : "border-gray-300"
                }`}
                maxLength={10}
              />
              {errors.branchContactNo && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.branchContactNo}
                </p>
              )}
            </div>

            <div className="flex-1">
              <label
                htmlFor="branchAddress"
                className="mb-1 block font-semibold"
              >
                Branch Address <span className="text-red-600">*</span>
              </label>
              <Textarea
                id="branchAddress"
                name="branchAddress"
                placeholder="Address"
                value={formData.branchAddress}
                onChange={handleChange}
                maxLength={100}
                className={`w-full resize-none rounded border px-3 py-2 focus:outline-none ${
                  errors.branchAddress ? "border-red-500" : "border-gray-300"
                }`}
                rows={3}
              />
              {errors.branchAddress && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.branchAddress}
                </p>
              )}
            </div>
          </div>

          {/* Branch Pincode and State */}
          <div className="flex flex-col md:flex-row md:space-x-6">
            <div className="mb-4 flex-1 md:mb-0">
              <label
                htmlFor="branchPinCode"
                className="mb-1 block font-semibold"
              >
                Branch Pincode <span className="text-red-600">*</span>
              </label>
              <Input
                type="text"
                id="branchPinCode"
                name="branchPinCode"
                placeholder="Branch Pincode"
                value={formData.branchPinCode}
                onChange={handleChange}
                className={`w-full rounded border px-3 py-2 focus:outline-none ${
                  errors.branchPinCode ? "border-red-500" : "border-gray-300"
                }`}
                maxLength={6}
              />
              {errors.branchPinCode && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.branchPinCode}
                </p>
              )}
            </div>

            <div className="flex-1">
              <label htmlFor="branchState" className="mb-1 block font-semibold">
                Branch State <span className="text-red-600">*</span>
              </label>
              <select
                id="branchState"
                name="branchState"
                value={formData.branchState}
                onChange={handleChange}
                className={`w-full rounded border px-3 py-2 focus:outline-none ${
                  errors.branchState ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="" disabled>
                  Select State
                </option>
                {State?.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.branchState && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.branchState}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-end-safe gap-3">
            <button
              className="mt-7 h-[38px] cursor-pointer rounded-sm bg-green-600 px-2 text-white"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
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

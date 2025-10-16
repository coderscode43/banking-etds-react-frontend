import common from "@/common/common";
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
import SelectField from "../component/SelectField";
import InputField from "../component/InputField";
import { useEffect } from "react";

const EditBranchDetailsModal = ({ data, entity }) => {
  const { State } = useContext(staticDataContext);
  const { showSuccess, showError } = useContext(statusContext);

  let [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState();

  useEffect(() => {
    setFormData(data || {});
  }, [data]);

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
      const value = data[field];

      // Check if value is missing or a blank string
      if (
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "")
      ) {
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

  const handleUpdate = async (e) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      const response = await common.getUpdateData(entity, formData);
      setIsOpen(false);
      showSuccess(response.data.successMsg);
    } catch (error) {
      setIsOpen(false);
      showError(
        `Can not update ${error?.response?.data?.entityName}  ${errorMessage(error)}`
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
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="cursor-pointer rounded-md bg-blue-600 p-2 px-4 font-semibold text-white"
        >
          <i className="fa-solid fa-pen-to-square"></i>&nbsp; Edit
        </button>
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
                <DialogPanel className="w-full max-w-3xl transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all">
                  <div className="flex items-center justify-between bg-[#eaf0f9] p-5">
                    <DialogTitle
                      as="h2"
                      className="text-xl leading-6 font-medium text-gray-900"
                    >
                      Edit Branch Details
                    </DialogTitle>
                    <div
                      className="cursor-pointer"
                      onClick={() => setIsOpen(false)}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </div>
                  </div>
                  <form onSubmit={handleUpdate} noValidate>
                    <div className="justify-center p-5">
                      <div className="mb-3 flex w-full gap-5">
                        <InputField
                          label="RO Code"
                          name="roCode"
                          placeholder="RO Code"
                          value={formData?.roCode}
                          onChange={handleInputChange}
                          error={errors.roCode}
                          required
                        />

                        <InputField
                          label="Branch Code"
                          name="branchCode"
                          placeholder="Branch Code"
                          value={formData?.branchCode}
                          onChange={handleInputChange}
                          error={errors.branchCode}
                          required
                        />
                      </div>

                      <div className="mb-3 flex w-full gap-5">
                        <InputField
                          label="RO Name"
                          name="branchName"
                          placeholder="RO Name"
                          value={formData?.branchName}
                          onChange={handleInputChange}
                          error={errors.branchName}
                          required
                        />

                        <InputField
                          label="RO Email"
                          name="branchEmail"
                          type="email"
                          placeholder="Email"
                          value={formData?.branchEmail}
                          onChange={handleInputChange}
                          error={errors.branchEmail}
                          required
                        />
                      </div>

                      <div className="mb-3 flex w-full gap-5">
                        <InputField
                          label="RO Contact No"
                          name="branchContactNo"
                          placeholder="RO Contact No"
                          value={formData?.branchContactNo}
                          onChange={handleInputChange}
                          error={errors.branchContactNo}
                          required
                        />

                        <InputField
                          label="RO Address"
                          name="branchAddress"
                          placeholder="RO Address"
                          value={formData?.branchAddress}
                          onChange={handleInputChange}
                          error={errors.branchAddress}
                          required
                        />
                      </div>

                      <div className="mb-3 flex w-full gap-5">
                        <InputField
                          label="RO Pin code"
                          name="branchPinCode"
                          placeholder="RO Pin code"
                          value={formData?.branchPinCode}
                          onChange={handleInputChange}
                          error={errors.branchPinCode}
                          required
                        />

                        <SelectField
                          label="RO State"
                          name="branchState"
                          value={formData?.branchState}
                          onChange={handleInputChange}
                          options={State}
                          error={errors.branchState}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-5 bg-[#eaf0f9] p-5">
                      <button
                        type="submit"
                        className="cursor-pointer rounded-md bg-[#1761fd] px-4 py-2 font-semibold text-white"
                      >
                        Update
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="cursor-pointer rounded-md bg-red-600 px-4 py-2 font-semibold text-white"
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default EditBranchDetailsModal;

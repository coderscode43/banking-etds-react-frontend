import common from "@/common/common";
import staticDataContext from "@/context/staticDataContext";
import { useContext, useState } from "react";
import statusContext from "@/context/statusContext";
import { errorMessage } from "@/lib/utils";
import useLockBodyScroll from "@/hooks/useLockBodyScroll";
import ErrorMessage from "../component/ErrorMessage";

const BulkResponseReminderModal = ({
  bulkResponseModal,
  setBulkResponseModal,
  regularReturns,
}) => {
  const entity = "regularReturnRemark";

  const { showSuccess, showError } = useContext(statusContext);
  const { regularReturnStatus } = useContext(staticDataContext);

  const [formData, setFormData] = useState({
    Status: "",
    returnFilingDate: "",
    responseData: "",
  });
  const [errors, setErrors] = useState({});
  const [checkboxError, setCheckboxError] = useState("");

  const [selectedCheckBox, setSelectedCheckedBox] = useState([]);
  useLockBodyScroll(bulkResponseModal);

  // Conditional Logic for Choosing of CheckBoxes
  const handleCheckboxChange = (checkboxId) => {
    setSelectedCheckedBox((prevSelected) => {
      const isAlreadySelected = prevSelected.includes(checkboxId);
      let updatedSelection;

      if (checkboxId === "reminder") {
        if (isAlreadySelected) {
          updatedSelection = prevSelected.filter((id) => id !== "reminder");
        } else {
          updatedSelection = ["reminder"];

          // Reset form and clear errors
          setFormData({
            Status: "",
            returnFilingDate: "",
            responseData: "",
          });
          setErrors({});
          setCheckboxError("");
        }
      } else {
        if (isAlreadySelected) {
          updatedSelection = prevSelected.filter((id) => id !== checkboxId);
        } else {
          updatedSelection = [...prevSelected, checkboxId];
        }

        // Remove "reminder" if other checkboxes are selected
        updatedSelection = updatedSelection.filter((id) => id !== "reminder");
      }

      // Clear checkbox error if any valid box is selected
      if (updatedSelection.length > 0) {
        setCheckboxError("");
      }

      return updatedSelection;
    });
  };

  const validate = () => {
    const newErrors = {};
    let isValid = true;

    // Validate checkbox selection
    if (selectedCheckBox.length === 0) {
      setCheckboxError("Please select at least one checkbox.");
      isValid = false;
    } else {
      setCheckboxError(""); // clear if already valid
    }

    if (selectedCheckBox.includes("Status") && !formData.Status.trim()) {
      newErrors.Status = "Status is required.";
      isValid = false;
    }

    if (
      selectedCheckBox.includes("returnFilingDate") &&
      !formData.returnFilingDate
    ) {
      newErrors.returnFilingDate = "Return filing date is required.";
      isValid = false;
    }

    if (
      selectedCheckBox.includes("responseData") &&
      !formData.responseData.trim()
    ) {
      newErrors.responseData = "Response is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    // Proceed to submit if valid
    const rowsData = {
      regularReturns,
    };

    const payload = {
      Status: formData.Status,
      returnFilingDate: formData.returnFilingDate,
      remark: formData.responseData,
    };

    try {
      const response = await common.getAddBulk(entity, rowsData, payload);
      setBulkResponseModal(false);
      showSuccess(response.data.successMsg);
    } catch (error) {
      setBulkResponseModal(false);
      showError(errorMessage(error));
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSendReminder = async () => {
    const rowsData = { regularReturn: [...regularReturns] };

    let response;
    try {
      response = await common.getSendReminder(entity, rowsData);
      setBulkResponseModal(false);
      showSuccess(response.data.successMsg);
    } catch (error) {
      setBulkResponseModal(false);
      showError(errorMessage(error));
    }
  };

  return (
    <>
      <div
        className={`bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/60 ${
          bulkResponseModal ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="max-w-md rounded-md bg-white shadow-lg">
          {/* Modal Header */}
          <div className="flex items-center justify-between rounded-t-md border-b border-gray-200 bg-blue-100 p-4">
            <h4 className="text-lg font-semibold">Bulk Response/Reminder</h4>
            <button
              type="button"
              className="cursor-pointer text-gray-500 hover:text-gray-700"
              aria-label="Close"
              onClick={() => setBulkResponseModal(false)}
            >
              <i className="fa-solid fa-xmark" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-4">
            {/* Checkboxes */}
            <div className="flex flex-wrap gap-y-2">
              {["Status", "returnFilingDate", "responseData", "reminder"].map(
                (item) => (
                  <div key={item} className="flex w-1/2 items-center space-x-2">
                    <input
                      type="checkbox"
                      id={item}
                      name={item}
                      checked={selectedCheckBox.includes(item)}
                      onChange={() => handleCheckboxChange(item)}
                      className="form-checkbox cursor-pointer text-blue-400"
                    />
                    <label
                      htmlFor={item}
                      className="cursor-pointer select-none"
                    >
                      {item === "reminder"
                        ? "Send Reminder"
                        : item
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                    </label>
                  </div>
                )
              )}
            </div>
            {checkboxError && <ErrorMessage error={checkboxError} />}

            <hr className="my-4 text-gray-400" />

            {/* Form */}
            <form className="flex flex-col gap-3">
              <div>
                <label
                  className={`mb-1 block font-semibold ${
                    selectedCheckBox.includes("Status") ? "" : "text-gray-600"
                  }`}
                >
                  Status
                </label>
                <select
                  className={`form-input focus:outline-none ${
                    selectedCheckBox.includes("Status")
                      ? "cursor-pointer"
                      : "cursor-not-allowed bg-gray-300 text-gray-500"
                  }`}
                  id="Status"
                  name="Status"
                  disabled={!selectedCheckBox.includes("Status")}
                  value={formData.Status}
                  onChange={(e) => handleInputChange("Status", e.target.value)}
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  {regularReturnStatus &&
                    regularReturnStatus.length > 0 &&
                    regularReturnStatus.map((status, index) => (
                      <option key={index} value={status}>
                        {status}
                      </option>
                    ))}
                </select>
                <ErrorMessage error={errors.Status} />
              </div>

              <div>
                <label
                  className={`mb-1 block font-semibold ${
                    selectedCheckBox.includes("returnFilingDate")
                      ? ""
                      : "text-gray-600"
                  }`}
                >
                  Return Filing Date
                </label>
                <input
                  type="date"
                  id="returnFilingDate"
                  name="returnFilingDate"
                  onClick={(e) => {
                    if (!selectedCheckBox.includes("returnFilingDate")) {
                      e.preventDefault(); // prevent picker if not selected
                    }
                  }}
                  onChange={(e) =>
                    handleInputChange("returnFilingDate", e.target.value)
                  }
                  value={formData.returnFilingDate}
                  className={`form-input focus:outline-none ${
                    selectedCheckBox.includes("returnFilingDate")
                      ? "cursor-pointer"
                      : "cursor-not-allowed bg-gray-300 text-gray-500"
                  }`}
                />

                <ErrorMessage error={errors.returnFilingDate} />
              </div>

              <div>
                <label
                  className={`mb-1 block font-semibold ${
                    selectedCheckBox.includes("responseData")
                      ? ""
                      : "text-gray-600"
                  }`}
                >
                  Response
                </label>

                <textarea
                  rows="3"
                  id="responseData"
                  name="responseData"
                  disabled={!selectedCheckBox.includes("responseData")}
                  value={formData.responseData}
                  onChange={(e) =>
                    handleInputChange("responseData", e.target.value)
                  }
                  className={`form-input focus:outline-none ${
                    selectedCheckBox.includes("responseData")
                      ? "cursor-text"
                      : "cursor-not-allowed bg-gray-300 text-gray-500"
                  }`}
                />
                <ErrorMessage error={errors.responseData} />
              </div>
            </form>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-2 rounded-b-md bg-blue-100 p-4">
            <button
              type="button"
              name="reminder"
              id="reminder"
              className={`rounded-md border-amber-300 px-4 py-2 text-white ${
                selectedCheckBox.includes("reminder")
                  ? "cursor-pointer bg-amber-500"
                  : "cursor-not-allowed bg-yellow-500"
              }`}
              onClick={handleSendReminder}
              disabled={!selectedCheckBox.includes("reminder")}
            >
              Send Reminder
            </button>

            <button
              type="button"
              className="cursor-pointer rounded-md border border-gray-300 bg-gray-300 px-4 py-2 text-black hover:bg-gray-200"
              onClick={() => {
                setBulkResponseModal(false);
                setFormData({
                  Status: "",
                  returnFilingDate: "",
                  responseData: "",
                });
                setErrors({});
                setCheckboxError("");
                setSelectedCheckedBox([]); // (Optional) if you also want to clear checkboxes
              }}
            >
              Close
            </button>

            <button
              type="button"
              className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BulkResponseReminderModal;

import common from "@/common/common";
import staticDataContext from "@/context/staticDataContext";
import { useContext, useState } from "react";

const BulkResponseReminder = ({
  bulkResponseModal,
  setBulkResponseModal,
  selectedRows,
  selectedRowsData,
}) => {
  const entity = "regularReturnRemark";
  const { regularReturnStatus } = useContext(staticDataContext);
  console.log(selectedRowsData);
  const [selectedCheckBox, setSelectedCheckedBox] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [returnFilingDate, setReturnFilingDate] = useState("");
  const [responseData, setResponse] = useState("");

  const closeModal = () => setBulkResponseModal(false);

  console.log(selectedRows);
  const handleCheckboxChange = (checkboxId) => {
    setSelectedCheckedBox((prev) => {
      if (checkboxId === "reminder") {
        if (prev.includes("reminder")) {
          return prev.filter((id) => id !== checkboxId);
        } else {
          setSelectedStatus(" ");
          setReturnFilingDate(" ");
          setResponse(" ");
          return ["reminder"];
        }
      } else {
        let newSelection = prev.includes(checkboxId)
          ? prev.filter((id) => id !== checkboxId) // unselect clicked box
          : [...prev, checkboxId]; // add clicked box

        // Remove "reminder" if present
        if (newSelection.includes("reminder")) {
          newSelection = newSelection.filter((id) => id !== "reminder");
        }
        return newSelection;
      }
    });
  };
  // let showError;
  const handleSubmit = async () => {
    //  http://localhost:8080/apiregularReturnRemark/addBulkRemark/
    try {
      // e.preventDefault();
      const response = await common.getAddBulk(entity, selectedCheckBox);
      console.log("response :", response);
      console.log("selectedRowsData", selectedRowsData);
      console.log("selectedCheckBox", selectedCheckBox);
      console.log("selectedStatus", selectedStatus);
      console.log("returnFilingDate", returnFilingDate);
      console.log("responseData", responseData);
    } catch (error) {
      console.log(error);
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
              onClick={closeModal}
            >
              <i className="fa-solid fa-x" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-4">
            {/* Checkboxes */}
            <div className="flex flex-wrap gap-y-2">
              {["status", "returnFilingDate", "responseData", "reminder"].map(
                (item) => (
                  <label
                    key={item}
                    className="flex w-1/2 items-center space-x-2"
                  >
                    <input
                      id={item}
                      name={item}
                      type="checkbox"
                      checked={selectedCheckBox.includes(item)}
                      onChange={() => handleCheckboxChange(item)}
                      className="form-checkbox cursor-pointer text-blue-400"
                    />
                    <span>
                      {item === "reminder"
                        ? "Send Reminder"
                        : item
                            .replace(/([A-Z])/g, " $1") // camelCase to words
                            .replace(/^./, (str) => str.toUpperCase())}
                    </span>
                  </label>
                )
              )}
            </div>

            <hr className="my-4 text-gray-400" />

            {/* Form */}
            <form className="flex flex-col gap-3">
              <div>
                <label
                  htmlFor="status"
                  className={`mb-1 block font-semibold ${
                    selectedCheckBox.includes("status") ? "" : "text-gray-600"
                  }`}
                >
                  Status
                </label>
                <select
                  className={`form-input focus:outline-none ${
                    selectedCheckBox.includes("status")
                      ? "cursor-pointer"
                      : "cursor-not-allowed bg-gray-300 text-gray-500"
                  }`}
                  id="status"
                  name="status"
                  disabled={!selectedCheckBox.includes("status")}
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
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
              </div>

              <div>
                <label
                  htmlFor="returnFilingDate"
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
                  disabled={!selectedCheckBox.includes("returnFilingDate")}
                  className={`form-input focus:outline-none ${
                    selectedCheckBox.includes("returnFilingDate")
                      ? "cursor-pointer"
                      : "cursor-not-allowed bg-gray-300 text-gray-500"
                  }`}
                  value={returnFilingDate}
                  onChange={(e) => setReturnFilingDate(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="responseData"
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
                  className={`form-input focus:outline-none ${
                    selectedCheckBox.includes("responseData")
                      ? "cursor-text"
                      : "cursor-not-allowed bg-gray-300 text-gray-500"
                  }`}
                  value={responseData}
                  onChange={(e) => setResponse(e.target.value)}
                />
              </div>
            </form>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-2 rounded-b-md bg-blue-100 p-4">
            <button
              type="button"
              name="reminder"
              id="reminder"
              className={`rounded-md px-4 py-2 text-white ${
                selectedCheckBox.includes("reminder")
                  ? "cursor-pointer bg-amber-400"
                  : "cursor-not-allowed bg-amber-300"
              }`}
              disabled={!selectedCheckBox.includes("reminder")}
            >
              Send Reminder
            </button>

            <button
              type="button"
              className="cursor-pointer rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
              onClick={closeModal}
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

export default BulkResponseReminder;

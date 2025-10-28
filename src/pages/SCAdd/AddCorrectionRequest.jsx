import common from "@/common/common";
import ErrorMessage from "@/components/component/ErrorMessage";
import Pagination from "@/components/component/Pagination";
import DynamicTableCheckBoxInput from "@/components/tables/DynamicTableCheckBoxInput";
import staticDataContext from "@/context/staticDataContext";
import statusContext from "@/context/statusContext";
import { errorMessage } from "@/lib/utils";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCorrectionRequest = () => {
  const entity = "correctionRequest";

  const navigate = useNavigate();

  const { financialYear, typeOfForm, exemption } =
    useContext(staticDataContext);
  const { showSuccess, showError } = useContext(statusContext);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [gotoPage, setGotoPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [quarter, setQuarter] = useState([]);
  const [typeOfCorrection, setTypeOfCorrection] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [formData, setFormData] = useState({});
  const [documents, setDocuments] = useState([]);
  const [challanFormData, setChallanFormData] = useState({});
  const [updatedTableData, setUpdatedTableData] = useState([]);
  const [searchListingData, setSearchListingData] = useState([]);

  const categories = [
    { name: "Add Correction Request" },
    { name: "Add Correction Amount Details" },
  ];

  const validate = (data) => {
    const newErrors = {};

    // Helper function to prettify field names
    const prettyFieldName = (field) => {
      return field
        .replace(/([A-Z])/g, " $1") // add space before uppercase letters
        .replace(/^./, (str) => str.toUpperCase()); // capitalize first letter
    };

    const requiredFields = [
      "fy",
      "branchCode",
      "typeOfForm",
      "tanOfCust",
      "mobileNumber",
    ];

    requiredFields.forEach((field) => {
      const value = data[field];
      const isEmpty =
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "");

      if (isEmpty) {
        if (field === "fy") {
          newErrors[field] = "Financial Year is required";
        } else if (field === "branchCode") {
          newErrors[field] = `RO Code is required`;
        } else if (field === "tanOfCust") {
          newErrors[field] = `TAN is required`;
        } else {
          newErrors[field] = `${prettyFieldName(field)} is required`;
        }
      }
    });

    // Custom validations for specific fields
    if (data.branchCode) {
      if (data.branchCode.length > 10) {
        newErrors.branchCode = "RO should not be greater than 10 characters";
      } else {
        const branchCodePattern = /^[0-9]+$/;
        if (!branchCodePattern.test(data.branchCode)) {
          newErrors.branchCode = "Enter valid RO Code";
        }
      }
    }

    if (!data.quarter || data.quarter.length === 0) {
      newErrors.quarter = "Quarter is required";
    }

    if (!data.typeOfCorrection || data.typeOfCorrection.length === 0) {
      newErrors.typeOfCorrection = "Type of Correction is required";
    }

    if (
      data.pan &&
      !/^(?:[A-Z]{5}[0-9]{4}[A-Z]{1}|PAN NOT AVAILABLE)$/.test(data.pan)
    ) {
      newErrors.pan = "Invalid PAN Number";
    }

    if (data.fy !== import.meta.env.VITE_FINANCIAL_YEAR) {
      if (!data.tanOfCust || data.tanOfCust.trim() === "") {
        newErrors.tanOfCust = "TAN is required";
      } else if (!/^([A-Za-z]{4}[0-9]{5}[A-Za-z]{1})*$/.test(data.tanOfCust)) {
        newErrors.tanOfCust = "Invalid TAN number";
      }
    } else {
      delete newErrors.tanOfCust;
    }

    if (!data.pan || data.pan.trim() === "") {
      if (!data.name || data.name.trim() === "") {
        newErrors.name = "Name of Customer is required";
      }
    }

    if (data.name && data.name.length > 50) {
      newErrors.name =
        "Name of customer should not be greater than 50 characters";
    }

    if (typeOfCorrection[0] === "Exempted" && !data.reasonForExemption) {
      newErrors.reasonForExemption = "Please Select Reason for Exemption";
    }

    return newErrors;
  };

  const validateChallan = (data) => {
    const newErrors = {};

    if (typeOfCorrection.includes("Add Entry/Challan")) {
      // Challan Serial Number
      if (!data.challanSrNo || data.challanSrNo.trim() === "") {
        newErrors.challanSrNo = "Challan Serial Number is required";
      } else if (!/^\d+$/.test(data.challanSrNo)) {
        newErrors.challanSrNo = "Challan Serial Number must be numeric";
      } else if (data.challanSrNo.length > 5) {
        newErrors.challanSrNo = "Challan Serial Number cannot exceed 5 digits";
      }

      // BSR Code
      if (!data.challanBsrCode || data.challanBsrCode.trim() === "") {
        newErrors.challanBsrCode = "BSR Code is required";
      } else if (!/^\w+$/.test(data.challanBsrCode)) {
        newErrors.challanBsrCode = "BSR Code must be alphanumeric";
      } else if (data.challanBsrCode.length > 7) {
        newErrors.challanBsrCode = "BSR Code cannot exceed 7 characters";
      }

      // Section
      if (!data.challanSection || data.challanSection.trim() === "") {
        newErrors.challanSection = "Section is required";
      }

      // Challan Amount
      if (!data.challanAmount || data.challanAmount.trim() === "") {
        newErrors.challanAmount = "Challan Amount is required";
      } else if (!/^\d+$/.test(data.challanAmount)) {
        newErrors.challanAmount = "Challan Amount must be numeric";
      }

      // Challan Date
      if (!data.challanDate || data.challanDate.trim() === "") {
        newErrors.challanDate = "Challan Date is required";
      }

      // Supporting Document
      if (!data.challanSupportingDoc) {
        newErrors.challanSupportingDoc =
          "Challan supporting document is required";
      } else {
        const file = data.challanSupportingDoc;

        // File type check
        if (
          !["application/pdf", "image/jpeg", "image/png"].includes(file.type)
        ) {
          newErrors.challanSupportingDoc =
            "Only PDF, JPG, or PNG files are allowed";
        }

        // File size check (max 5MB)
        else if (file.size > 5 * 1024 * 1024) {
          newErrors.challanSupportingDoc = "File must be smaller than 5MB";
        }
      }
    }

    // Response for Correction
    if (!data.remark || data.remark.trim() === "") {
      newErrors.remark = "Response for Correction is required";
    }

    // Only validate added document inputs
    documents.forEach((doc) => {
      if (!doc.blob) {
        newErrors[`documents_${doc.id}`] = "Supporting document is required";
      }
    });

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (!name) return;

    let newValue = value;

    if (name === "mobileNumber") {
      // Remove non-digit characters
      newValue = newValue.replace(/\D+/g, "");
      // Limit to 10 digits max
      if (newValue.length > 10) {
        newValue = newValue.slice(0, 10);
      }
    }

    // Update form data
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Validate just this field inside full form context
    const fieldError = validate({ ...formData, [name]: newValue })[name];

    // Cleanly update errors: overwrite if error exists, remove key if no error
    setErrors((prev) => {
      const { [name]: _removed, ...rest } = prev; // remove old error for this field
      return fieldError ? { ...rest, [name]: fieldError } : rest;
    });
  };

  const handleChallanInputChange = (e) => {
    const { name, type, value, files } = e.target;
    if (!name) return;

    let newValue = value;

    if (type === "file") {
      // Get first file or multiple if needed
      newValue = files?.length ? files[0] : null;
    }

    // Sanitize numeric-only fields
    if (["challanSrNo", "challanAmount"].includes(name)) {
      newValue = newValue.replace(/\D+/g, ""); // keep only digits
    }

    // Update form data
    setChallanFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Validate field
    const fieldError = validateChallan({
      ...challanFormData,
      [name]: newValue,
    })[name];

    setErrors((prev) => {
      const { [name]: _removed, ...rest } = prev;
      return fieldError ? { ...rest, [name]: fieldError } : rest;
    });
  };

  const handleQuarterChange = (e) => {
    const { name, checked } = e.target;

    let newQuarters;

    if (name === "allCheck") {
      if (checked) {
        newQuarters = ["Q1", "Q2", "Q3", "Q4"];
      } else {
        newQuarters = [];
      }
    } else {
      newQuarters = [...quarter];
      if (checked) {
        if (!newQuarters.includes(name)) {
          newQuarters.push(name);
        }
      } else {
        newQuarters = newQuarters.filter((q) => q !== name);
      }
    }

    setQuarter(newQuarters);
    setFormData((prev) => ({
      ...prev,
      quarter: newQuarters,
    }));

    // Validate with the updated quarter array
    const validationErrors = validate({ ...formData, quarter: newQuarters });

    setErrors((prev) => {
      // Remove previous quarter error, if any, and replace if exists
      const { quarter: _removed, ...rest } = prev;
      return validationErrors.quarter
        ? { ...rest, quarter: validationErrors.quarter }
        : rest;
    });
  };

  const handleTypeOfCorrectionChange = (e) => {
    const { name, checked } = e.target;

    const allOptions = [
      "PAN Updation",
      "Mismatch In Gross Amount",
      "Mismatch In TDS Amount",
      "Section Correction",
      "Default Correction",
      "Add Entry/Challan",
      "Others",
      "Exempted",
    ];

    if (name === "allCheck") {
      if (checked) {
        setTypeOfCorrection(allOptions);
        setFormData((prev) => ({
          ...prev,
          typeOfCorrection: allOptions,
        }));
      } else {
        setTypeOfCorrection([]);
        setFormData((prev) => ({
          ...prev,
          typeOfCorrection: [],
        }));
      }
    } else {
      let newTypeOfCorrection = [...typeOfCorrection];

      if (checked) {
        // If "Others" is selected, deselect all others and only select "Others"
        if (name === "Others") {
          newTypeOfCorrection = ["Others"]; // Select only "Others"
        } else if (name === "Exempted") {
          newTypeOfCorrection = ["Exempted"]; // Select only "Exempted"
        } else {
          // If another option is selected, deselect "Others" and "Exempted"
          newTypeOfCorrection = newTypeOfCorrection.filter(
            (item) => item !== "Others" && item !== "Exempted"
          );

          // Add the new option if neither "Others" nor "Exempted" is selected
          if (
            !newTypeOfCorrection.includes(name) &&
            !newTypeOfCorrection.includes("Others") &&
            !newTypeOfCorrection.includes("Exempted")
          ) {
            newTypeOfCorrection.push(name);
          }
        }
      } else {
        // Unchecking an item (remove it from the list)
        newTypeOfCorrection = newTypeOfCorrection.filter(
          (item) => item !== name
        );
      }

      setTypeOfCorrection(newTypeOfCorrection);
      setFormData((prev) => ({
        ...prev,
        typeOfCorrection: newTypeOfCorrection,
      }));

      // Validate with the updated quarter array
      const validationErrors = validate({
        ...formData,
        typeOfCorrection: newTypeOfCorrection,
      });

      setErrors((prev) => {
        // Remove previous typeOfCorrection error, if any, and replace if exists
        const { typeOfCorrection: _removed, ...rest } = prev;
        return validationErrors.typeOfCorrection
          ? { ...rest, typeOfCorrection: validationErrors.typeOfCorrection }
          : rest;
      });
    }
  };

  const handleNext = async (e) => {
    e.preventDefault();

    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    if (validationErrors) {
      setSelectedIndex(1);
    }

    try {
      setLoading(true); // Start loading
      const pageNo = 1;
      const response = await common.getSearchDataCorrectionRequest(
        entity,
        pageNo,
        formData
      );
      setSearchListingData(response?.data?.entities || []);
      setUpdatedTableData(response?.data?.entities || []);

      const count = response?.data?.count || 0;
      const pages = Math.ceil(count / 100);
      setTotalPages(pages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validateChallan(challanFormData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    const refinedChallanFormData = common.convertToDateObject(challanFormData);
    const refinedFormData = {
      ...formData,
      quarter: Array.isArray(formData.quarter)
        ? formData.quarter.join(", ")
        : formData.quarter || "",
      typeOfCorrection: Array.isArray(formData.typeOfCorrection)
        ? formData.typeOfCorrection.join(", ")
        : formData.typeOfCorrection || "",
    };
    // Get only the updated rows based on selectedRows indices
    let modifiedRows = updatedTableData.filter((_, index) =>
      selectedRows.includes(index)
    );

    const entireFormData = {
      cad: refinedChallanFormData,
      cd: refinedFormData,
    };

    if (searchListingData.length === 0) {
      modifiedRows = "addWithoutData";
    }

    try {
      setLoading(true); // Start loading
      const response = await common.getSubmitCorrection(
        entity,
        entireFormData,
        documents,
        modifiedRows
      );
      showSuccess(response?.data?.successMsg, "/home/list/correctionRequest");
    } catch (error) {
      showError(`Can not save Correction Request: ${errorMessage(error)}`);
      console.log(error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const getTableHead = (typeOfForm = "", typeOfCorrection = []) => {
    const is27EQ = typeOfForm.includes("27EQ-TCS");

    // Label logic
    const tdsLabel = is27EQ ? "TCS" : "TDS";

    const heads = [
      {
        key: "selectCorrections",
        label: "Select Corrections",
      },
      { key: "srNo", label: "Sr. No." },
      { key: "quarter", label: "Quarter" },
      { key: "branchCode", label: "Branch Code" },
      { key: "name", label: "Name" },
      { key: "dateOfPayment", label: "Date of Payment" },
      { key: "amountPaid", label: "Gross Amount" },
      { key: "tds", label: `${tdsLabel} Amount` },

      // PAN Updation
      ...(typeOfCorrection.includes("PAN Updation")
        ? [
            { key: "pan", label: "PAN" },
            {
              key: "correctPan",
              label: `Correct PAN`,
            },
          ]
        : []),

      // Section Correction
      ...(typeOfCorrection.includes("Section Correction")
        ? [
            { key: "sectionCode", label: "Section Code" },
            {
              key: "correctSection",
              label: `Correct Section`,
            },
          ]
        : []),

      // Mismatch in Gross Amount
      ...(typeOfCorrection.includes("Mismatch In Gross Amount")
        ? [
            { key: "amountPaid", label: "Amount Paid" },
            {
              key: "correctAmountPaid",
              label: `Correct Amount Paid`,
            },
          ]
        : []),

      // Mismatch in TDS/TCS Amount
      ...(typeOfCorrection.includes("Mismatch In TDS Amount")
        ? [
            { key: "tds", label: tdsLabel },
            {
              key: "correctTds",
              label: `Correct ${tdsLabel}`,
            },
          ]
        : []),

      { key: "correctRemark", label: "Other Response" },
    ];

    return heads;
  };

  // Table Details
  const tableHead = getTableHead(formData.typeOfForm, typeOfCorrection);

  const tableData = searchListingData?.map((data, index) => ({
    srNo: (currentPage - 1) * 100 + (index + 1),
    ...data,
  }));

  return (
    <>
      <div className="rounded-md p-4">
        <TabGroup
          className="mx-2 flex w-full flex-col items-center"
          selectedIndex={selectedIndex}
        >
          <TabList className="flex w-full justify-around rounded-md bg-gray-100 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
            {categories.map(({ name }) => (
              <Tab
                key={name}
                className={({ selected }) =>
                  `w-full cursor-pointer space-x-1 rounded-md border-0 px-28 py-2 font-semibold ${
                    selected
                      ? "bg-[#1d3864] text-[#fff] outline-none"
                      : "w-full text-[#1d3864] outline-none"
                  }`
                }
              >
                {name}
              </Tab>
            ))}
          </TabList>

          <TabPanels className="mt-10 w-full rounded-md border border-gray-100 p-4 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
            <TabPanel key={categories.name}>
              <div className="flex flex-col gap-10">
                <div className="flex gap-5">
                  <div className="flex w-full flex-wrap gap-5">
                    <div className="w-full">
                      <div className="flex w-full items-center">
                        <label className="w-1/3 font-semibold text-[var(--primary-color)]">
                          Financial Year<span className="text-red-600">*</span>
                        </label>
                        <select
                          name="fy"
                          id="fy"
                          value={formData.fy || ""}
                          onChange={handleInputChange}
                          className="custom-scrollbar h-[38px] w-2/3 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
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
                      </div>
                      <ErrorMessage
                        className={"ml-[188px]"}
                        error={errors.fy}
                      />
                    </div>

                    <div className="w-full">
                      <div className="flex w-full items-center">
                        <label className="w-1/3 font-semibold text-[var(--primary-color)]">
                          RO Code<span className="text-red-600">*</span>
                        </label>
                        <input
                          name="branchCode"
                          id="branchCode"
                          value={formData.branchCode || ""}
                          onChange={handleInputChange}
                          placeholder="RO Code"
                          className="w-2/3 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                      </div>
                      <ErrorMessage
                        className={"ml-[188px]"}
                        error={errors.branchCode}
                      />
                    </div>

                    {/* TAN field */}
                    <div className="w-full">
                      <div className="flex w-full items-center">
                        <label className="w-1/3 font-semibold text-[var(--primary-color)]">
                          TAN
                          {formData.fy ===
                          import.meta.env.VITE_FINANCIAL_YEAR ? (
                            ""
                          ) : (
                            <span className="text-red-600">*</span>
                          )}
                        </label>

                        {formData.fy === import.meta.env.VITE_FINANCIAL_YEAR ? (
                          // Read-only TAN field for current financial year
                          <input
                            name="tanOfCust"
                            id="tanOfCust"
                            value={formData.tanOfCust || ""}
                            readOnly
                            placeholder="TAN"
                            className="w-2/3 rounded-md border border-gray-300 bg-gray-100 px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          />
                        ) : (
                          // Editable TAN field for other financial years
                          <input
                            name="tanOfCust"
                            id="tanOfCust"
                            value={formData.tanOfCust || ""}
                            onChange={handleInputChange}
                            placeholder="TAN"
                            className="w-2/3 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                            maxLength={10}
                          />
                        )}
                      </div>

                      <ErrorMessage
                        className={"ml-[188px]"}
                        error={errors.tanOfCust}
                      />
                    </div>

                    <div className="w-full">
                      <div className="flex w-full items-center">
                        <label className="w-1/3 font-semibold text-[var(--primary-color)]">
                          PAN
                        </label>

                        <input
                          name="pan"
                          id="pan"
                          value={formData.pan || ""}
                          onChange={handleInputChange}
                          list="panOptions"
                          placeholder="PAN"
                          className="w-2/3 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          maxLength={10}
                        />

                        <datalist id="panOptions">
                          <option value="PAN NOT AVAILABLE" />
                        </datalist>
                      </div>

                      <ErrorMessage
                        className={"ml-[188px]"}
                        error={errors.pan}
                      />
                    </div>

                    {/* Required name field (when no PAN) */}
                    <div className="w-full">
                      <div className="flex w-full items-center">
                        <label className="w-1/3 font-semibold text-[var(--primary-color)]">
                          Name of Customer / Vendor / Employee{" "}
                          {!formData.pan && (
                            <span className="text-red-600">*</span>
                          )}
                        </label>

                        <div className="w-2/3">
                          <input
                            name="name"
                            id="name"
                            value={formData.name || ""}
                            onChange={handleInputChange}
                            placeholder="Name of Customer / Vendor / Employee"
                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                            required={!formData.pan}
                          />
                          <ErrorMessage
                            className={"ml-[4px]"}
                            error={errors.name}
                          />
                        </div>
                      </div>
                    </div>

                    {typeOfCorrection[0] === "Exempted" && (
                      <div className="w-full">
                        <div className="flex w-full items-center">
                          <label className="w-1/3 font-semibold text-[var(--primary-color)]">
                            Reason For Exemption
                            <span className="text-red-600">*</span>
                          </label>
                          <select
                            name="reasonForExemption"
                            id="reasonForExemption"
                            value={formData.reasonForExemption || ""}
                            onChange={handleInputChange}
                            className="custom-scrollbar h-[38px] w-2/3 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                          >
                            <option value="">
                              Select Reason For Exemption
                            </option>
                            {exemption &&
                              exemption.length > 0 &&
                              exemption.map((reason, index) => {
                                return (
                                  <option key={index} value={reason}>
                                    {reason}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                        <ErrorMessage
                          className={"ml-[188px]"}
                          error={errors.reasonForExemption}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex w-full flex-wrap gap-5">
                    <div className="mt-2 w-full">
                      <div className="flex w-full gap-3">
                        <label className="w-1/5 font-semibold text-[var(--primary-color)]">
                          Quarter<span className="text-red-600">*</span>
                        </label>
                        {["Q1", "Q2", "Q3", "Q4"].map((key) => (
                          <span key={key}>
                            <input
                              type="checkbox"
                              name={key}
                              id={key}
                              checked={quarter.includes(key)}
                              onChange={handleQuarterChange}
                            />
                            <label
                              htmlFor={key}
                              className="ml-2 font-semibold text-[var(--primary-color)]"
                            >
                              {key}
                            </label>
                          </span>
                        ))}

                        <span>
                          <input
                            type="checkbox"
                            name="allCheck"
                            id="allCheck"
                            checked={quarter.length === 4}
                            onChange={handleQuarterChange}
                          />
                          <label
                            htmlFor="allCheck"
                            className="ml-2 font-semibold text-[var(--primary-color)]"
                          >
                            All Quarters
                          </label>
                        </span>
                      </div>
                      <ErrorMessage
                        className={"ml-32"}
                        error={errors.quarter}
                      />
                    </div>

                    <div className="w-full">
                      <div className="flex w-full items-center">
                        <label className="mr-3 w-1/5 font-semibold text-[var(--primary-color)]">
                          Form<span className="text-red-600">*</span>
                        </label>
                        <select
                          name="typeOfForm"
                          id="typeOfForm"
                          value={formData.typeOfForm || ""}
                          onChange={handleInputChange}
                          className="h-[38px] w-2/3 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
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
                      </div>
                      <ErrorMessage
                        className={"ml-32"}
                        error={errors.typeOfForm}
                      />
                    </div>

                    <div className="flex w-full flex-wrap gap-3">
                      <label className="w-1/5 font-semibold text-[var(--primary-color)]">
                        Type Of Correction
                        <span className="text-red-600">*</span>
                      </label>

                      <div className="flex flex-col gap-2">
                        {[
                          "PAN Updation",
                          "Mismatch In Gross Amount",
                          "Mismatch In TDS Amount",
                          "Section Correction",
                          "Default Correction",
                          "Add Entry/Challan",
                          "Others",
                          "Exempted",
                        ].map((label, index) => {
                          const key = `typeOfCorrection_${index}`;
                          return (
                            <div key={key}>
                              <input
                                type="checkbox"
                                id={key}
                                name={label} // IMPORTANT: Set name to label string
                                checked={typeOfCorrection.includes(label)} // checked if in state
                                onChange={handleTypeOfCorrectionChange} // use your handler
                              />
                              <label
                                htmlFor={key}
                                className="ml-2 font-semibold text-[var(--primary-color)]"
                              >
                                {label}
                              </label>
                            </div>
                          );
                        })}
                      </div>

                      <ErrorMessage
                        className={"ml-32"}
                        error={errors.typeOfCorrection}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex w-full items-center gap-12">
                  <label className="w-full font-semibold text-[var(--primary-color)]">
                    Mobile Number of who is Generate Correction/Query Request
                    <span className="text-red-600">*</span>
                  </label>
                  <div className="w-full">
                    <input
                      name="mobileNumber"
                      id="mobileNumber"
                      value={formData.mobileNumber || ""}
                      onChange={handleInputChange}
                      placeholder="Mobile Number of who is Generating Correction/Query Request"
                      className="w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                    />
                    <ErrorMessage
                      className={"ml-1"}
                      error={errors.mobileNumber}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    className="cursor-pointer rounded-md bg-red-600 p-2 px-4 font-semibold text-white"
                    onClick={() => navigate(-1)}
                  >
                    <i className="fa-solid fa-reply-all"></i>&nbsp; Back
                  </button>

                  <button
                    onClick={handleNext}
                    className="cursor-pointer rounded-md bg-blue-600 p-2 px-4 font-semibold text-white"
                  >
                    Next <i className="fa-solid fa-chevron-right"></i>&nbsp;
                  </button>
                </div>
              </div>
            </TabPanel>

            <TabPanel key={categories.name}>
              <div className="flex flex-col gap-5">
                {typeOfCorrection.some(
                  (item) =>
                    [
                      "PAN Updation",
                      "Mismatch In Gross Amount",
                      "Mismatch In TDS Amount",
                      "Section Correction",
                    ].includes(item) && searchListingData?.length !== 0
                ) ? (
                  <>
                    <div>
                      <DynamicTableCheckBoxInput
                        loading={loading}
                        loadingSkeletonRows={5}
                        tableHead={tableHead}
                        tableData={tableData}
                        updatedTableData={updatedTableData}
                        setUpdatedTableData={setUpdatedTableData}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                      />
                    </div>
                    {/* Pagination */}
                    {searchListingData.length > 0 && (
                      <Pagination
                        entity={entity}
                        setListData={setSearchListingData}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        gotoPage={gotoPage}
                        setGotoPage={setGotoPage}
                        totalPages={totalPages}
                      />
                    )}
                  </>
                ) : (
                  ""
                )}

                {typeOfCorrection.includes("Add Entry/Challan") ? (
                  <div className="mb-5 space-y-10">
                    <h1 className="text-xl font-bold text-[var(--primary-color)]">
                      Add Challan Details
                    </h1>

                    <div className="flex gap-5">
                      <div className="flex w-full flex-wrap gap-5">
                        <div className="w-full">
                          <div className="flex w-full items-center">
                            <label className="w-1/3 font-semibold text-[var(--primary-color)]">
                              Challan Serial Number
                              <span className="text-red-600">*</span>
                            </label>
                            <input
                              type="text"
                              name="challanSrNo"
                              id="challanSrNo"
                              value={challanFormData.challanSrNo || ""}
                              onChange={handleChallanInputChange}
                              placeholder="Challan Serial Number"
                              className="w-2/3 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                            />
                          </div>
                          <ErrorMessage
                            className={"ml-[188px]"}
                            error={errors.challanSrNo}
                          />
                        </div>
                        <div className="w-full">
                          <div className="flex w-full items-center">
                            <label className="w-1/3 font-semibold text-[var(--primary-color)]">
                              Section<span className="text-red-600">*</span>
                            </label>
                            <input
                              type="text"
                              name="challanSection"
                              id="challanSection"
                              value={challanFormData.challanSection || ""}
                              onChange={handleChallanInputChange}
                              placeholder="Section"
                              className="w-2/3 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                            />
                          </div>
                          <ErrorMessage
                            className={"ml-[188px]"}
                            error={errors.challanSection}
                          />
                        </div>
                        <div className="w-full">
                          <div className="flex w-full items-center">
                            <label className="w-1/3 font-semibold text-[var(--primary-color)]">
                              Challan Date
                              <span className="text-red-600">*</span>
                            </label>
                            <input
                              type="date"
                              name="challanDate"
                              id="challanDate"
                              value={challanFormData.challanDate || ""}
                              onChange={handleChallanInputChange}
                              placeholder="Challan Date"
                              className="w-2/3 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                            />
                          </div>
                          <ErrorMessage
                            className={"ml-[188px]"}
                            error={errors.challanDate}
                          />
                        </div>
                      </div>
                      <div className="flex w-full flex-wrap gap-5">
                        <div className="w-full">
                          <div className="flex w-full items-center">
                            <label className="w-1/3 font-semibold text-[var(--primary-color)]">
                              BSR Code<span className="text-red-600">*</span>
                            </label>
                            <input
                              type="text"
                              name="challanBsrCode"
                              id="challanBsrCode"
                              value={challanFormData.challanBsrCode || ""}
                              onChange={handleChallanInputChange}
                              placeholder="Challan BSR Code"
                              className="w-2/3 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                            />
                          </div>
                          <ErrorMessage
                            className={"ml-[188px]"}
                            error={errors.challanBsrCode}
                          />
                        </div>
                        <div className="w-full">
                          <div className="flex w-full items-center">
                            <label className="w-1/3 font-semibold text-[var(--primary-color)]">
                              Challan Amount
                              <span className="text-red-600">*</span>
                            </label>
                            <input
                              type="text"
                              name="challanAmount"
                              id="challanAmount"
                              value={challanFormData.challanAmount || ""}
                              onChange={handleChallanInputChange}
                              placeholder="Challan Amount"
                              className="w-2/3 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                            />
                          </div>
                          <ErrorMessage
                            className={"ml-[188px]"}
                            error={errors.challanAmount}
                          />
                        </div>
                        <div className="w-full">
                          <div className="flex w-full items-center">
                            <label className="w-1/3 font-semibold text-[var(--primary-color)]">
                              Challan Supporting Documents
                              <span className="text-red-600">*</span>
                            </label>
                            <input
                              type="file"
                              name="challanSupportingDoc"
                              id="challanSupportingDoc"
                              onChange={handleChallanInputChange}
                              placeholder="Challan Supporting Document"
                              className="w-2/3 cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                            />
                          </div>
                          <ErrorMessage
                            className={"ml-[188px]"}
                            error={errors.challanSupportingDoc}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div className="flex flex-col gap-5">
                  <div className="w-full">
                    <div className="flex w-full items-center justify-start">
                      <label className="w-1/4 font-semibold text-[var(--primary-color)]">
                        Response for Correction
                        <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        name="remark"
                        id="remark"
                        value={challanFormData.remark || ""}
                        onChange={handleChallanInputChange}
                        className="w-3/4 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                      />
                    </div>
                    <ErrorMessage className={"ml-71"} error={errors.remark} />
                  </div>

                  <div className="flex w-full items-center justify-start">
                    <label className="w-1/4 font-semibold text-[var(--primary-color)]">
                      Supporting Document
                    </label>
                    <button
                      onClick={() =>
                        setDocuments((prev) => [
                          ...prev,
                          { id: Date.now(), blob: null },
                        ])
                      }
                      className="cursor-pointer rounded-md bg-green-700 p-2 px-4 text-white"
                    >
                      <i className="fa-solid fa-file px-2"></i>Add Document
                    </button>
                  </div>

                  {/* Render one file input per document */}
                  {documents.map((doc) => (
                    <div key={doc.id}>
                      <div className="mt-2 ml-72 flex w-96 gap-5">
                        <input
                          type="file"
                          onChange={(e) => {
                            setDocuments((prev) =>
                              prev.map((d) =>
                                d.id === doc.id
                                  ? { ...d, blob: e.target.files[0] }
                                  : d
                              )
                            );
                          }}
                          className="w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                        />
                        <button
                          onClick={() =>
                            setDocuments((prev) =>
                              prev.filter((d) => d.id !== doc.id)
                            )
                          }
                          className="cursor-pointer rounded-sm bg-red-600 px-4 py-2 font-semibold text-white"
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </div>
                      {errors[`documents_${doc.id}`] && (
                        <ErrorMessage
                          className={"ml-71"}
                          error={errors[`documents_${doc.id}`]}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    className="cursor-pointer rounded-md bg-red-600 p-2 px-4 font-semibold text-white"
                    onClick={() => navigate(-1)}
                  >
                    <i className="fa-solid fa-reply-all"></i>&nbsp; Back
                  </button>

                  <button
                    className="cursor-pointer rounded-md bg-green-700 p-2 px-4 font-semibold text-white"
                    onClick={handleSubmit}
                  >
                    Add <i className="fa-solid fa-plus"></i>&nbsp;
                  </button>

                  <button
                    onClick={() => setSelectedIndex(0)}
                    className="cursor-pointer rounded-md bg-blue-600 p-2 px-4 font-semibold text-white"
                  >
                    <i className="fa-solid fa-chevron-left"></i>&nbsp; Previous
                  </button>
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </>
  );
};

export default AddCorrectionRequest;

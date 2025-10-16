import common from "@/common/common";
import ErrorMessage from "@/components/component/ErrorMessage";
import staticDataContext from "@/context/staticDataContext";
import statusContext from "@/context/statusContext";
import { zipDownload } from "@/lib/utils";
import { useContext, useState } from "react";

const GenerateReport = () => {
  const entity = "generateReport";
  const { Quarter, Tan, typeOfForm, financialYear } =
    useContext(staticDataContext);
  const { showSuccess, showWarning } = useContext(statusContext);

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});

  const validate = (data) => {
    const newErrors = {};
    const prettyFieldName = (field) => {
      return field
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
    };
    let requiredFields = [
      "typeOfReport",
      "tanNumber",
      "fy",
      "typeOfForm",
      "quarter",
    ];
    // Remove conditionally optional fields if report type is Annual Report
    if (data.typeOfReport === "Annual Report") {
      requiredFields = requiredFields.filter(
        (field) => field !== "typeOfForm" && field !== "quarter"
      );
    }
    // Custom validations for specific fields
    requiredFields.forEach((field) => {
      if (field === "fy") {
        if (!data[field] || data[field].trim() === "") {
          newErrors[field] = `Financial Year is required`;
        }
      } else if (field === "typeOfForm") {
        if (!data[field] || data[field].trim() === "") {
          newErrors[field] = `Stream is required`;
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
      const response = await common.getGenerateReport(entity, formData);
      showSuccess("File Downloaded Successfully");
      zipDownload(response);
    } catch (error) {
      showWarning(
        "Certificate not available!",
        "File not found for this TAN Number"
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
        <div className="w-[60%] space-y-5 rounded-md p-3 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
          <div className="text-center font-bold text-[var(--primary-color)]">
            <h1 className="text-2xl leading-15">Download Reports</h1>
            <h3 className="text-xl">
              (Tax Audit Report/Form 27A/Acknowledgement/Annual Report)
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 w-full">
              <label
                htmlFor="report"
                className="font-semibold text-[var(--primary-color)]"
              >
                Type of Report
              </label>
              <select
                name="typeOfReport"
                id="typeOfReport"
                value={formData.typeOfReport || ""}
                onChange={handleInputChange}
                className="custom-scrollbar mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
              >
                <option value="">Select Type of Report</option>
                <option value="Tax Audit Report">Tax Audit Report</option>
                <option value="Annual Report">Annual Report</option>
                <option value="Acknowledgment">Acknowledgement</option>
              </select>
              <ErrorMessage error={errors.typeOfReport} />
            </div>
            <div className="mb-3 w-full">
              <label
                htmlFor="tanNumber"
                className="font-semibold text-[var(--primary-color)]"
              >
                TAN Number
              </label>
              <select
                name="tanNumber"
                id="tanNumber"
                value={formData.tanNumber || ""}
                onChange={handleInputChange}
                className="custom-scrollbar mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
              >
                <option value="">Select TAN Number</option>
                {Tan &&
                  Tan.length > 0 &&
                  Tan.map((tanNumber, index) => {
                    return (
                      <option key={index} value={tanNumber}>
                        {tanNumber}
                      </option>
                    );
                  })}
              </select>
              <ErrorMessage error={errors.tanNumber} />
            </div>
            {formData.typeOfReport !== "Annual Report" && (
              <div className="mb-3 w-full">
                <label
                  htmlFor="stream"
                  className="font-semibold text-[var(--primary-color)]"
                >
                  Stream
                </label>
                <select
                  name="typeOfForm"
                  id="typeOfForm"
                  value={formData.typeOfForm || ""}
                  onChange={handleInputChange}
                  className="custom-scrollbar mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                >
                  <option value="">Select Stream</option>
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
                <ErrorMessage error={errors.typeOfForm} />
              </div>
            )}
            <div className="mb-3 w-full">
              <label
                htmlFor="fy"
                className="font-semibold text-[var(--primary-color)]"
              >
                Financial Year
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
            {formData.typeOfReport !== "Annual Report" && (
              <div className="mb-3 w-full">
                <label
                  htmlFor="quarter"
                  className="font-semibold text-[var(--primary-color)]"
                >
                  Quarter
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
            )}

            <div className="flex justify-center">
              <button
                type="submit"
                className="cursor-pointer rounded-md bg-[#00c950] p-2 px-4 font-semibold text-white"
              >
                <i class="fa-solid fa-download"></i>&nbsp; Download
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default GenerateReport;

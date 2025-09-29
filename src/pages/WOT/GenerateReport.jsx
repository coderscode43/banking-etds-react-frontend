import React, { useState, useContext } from "react";
import clsx from "clsx";
import staticDataContext from "@/context/staticDataContext";
import MISGenerateReportModal from "@/components/modals/MISGenerateReportModal";

const GenerateReport = () => {
  const { Quarter, Tan, typeOfForm, financialYear } =
    useContext(staticDataContext);

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    report: "",
    tanNumber: "",
    stream: "",
    fy: "",
    quarter: "",
  });

  const validateField = (fieldName) => {
    let errorMsg = "";

    if (
      (fieldName === "stream" || fieldName === "quarter") &&
      formData.report === "annualReport"
    ) {
      // Don't validate stream or quarter if Annual Report
      errorMsg = "";
    } else if (!formData[fieldName]) {
      // Normal required validation
      errorMsg = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required.`;
    }

    setErrors((prev) => ({ ...prev, [fieldName]: errorMsg }));
    return !errorMsg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data and clear error on change
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Fields to always validate
    const fieldsToValidate = ["report", "tanNumber", "fy"];

    // Add stream and quarter if report is NOT annualReport
    if (formData.report !== "annualReport") {
      fieldsToValidate.push("stream", "quarter");
    }

    let allValid = true;
    fieldsToValidate.forEach((field) => {
      const isValid = validateField(field);
      if (!isValid) allValid = false;
    });

    if (allValid) {
      alert("Form submitted!");
      // Handle form submission logic here
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-[60%] space-y-5 rounded-md p-3 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
        <div className="text-center font-bold text-[var(--primary-color)]">
          <h1 className="text-2xl leading-15">Download Reports</h1>
          <h3 className="text-xl">
            (Tax Audit Report/Form 27A/Acknowledgement/Annual Report)
          </h3>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Type of Report */}
          <div className="mb-3 w-full">
            <label
              htmlFor="report"
              className="font-semibold text-[var(--primary-color)]"
            >
              Type of Report
            </label>
            <select
              name="report"
              id="report"
              value={formData.report}
              onChange={handleChange}
              onBlur={() => validateField("report")}
              className={clsx(
                "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900"
              )}
            >
              <option value="">Select Type of Report</option>
              <option value="taxAuditReport">Tax Audit Report</option>
              <option value="annualReport">Annual Report</option>
              <option value="acknowledgement">Acknowledgement</option>
            </select>
            {errors.report && (
              <p className="mt-1 text-sm text-red-500">{errors.report}</p>
            )}
          </div>

          {/* TAN Number */}
          <div className="mb-3 w-full">
            <label
              htmlFor="tanNumber"
              className="font-semibold text-[var(--primary-color)]"
            >
              TAN Number
            </label>
            <select
              name="TAN"
              id="TAN"
              value={formData.tanNumber}
              onChange={handleChange}
              onBlur={() => validateField("tanNumber")}
              className={clsx(
                "custom-scrollbar mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900"
              )}
            >
              <option value="">Select TAN Number</option>
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
            {errors.tanNumber && (
              <p className="mt-1 text-sm text-red-500">{errors.tanNumber}</p>
            )}
          </div>

          {/* Conditionally render Stream */}
          {formData.report !== "annualReport" && (
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
                value={formData.stream}
                onChange={handleChange}
                onBlur={() => validateField("stream")}
                className={clsx(
                  "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900"
                )}
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
              {errors.stream && (
                <p className="mt-1 text-sm text-red-500">{errors.stream}</p>
              )}
            </div>
          )}

          {/* Financial Year */}
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
              value={formData.fy}
              onChange={handleChange}
              onBlur={() => validateField("fy")}
              className={clsx(
                "custom-scrollbar mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900"
              )}
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
            {errors.fy && (
              <p className="mt-1 text-sm text-red-500">{errors.fy}</p>
            )}
          </div>

          {/* Conditionally render Quarter */}
          {formData.report !== "annualReport" && (
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
                onChange={handleChange}
                onBlur={() => validateField("quarter")}
                className={clsx(
                  "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900"
                )}
              >
                <option value="">Select Quarter</option>
                {Quarter &&
                  Quarter.length > 0 &&
                  Quarter.map((qtr, index) => {
                    return (
                      <option key={index} value={qtr}>
                        {qtr}
                      </option>
                    );
                  })}
              </select>
              {errors.quarter && (
                <p className="mt-1 text-sm text-red-500">{errors.quarter}</p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center">
            {/* <button
              type="submit"
              className="rounded-md bg-green-500 p-2 text-center text-white"
            >
              <i className="fa-solid fa-download"></i> Download
            </button> */}
            <MISGenerateReportModal />
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenerateReport;

import common from "@/common/common";
import staticDataContext from "@/context/staticDataContext";
import statusContext from "@/context/statusContext";
import { zipDownload } from "@/lib/utils";
import { useContext, useState } from "react";
import ErrorMessage from "./ErrorMessage";

const DownloadAllCertificate = () => {
  const page = "downloadBranchZip";

  const { showSuccess, showWarning } = useContext(statusContext);
  const { Quarter, Tan, typeOfCertificate, financialYear } =
    useContext(staticDataContext);

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const validate = (data) => {
    const newErrors = {};

    const prettyFieldName = (field) => {
      return field
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
    };

    let requiredFields = ["tanNumber", "typeOfCertificate", "fy", "quarter"];

    requiredFields.forEach((field) => {
      if (field === "fy") {
        if (!data[field] || data[field].trim() === "") {
          newErrors[field] = `Financial Year is required`;
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
      const response = await common.getDownloadCerticate(page, formData);
      showSuccess("File Downloaded Successfully");
      zipDownload(response);
    } catch (error) {
      showWarning(
        "Certificate not available!",
        "Generation of zip file in process, please check after sometime"
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
      <div className="w-full space-y-5 rounded-md p-3 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
        <div className="text-center font-bold text-[var(--primary-color)]">
          <h1 className="text-2xl leading-15">Download All Certificates</h1>
          <h3 className="text-xl">(Form 16A/16/27D)</h3>
        </div>

        <form
          className="flex w-full flex-wrap items-center-safe justify-center gap-3"
          onSubmit={handleSubmit}
        >
          {/* TAN Number */}
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
          <div className="mb-3 w-full">
            <label
              htmlFor="certificateType"
              className="font-semibold text-[var(--primary-color)]"
            >
              Type of Certificate
            </label>
            <select
              name="typeOfCertificate"
              id="typeOfCertificate"
              value={formData.typeOfCertificate}
              onChange={handleInputChange}
              className="custom-scrollbar mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
            >
              <option value="">Select Certificate</option>
              {typeOfCertificate &&
                typeOfCertificate.length > 0 &&
                typeOfCertificate.map((certificate, index) => {
                  return (
                    <option key={index} value={certificate}>
                      {certificate}
                    </option>
                  );
                })}
            </select>{" "}
            <ErrorMessage error={errors.typeOfCertificate} />
          </div>
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
                Quarter.map((qtr, index) => {
                  return (
                    <option key={index} value={qtr}>
                      {qtr}
                    </option>
                  );
                })}
            </select>
            <ErrorMessage error={errors.quarter} />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="cursor-pointer rounded-md bg-green-500 p-2 text-center text-white"
            >
              <i className="fa-solid fa-download"></i> Download
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default DownloadAllCertificate;

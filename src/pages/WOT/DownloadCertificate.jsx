import DownloadCertificateModal from "@/components/modals/DownloadCertificateModal";
import staticDataContext from "@/context/staticDataContext";
import {
  Input,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import clsx from "clsx";
import { useContext } from "react";

const categories = [
  {
    name: "Download Certificate For Single PAN",
    title: "Form 16A/16/27D",
  },
  {
    name: "Download Certificate For Multiple PAN",
    title: "Form 16A/16/27D",
  },
  {
    name: "Download All Certificates",
    title: "Form 16A/16/27D",
  },
];

const DownloadCertificate = () => {
  const formData = "";
  const { Quarter, Tan, typeOfCertificate, financialYear } =
    useContext(staticDataContext);
  return (
    <>
      <div>
        <TabGroup className="flex w-full flex-col items-center">
          <TabList className="flex w-[73.5%] justify-between rounded-md border-gray-200 bg-gray-100">
            {categories.map(({ name }) => (
              <Tab
                key={name}
                className={({ selected }) =>
                  `w-full cursor-pointer space-x-1 rounded-md border-0 px-2 py-2 font-semibold ${
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
          <TabPanels className="mt-9 w-[73.5%]">
            <TabPanel
              key={categories.name}
              className="rounded-xl bg-gray-100 shadow-sm"
            >
              <div className="w-full space-y-5 rounded-md bg-white p-3 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
                <div className="text-center font-bold text-[var(--primary-color)]">
                  <h1 className="text-2xl leading-15">
                    Download Certificate For Single PAN
                  </h1>
                  <h3 className="text-xl">(Form 16A/16/27D)</h3>
                </div>

                <form className="flex w-full flex-wrap items-center-safe justify-center gap-3">
                  {/* Type of Report */}
                  <div className="mb-3 w-full">
                    <label className="font-semibold text-[var(--primary-color)]">
                      PAN Number
                    </label>
                    <Input
                      id="pan"
                      name="pan"
                      placeholder="Enter PAN Number"
                      className={clsx(
                        "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900"
                      )}
                    />
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
                      name="tan"
                      id="tan"
                      className={clsx(
                        "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900"
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
                  </div>

                  <div className="mb-3 w-full">
                    <label
                      htmlFor="certificateType"
                      className="font-semibold text-[var(--primary-color)]"
                    >
                      Type of Certificate
                    </label>
                    <select
                      name="typeofCertificate"
                      id="typeofCertificate"
                      value={formData.certificateType}
                      className={clsx(
                        "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                      )}
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
                    </select>
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
                      name="financialYear"
                      id="financialYear"
                      value={formData.fy}
                      className={clsx(
                        "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
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
                        className={clsx(
                          "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
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
                    </div>
                  )}

                  {/* Submit Button */}
                  <DownloadCertificateModal />
                </form>
              </div>
            </TabPanel>

            <TabPanel
              key={categories.name}
              className="rounded-xl bg-white shadow-sm"
            >
              <div className="w-full space-y-5 rounded-md p-3 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
                <div className="text-center font-bold text-[var(--primary-color)]">
                  <h1 className="text-2xl leading-15">
                    Download Certificate For Multiple PAN
                  </h1>
                  <h3 className="text-xl">(Form 16A/16/27D)</h3>
                </div>

                <form>
                  {/* TAN Number */}
                  <div className="mb-3 w-full">
                    <label
                      htmlFor="tanNumber"
                      className="font-semibold text-[var(--primary-color)]"
                    >
                      TAN Number
                    </label>
                    <select
                      name="tan"
                      id="tan"
                      value={formData.tanNumber}
                      className={clsx(
                        "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
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
                  </div>
                  <div className="mb-3 w-full">
                    <label
                      htmlFor="certificateType"
                      className="font-semibold text-[var(--primary-color)]"
                    >
                      Type of Certificate
                    </label>
                    <select
                      name="typeofCertificate"
                      id="typeofCertificate"
                      value={formData.certificateType}
                      className={clsx(
                        "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                      )}
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
                    </select>
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
                      className={clsx(
                        "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900"
                      )}
                      name="financialYear"
                      id="financialYear"
                      value={formData.fy}
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
                      className={clsx(
                        "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
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
                  </div>

                  <div className="mb-3 w-full">
                    <label className="font-semibold text-[var(--primary-color)]">
                      PAN Number
                    </label>
                    <Input
                      placeholder="Enter PAN Number"
                      className={clsx(
                        "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                      )}
                    />
                  </div>
                  {/* Submit Button */}
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="rounded-md bg-green-500 p-2 text-center text-white"
                    >
                      <i className="fa-solid fa-download"></i> Download
                    </button>
                  </div>
                </form>
              </div>
            </TabPanel>

            <TabPanel
              key={categories.name}
              className="rounded-xl bg-white shadow-sm"
            >
              <div className="w-full space-y-5 rounded-md p-3 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
                <div className="text-center font-bold text-[var(--primary-color)]">
                  <h1 className="text-2xl leading-15">
                    Download All Certificates
                  </h1>
                  <h3 className="text-xl">(Form 16A/16/27D)</h3>
                </div>

                <form>
                  {/* TAN Number */}
                  <div className="mb-3 w-full">
                    <label
                      htmlFor="tanNumber"
                      className="font-semibold text-[var(--primary-color)]"
                    >
                      TAN Number
                    </label>
                    <select
                      name="tan"
                      id="tan"
                      value={formData.tanNumber}
                      className={clsx(
                        "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
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
                      value={formData.certificateType}
                      className={clsx(
                        "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                      )}
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
                    </select>
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
                      className={clsx(
                        "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                      )}
                      name="financialYear"
                      id="financialYear"
                      value={formData.fy}
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
                      className={clsx(
                        "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
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
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="rounded-md bg-green-500 p-2 text-center text-white"
                    >
                      <i className="fa-solid fa-download"></i> Download
                    </button>
                  </div>
                </form>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </>
  );
};

export default DownloadCertificate;

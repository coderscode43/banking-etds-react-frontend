import {
  Input,
  Label,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import clsx from "clsx";

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
    date: "4d ago",
    commentCount: 1,
    shareCount: 2,
  },
];

const DownloadCertificate = () => {
  const formData = "";
  return (
    <>
      <div className="">
        <TabGroup className="flex w-full flex-col items-center">
          <TabList className="flex w-[73.5%] justify-between rounded-md border-gray-200 bg-gray-200 p-1">
            {categories.map(({ name }) => (
              <Tab
                key={name}
                className={({ selected }) =>
                  `cursor-pointer space-x-1 rounded-md border-0 px-4 py-2 font-semibold ${
                    selected
                      ? "bg-white text-[#1d3864] shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] outline-none"
                      : "bg-gray-200 text-gray-700 outline-none"
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

                <form className="flex flex-wrap gap-3">
                  {/* Type of Report */}
                  <div className="mb-3 w-full">
                    <label className="font-semibold text-[var(--primary-color)]">
                      PAN Number
                    </label>
                    <Input
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
                      name="tanNumber"
                      id="tanNumber"
                      className={clsx(
                        "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900"
                      )}
                    >
                      <option value="">Select TAN Number</option>
                      <option value="tanNumber1">TAN Number 1</option>
                      <option value="tanNumber2">TAN Number 2</option>
                      <option value="tanNumber3">TAN Number 3</option>
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
                      name="certificateType"
                      id="certificateType"
                      value={formData.certificateType}
                      className={clsx(
                        "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900"
                      )}
                    >
                      <option value="">Select Certificate</option>
                      <option value="certificate1">Certificate 1</option>
                      <option value="certificate2">Certificate 2</option>
                      <option value="certificate3">Certificate 3</option>
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
                      name="fy"
                      id="fy"
                      value={formData.fy}
                      className={clsx(
                        "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900"
                      )}
                    >
                      <option value="">Select Financial Year</option>
                      <option value="2025-26">2025-26</option>
                      <option value="2024-25">2024-25</option>
                      <option value="2023-24">2023-24</option>
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
                          "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900"
                        )}
                      >
                        <option value="">Select Quarter</option>
                        <option value="Q1">Q1</option>
                        <option value="Q2">Q2</option>
                        <option value="Q3">Q3</option>
                      </select>
                    </div>
                  )}

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
                      name="tanNumber"
                      id="tanNumber"
                      value={formData.tanNumber}
                      className={clsx(
                        "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900"
                      )}
                    >
                      <option value="">Select TAN Number</option>
                      <option value="tanNumber1">TAN Number 1</option>
                      <option value="tanNumber2">TAN Number 2</option>
                      <option value="tanNumber3">TAN Number 3</option>
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
                      name="certificateType"
                      id="certificateType"
                      value={formData.certificateType}
                      className={clsx(
                        "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900"
                      )}
                    >
                      <option value="">Select Certificate</option>
                      <option value="certificate1">Certificate 1</option>
                      <option value="certificate2">Certificate 2</option>
                      <option value="certificate3">Certificate 3</option>
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
                      name="fy"
                      id="fy"
                      value={formData.fy}
                    >
                      <option value="">Select Financial Year</option>
                      <option value="2025-26">2025-26</option>
                      <option value="2024-25">2024-25</option>
                      <option value="2023-24">2023-24</option>
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
                        "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900"
                      )}
                    >
                      <option value="">Select Quarter</option>
                      <option value="Q1">Q1</option>
                      <option value="Q2">Q2</option>
                      <option value="Q3">Q3</option>
                    </select>
                  </div>

                  <div className="mb-3 w-full">
                    <label className="font-semibold text-[var(--primary-color)]">
                      PAN Number
                    </label>
                    <Input
                      placeholder="Enter PAN Number"
                      className={clsx(
                        "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                        "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none"
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
                      name="tanNumber"
                      id="tanNumber"
                      value={formData.tanNumber}
                      className={clsx(
                        "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900"
                      )}
                    >
                      <option value="">Select TAN Number</option>
                      <option value="tanNumber1">TAN Number 1</option>
                      <option value="tanNumber2">TAN Number 2</option>
                      <option value="tanNumber3">TAN Number 3</option>
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
                      name="certificateType"
                      id="certificateType"
                      value={formData.certificateType}
                      className={clsx(
                        "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900"
                      )}
                    >
                      <option value="">Select Certificate</option>
                      <option value="certificate1">Certificate 1</option>
                      <option value="certificate2">Certificate 2</option>
                      <option value="certificate3">Certificate 3</option>
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
                      name="fy"
                      id="fy"
                      value={formData.fy}
                    >
                      <option value="">Select Financial Year</option>
                      <option value="2025-26">2025-26</option>
                      <option value="2024-25">2024-25</option>
                      <option value="2023-24">2023-24</option>
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
                        "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900"
                      )}
                    >
                      <option value="">Select Quarter</option>
                      <option value="Q1">Q1</option>
                      <option value="Q2">Q2</option>
                      <option value="Q3">Q3</option>
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

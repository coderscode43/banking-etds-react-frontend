import staticDataContext from "@/context/staticDataContext";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCorrectionRequest = () => {
  const [showDoc, setShowDoc] = useState(false);

  const navigate = useNavigate();
  const { financialYear, Form } = useContext(staticDataContext);

  const categories = [
    { name: "Add Correction Request" },
    { name: "Add Correction Amount Details" },
  ];

  return (
    <>
      <div className="rounded-md p-4">
        <TabGroup className="mx-2 flex w-full flex-col items-center">
          <TabList className="flex w-full justify-around rounded-md border-gray-200 bg-gray-100 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
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
          <TabPanels className="mt-10 w-full rounded-md p-3 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
            <TabPanel key={categories.name}>
              <div className="flex">
                <div className="m-2 mb-3 flex max-w-[50%] flex-wrap gap-4">
                  <div className="flex w-full items-center">
                    <label className="w-[30%] font-semibold text-[var(--primary-color)]">
                      Financial Year<span className="text-red-600">*</span>
                    </label>
                    <select
                      name="fy"
                      id="fy"
                      className="mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
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

                  <div className="flex w-full items-center">
                    <label className="w-[30%] font-semibold text-[var(--primary-color)]">
                      RO Code<span className="text-red-600">*</span>
                    </label>
                    <input
                      name="roCode"
                      id="roCode"
                      placeholder="RO Code"
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                    />
                  </div>

                  <div className="flex w-full items-center">
                    <label className="w-[30%] font-semibold text-[var(--primary-color)]">
                      TAN<span className="text-red-600">*</span>
                    </label>
                    <input
                      name="tan"
                      id="tan"
                      placeholder="TAN"
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                    />
                  </div>

                  <div className="flex w-full items-center">
                    <label className="w-[30%] font-semibold text-[var(--primary-color)]">
                      PAN<span className="text-red-600">*</span>
                    </label>
                    <input
                      name="pan"
                      id="pan"
                      placeholder="PAN"
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                    />
                  </div>

                  <div className="flex w-full items-center">
                    <label className="w-[30%] font-semibold text-[var(--primary-color)]">
                      Name of Customer / Vendor / Employee
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      name="nameofCustomer/Vendor/Employee"
                      id="nameofCustomer/Vendor/Employee"
                      placeholder="Name of Customer /Vendor/Employee"
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="m-2 flex max-w-[50%] flex-wrap">
                  <div className="mt-3 flex w-full">
                    <label className="w-[23%] font-semibold text-[var(--primary-color)]">
                      Quarter<span className="text-red-600">*</span>
                    </label>

                    <span>
                      <input type="checkbox" name="q1" id="q1" />
                      <label
                        for="q1"
                        className="m-1 font-semibold text-[var(--primary-color)]"
                      >
                        Q1<span className="text-red-600">*</span>
                      </label>
                    </span>
                    <span>
                      <input type="checkbox" name="q2" id="q2" />
                      <label
                        for="q2"
                        className="m-1 font-semibold text-[var(--primary-color)]"
                      >
                        Q2<span className="text-red-600">*</span>
                      </label>
                    </span>
                    <span>
                      <input type="checkbox" name="q3" id="q3" />
                      <label
                        for="q3"
                        className="m-1 font-semibold text-[var(--primary-color)]"
                      >
                        Q3<span className="text-red-600">*</span>
                      </label>
                    </span>

                    <span>
                      <input type="checkbox" name="q4" id="q4" />
                      <label
                        for="q4"
                        className="m-1 font-semibold text-[var(--primary-color)]"
                      >
                        Q4<span className="text-red-600">*</span>
                      </label>
                    </span>

                    <span>
                      <input type="checkbox" name="allCheck" id="allCheck" />
                      <label
                        for="allCheck"
                        className="m-1 font-semibold text-[var(--primary-color)]"
                      >
                        All Check<span className="text-red-600">*</span>
                      </label>
                    </span>
                  </div>

                  <div className="mt-[6%] flex w-full items-center">
                    <label className="w-[30%] font-semibold text-[var(--primary-color)]">
                      Form<span className="text-red-600">*</span>
                    </label>
                    <select
                      name="form"
                      id="form"
                      className="mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                    >
                      <option value="">Select Form</option>
                      {Form &&
                        Form.length > 0 &&
                        Form.map((form, index) => {
                          return (
                            <option key={index} value={form}>
                              {form}
                            </option>
                          );
                        })}
                    </select>
                  </div>

                  <div className="mt-3 flex w-full flex-wrap gap-3">
                    <label className="w-[21%] font-semibold text-[var(--primary-color)]">
                      Type Of Correction
                      <span className="text-red-600">*</span>
                    </label>
                    <div className="ml- flex flex-col gap-2">
                      <div>
                        <input
                          type="checkbox"
                          name="PANUpdation"
                          id="PANUpdation"
                        />
                        <label
                          for="PANUpdation"
                          className="m-1 font-semibold text-[var(--primary-color)]"
                        >
                          PAN Updation<span className="text-red-600">*</span>
                        </label>
                      </div>

                      <div>
                        <input
                          type="checkbox"
                          name="mismatchInGrossAmount"
                          id="mismatchInGrossAmount"
                        />
                        <label
                          for="mismatchInGrossAmount"
                          className="m-[5px] font-semibold text-[var(--primary-color)]"
                        >
                          Mismatch In Gross Amount
                          <span className="text-red-600">*</span>
                        </label>
                      </div>

                      <div>
                        <input
                          type="checkbox"
                          name="mismatchInTDSAmount"
                          id="mismatchInTDSAmount"
                        />
                        <label
                          for="mismatchInTDSAmount"
                          className="m-1 font-semibold text-[var(--primary-color)]"
                        >
                          Mismatch In TDS Amount
                          <span className="text-red-600">*</span>
                        </label>
                      </div>

                      <div>
                        <input
                          type="checkbox"
                          name="sectionCorrection"
                          id="sectionCorrection"
                        />
                        <label
                          for="sectionCorrection"
                          className="m-1 font-semibold text-[var(--primary-color)]"
                        >
                          Section Correction
                          <span className="text-red-600">*</span>
                        </label>
                      </div>

                      <div>
                        <input
                          type="checkbox"
                          name="defaultCorrection"
                          id="defaultCorrection"
                        />
                        <label
                          for="defaultCorrection"
                          className="m-1 font-semibold text-[var(--primary-color)]"
                        >
                          Default Correction
                          <span className="text-red-600">*</span>
                        </label>
                      </div>

                      <div>
                        <input
                          type="checkbox"
                          name="addEntry/Challan"
                          id="addEntry/Challan"
                        />
                        <label
                          for="addEntry/Challan"
                          className="m-1 font-semibold text-[var(--primary-color)]"
                        >
                          Add Entry/Challan
                          <span className="text-red-600">*</span>
                        </label>
                      </div>

                      <div>
                        <input type="checkbox" name="others" id="others" />
                        <label
                          for="others"
                          className="m-1 font-semibold text-[var(--primary-color)]"
                        >
                          Others
                          <span className="text-red-600">*</span>
                        </label>
                      </div>

                      <div>
                        <input type="checkbox" name="exempted" id="exempted" />
                        <label
                          for="exempted"
                          className="m-1 font-semibold text-[var(--primary-color)]"
                        >
                          Exempted
                          <span className="text-red-600">*</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex w-full items-center">
                  <label className="ml-[8px] w-full font-semibold text-[var(--primary-color)]">
                    Mobile Number of who is Generate Correction/Query Request
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="mobileNumberofwhoisGenerateCorrection/QueryRequest"
                    id="mobileNumberofwhoisGenerateCorrection/QueryRequest"
                    placeholder="Mobile Number of who is Generate Correction/Query Request"
                    className="mt-1 block w-[91%] rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                  />
                </div>
              </div>
              <div className="mb-3 flex justify-end gap-4 py-3">
                <button
                  className="cursor-pointer rounded-md bg-red-600 p-2 px-4 font-semibold text-white"
                  onClick={() => navigate(-1)}
                >
                  <i className="fa-solid fa-reply-all"></i>&nbsp; Back
                </button>

                <button className="cursor-pointer rounded-md bg-blue-600 p-2 px-4 font-semibold text-white">
                  Next <i class="fa-solid fa-chevron-right"></i>&nbsp;
                </button>
              </div>
            </TabPanel>

            <TabPanel key={categories.name} className="">
              <div className="flex flex-wrap gap-3">
                <div className="flex w-full items-center">
                  <label className="w-[30%] font-semibold text-[var(--primary-color)]">
                    Response for Correction
                    <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    name="responseForCorrection"
                    id="responseForCorrection"
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                  />
                </div>

                <div className="relative mt-5 flex w-full items-center justify-start">
                  <label className="w-[30%] font-semibold text-[var(--primary-color)]">
                    Supporting Document <span className="text-red-600">*</span>
                  </label>
                  <button
                    onClick={() => setShowDoc((prev) => !prev)}
                    className="ml-[-83px] h-[40px] cursor-pointer rounded-md bg-green-700 p-2 px-4 text-white"
                  >
                    <i className="fa-solid fa-file px-2"></i>Add Document
                  </button>
                  {showDoc && (
                    <span className="absolute top-15 left-[23%] flex">
                      <input
                        type="file"
                        name="supportDocument"
                        id="supportDocument"
                        className="mt-1 block h-[40px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                      />

                      <button className="mt-1 ml-3 h-[40px] cursor-pointer rounded-sm bg-red-600 px-4 py-2 font-semibold text-white">
                        <i class="fa-solid fa-x"></i>
                      </button>
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-5 mb-3 flex justify-end gap-4 py-3">
                <button
                  className="cursor-pointer rounded-md bg-red-600 p-2 px-4 font-semibold text-white"
                  onClick={() => navigate(-1)}
                >
                  <i className="fa-solid fa-reply-all"></i>&nbsp; Back
                </button>

                <button className="cursor-pointer rounded-md bg-green-700 p-2 px-4 font-semibold text-white">
                  Add <i className="fa-solid fa-plus"></i>&nbsp;
                </button>

                <button className="cursor-pointer rounded-md bg-blue-600 p-2 px-4 font-semibold text-white">
                  Next <i class="fa-solid fa-chevron-right"></i>&nbsp;
                </button>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </>
  );
};

export default AddCorrectionRequest;

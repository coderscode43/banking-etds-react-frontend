import staticDataContext from "@/context/staticDataContext";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCorrectionRequest = () => {
  const navigate = useNavigate();

  const [showDoc, setShowDoc] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { financialYear, typeOfForm } = useContext(staticDataContext);

  const categories = [
    { name: "Add Correction Request" },
    { name: "Add Correction Amount Details" },
  ];

  const [formData, setFormData] = useState({
    fy: "",
    branchCode: "",
    tanOfCust: "",
    pan: "",
    name: "",
    quarter: {
      q1: false,
      q2: false,
      q3: false,
      q4: false,
      allCheck: false,
    },
    typeOfForm: "",
    correctionTypes: {
      typeOfCorrection_0: false,
      typeOfCorrection_1: false,
      typeOfCorrection_2: false,
      typeOfCorrection_3: false,
      typeOfCorrection_4: false,
      typeOfCorrection_5: false,
      typeOfCorrection_6: false,
      typeOfCorrection_7: false,
    },
    mobileNumber: "",
  });

  const validateFirstTabFields = () => {
    const {
      fy,
      branchCode,
      tanOfCust,
      pan,
      name,
      quarter,
      typeOfForm,
      correctionTypes,
      mobileNumber,
    } = formData;

    // Check if at least one quarter checkbox is checked
    const isQuarterChecked = Object.values(quarter).some(Boolean);

    // Check if at least one correction type checkbox is checked
    const isCorrectionChecked = Object.values(correctionTypes).some(Boolean);

    if (
      !fy ||
      !branchCode ||
      !tanOfCust ||
      !pan ||
      !name ||
      !mobileNumber ||
      !typeOfForm ||
      !isQuarterChecked ||
      !isCorrectionChecked
    ) {
      return false; // Validation failed
    }

    return true; // Validation passed
  };

  return (
    <>
      <div className="rounded-md p-4">
        <TabGroup
          className="mx-2 flex w-full flex-col items-center"
          selectedIndex={selectedIndex}
          onChange={(index) => {
            if (index === 0) {
              setSelectedIndex(0);
            } else if (index === 1) {
              if (validateFirstTabFields()) {
                setSelectedIndex(1);
              } else {
                alert(
                  "Please complete all required fields before switching to the second tab."
                );
              }
            }
          }}
        >
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
                      value={formData.fy}
                      onChange={(e) =>
                        setFormData({ ...formData, fy: e.target.value })
                      }
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
                      name="branchCode"
                      id="branchCode"
                      value={formData.branchCode}
                      onChange={(e) =>
                        setFormData({ ...formData, branchCode: e.target.value })
                      }
                      placeholder="RO Code"
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                    />
                  </div>

                  <div className="flex w-full items-center">
                    <label className="w-[30%] font-semibold text-[var(--primary-color)]">
                      TAN<span className="text-red-600">*</span>
                    </label>
                    <input
                      name="tanOfCust"
                      id="tanOfCust"
                      value={formData.tanOfCust}
                      onChange={(e) =>
                        setFormData({ ...formData, tanOfCust: e.target.value })
                      }
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
                      value={formData.pan}
                      onChange={(e) =>
                        setFormData({ ...formData, pan: e.target.value })
                      }
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
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
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
                      <input
                        type="checkbox"
                        name="q1"
                        id="q1"
                        checked={formData.quarter.q1}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            quarter: {
                              ...formData.quarter,
                              q1: e.target.checked,
                            },
                          })
                        }
                      />
                      <label
                        htmlFor="q1"
                        className="m-1 font-semibold text-[var(--primary-color)]"
                      >
                        Q1
                      </label>
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        name="q2"
                        id="q2"
                        checked={formData.quarter.q2}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            quarter: {
                              ...formData.quarter,
                              q2: e.target.checked,
                            },
                          })
                        }
                      />
                      <label
                        htmlFor="q2"
                        className="m-1 font-semibold text-[var(--primary-color)]"
                      >
                        Q2
                      </label>
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        name="q3"
                        id="q3"
                        checked={formData.quarter.q3}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            quarter: {
                              ...formData.quarter,
                              q3: e.target.checked,
                            },
                          })
                        }
                      />
                      <label
                        htmlFor="q3"
                        className="m-1 font-semibold text-[var(--primary-color)]"
                      >
                        Q3
                      </label>
                    </span>

                    <span>
                      <input
                        type="checkbox"
                        name="q4"
                        id="q4"
                        checked={formData.quarter.q4}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            quarter: {
                              ...formData.quarter,
                              q4: e.target.checked,
                            },
                          })
                        }
                      />
                      <label
                        htmlFor="q4"
                        className="m-1 font-semibold text-[var(--primary-color)]"
                      >
                        Q4
                      </label>
                    </span>

                    <span>
                      <input
                        type="checkbox"
                        name="allCheck"
                        id="allCheck"
                        checked={formData.quarter.allCheck}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            quarter: {
                              ...formData.quarter,
                              allCheck: e.target.checked,
                            },
                          })
                        }
                      />
                      <label
                        htmlFor="allCheck"
                        className="m-1 font-semibold text-[var(--primary-color)]"
                      >
                        All Check
                      </label>
                    </span>
                  </div>

                  <div className="mt-[6%] flex w-full items-center">
                    <label className="w-[30%] font-semibold text-[var(--primary-color)]">
                      Form<span className="text-red-600">*</span>
                    </label>
                    <select
                      name="typeOfForm"
                      id="typeOfForm"
                      value={formData.typeOfForm}
                      onChange={(e) =>
                        setFormData({ ...formData, typeOfForm: e.target.value })
                      }
                      className="mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
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

                  <div className="mt-3 flex w-full flex-wrap gap-3">
                    <label className="w-[21%] font-semibold text-[var(--primary-color)]">
                      Type Of Correction
                      <span className="text-red-600">*</span>
                    </label>
                    <div className="ml- flex flex-col gap-2">
                      <div>
                        <input
                          type="checkbox"
                          name="typeOfCorrection_0"
                          id="typeOfCorrection_0"
                          checked={formData.correctionTypes.typeOfCorrection_0}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              correctionTypes: {
                                ...formData.correctionTypes,
                                typeOfCorrection_0: e.target.checked,
                              },
                            })
                          }
                        />
                        <label
                          htmlFor="typeOfCorrection_0"
                          className="m-1 font-semibold text-[var(--primary-color)]"
                        >
                          PAN Updation
                        </label>
                      </div>

                      <div>
                        <input
                          type="checkbox"
                          name="typeOfCorrection_1"
                          id="typeOfCorrection_1"
                          checked={formData.correctionTypes.typeOfCorrection_1}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              correctionTypes: {
                                ...formData.correctionTypes,
                                typeOfCorrection_1: e.target.checked,
                              },
                            })
                          }
                        />
                        <label
                          htmlFor="typeOfCorrection_1"
                          className="m-[5px] font-semibold text-[var(--primary-color)]"
                        >
                          Mismatch In Gross Amount
                        </label>
                      </div>

                      <div>
                        <input
                          type="checkbox"
                          name="typeOfCorrection_2"
                          id="typeOfCorrection_2"
                          checked={formData.correctionTypes.typeOfCorrection_2}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              correctionTypes: {
                                ...formData.correctionTypes,
                                typeOfCorrection_2: e.target.checked,
                              },
                            })
                          }
                        />
                        <label
                          htmlFor="typeOfCorrection_2"
                          className="m-1 font-semibold text-[var(--primary-color)]"
                        >
                          Mismatch In TDS Amount
                        </label>
                      </div>

                      <div>
                        <input
                          type="checkbox"
                          name="typeOfCorrection_3"
                          id="typeOfCorrection_3"
                          checked={formData.correctionTypes.typeOfCorrection_3}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              correctionTypes: {
                                ...formData.correctionTypes,
                                typeOfCorrection_3: e.target.checked,
                              },
                            })
                          }
                        />
                        <label
                          htmlFor="typeOfCorrection_3"
                          className="m-1 font-semibold text-[var(--primary-color)]"
                        >
                          Section Correction
                        </label>
                      </div>

                      <div>
                        <input
                          type="checkbox"
                          name="typeOfCorrection_4"
                          id="typeOfCorrection_4"
                          checked={formData.correctionTypes.typeOfCorrection_4}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              correctionTypes: {
                                ...formData.correctionTypes,
                                typeOfCorrection_4: e.target.checked,
                              },
                            })
                          }
                        />
                        <label
                          htmlFor="typeOfCorrection_4"
                          className="m-1 font-semibold text-[var(--primary-color)]"
                        >
                          Default Correction
                        </label>
                      </div>

                      <div>
                        <input
                          type="checkbox"
                          name="typeOfCorrection_5"
                          id="typeOfCorrection_5"
                          checked={formData.correctionTypes.typeOfCorrection_5}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              correctionTypes: {
                                ...formData.correctionTypes,
                                typeOfCorrection_5: e.target.checked,
                              },
                            })
                          }
                        />
                        <label
                          htmlFor="typeOfCorrection_5"
                          className="m-1 font-semibold text-[var(--primary-color)]"
                        >
                          Add Entry/Challan
                        </label>
                      </div>

                      <div>
                        <input
                          type="checkbox"
                          name="typeOfCorrection_6"
                          id="typeOfCorrection_6"
                          checked={formData.correctionTypes.typeOfCorrection_6}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              correctionTypes: {
                                ...formData.correctionTypes,
                                typeOfCorrection_6: e.target.checked,
                              },
                            })
                          }
                        />
                        <label
                          htmlFor="typeOfCorrection_6"
                          className="m-1 font-semibold text-[var(--primary-color)]"
                        >
                          Others
                        </label>
                      </div>

                      <div>
                        <input
                          type="checkbox"
                          name="typeOfCorrection_7"
                          id="typeOfCorrection_7"
                          checked={formData.correctionTypes.typeOfCorrection_7}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              correctionTypes: {
                                ...formData.correctionTypes,
                                typeOfCorrection_7: e.target.checked,
                              },
                            })
                          }
                        />
                        <label
                          htmlFor="typeOfCorrection_7"
                          className="m-1 font-semibold text-[var(--primary-color)]"
                        >
                          Exempted
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
                    name="mobileNumber"
                    id="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, mobileNumber: e.target.value })
                    }
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

                <button
                  onClick={() => {
                    if (validateFirstTabFields()) {
                      setSelectedIndex(1);
                    } else {
                      alert(
                        "complete all required fields before switching to the second tab."
                      );
                    }
                  }}
                  className="cursor-pointer rounded-md bg-blue-600 p-2 px-4 font-semibold text-white"
                >
                  Next <i className="fa-solid fa-chevron-right"></i>&nbsp;
                </button>
              </div>
            </TabPanel>

            <TabPanel key={categories.name}>
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
                        <i className="fa-solid fa-x"></i>
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

                <button
                  onClick={() => setSelectedIndex(0)}
                  className="cursor-pointer rounded-md bg-blue-600 p-2 px-4 font-semibold text-white"
                >
                  <i className="fa-solid fa-chevron-left"></i>&nbsp; Previous
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

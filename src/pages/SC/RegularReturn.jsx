import DynamicTableEdit from "@/components/tables/DynamicTableEdit";
import { Field, Label, Input } from "@headlessui/react";
import clsx from "clsx";
import React, { useState } from "react";

const RegularReturn = () => {
  const [date, setDate] = useState("");
  const [showDivs, setShowDivs] = useState(false);
  const tableHead = [
    {
      key: "srNo",
      label: "Sr.No",
    },
    {
      key: "ipaddrs",
      label: "Zip File",
    },
    {
      key: "username",
      label: "Username",
    },
    {
      key: "tan",
      label: "Tan",
    },
    {
      key: "fy",
      label: "Financial Year",
    },
    {
      key: "quarter",
      label: "Quarter",
    },
    {
      key: "form",
      label: "Form",
    },
    {
      key: "date",
      label: "Date",
    },
    {
      key: "status",
      label: "Status",
    },
  ];

  const tableData = [
    {
      id: 2291353,
      username: "directdownload",
      logsDate: "2025-09-02",
      quarter: "Q65",
      form: "Download Certificate",
      date: "2025-09-02",
      status: "this is status",
      tan: "skjhdfjkh",
      zipFile: "skjhdfjkh",
      fy: null,
    },
    {
      id: 2291353,
      username: "directdownload",
      logsDate: "2025-09-02",
      quarter: "Q65",
      form: "Download Certificate",
      date: "2025-09-02",
      status: "this is status",
      tan: "skjhdfjkh",
      zipFile: "skjhdfjkh",
      fy: null,
    },
  ];
  return (
    <>
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-[var(--primary-color)]">
          Regular Return
        </h1>
        <div>
          <Field className="flex flex-wrap gap-3">
            <div className="w-full md:w-1/4">
              <Label className="font-semibold text-[var(--primary-color)]">
                Financial Year
              </Label>
              <select
                name="FY"
                id="FY"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none",
                  "h-[38px]"
                )}
              >
                <option value="">Select Financial Year</option>
                <option value="2025-26">2025-26</option>
                <option value="2024-25">2024-25</option>
                <option value="2023-24">2023-24</option>
              </select>
            </div>
            <div className="w-full md:w-1/4">
              <Label className="font-semibold text-[var(--primary-color)]">
                Quarter
              </Label>
              <select
                name="quarter"
                id="quarter"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none",
                  "h-[38px]"
                )}
              >
                <option value="">Select Quarter</option>
                <option value="Q1">Q1</option>
                <option value="Q2">Q2</option>
                <option value="Q3">Q3</option>
              </select>
            </div>
            <div className="w-full md:w-1/4">
              <Label className="font-semibold text-[var(--primary-color)]">
                Form
              </Label>
              <select
                name="form"
                id="form"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none",
                  "h-[38px]"
                )}
              >
                <option value="">Select Form</option>
                <option value="Form1">Form 1</option>
                <option value="Form2">Form 2</option>
                <option value="Form3">Form 3</option>
              </select>
            </div>

            <div className="mt-6.5 flex gap-4">
              <button className="h-[38px] cursor-pointer rounded-sm bg-[#03d87f] px-3 text-2xl font-black text-white">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>

              <button
                onClick={() => setShowDivs((prev) => !prev)}
                className="h-[38px] cursor-pointer rounded-sm bg-[#ffa500] px-3 text-2xl font-black text-white"
              >
                <i className="fa-solid fa-filter"></i>
              </button>

              <button className="h-[38px] cursor-pointer rounded-sm bg-[#03d87f] px-3 text-2xl font-black text-white">
                <i class="fa-solid fa-comment"></i>
              </button>

              <button className="h-[38px] cursor-pointer rounded-sm bg-[#1761fd] px-3 text-2xl font-black text-white">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </Field>
        </div>

        {showDivs && (
          <div>
            <Field className="flex flex-wrap gap-3">
              <div className="w-full md:w-1/4">
                <Label className="font-semibold text-[var(--primary-color)]">
                  TAN
                </Label>
                <select
                  name="tan"
                  id="tan"
                  className={clsx(
                    "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                    "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none",
                    "h-[38px]"
                  )}
                >
                  <option value="">Select TAN</option>
                  <option value="tan1">TAN 1</option>
                  <option value="tan2">TAN 2</option>
                </select>
              </div>

              <div className="w-full md:w-1/4">
                <Label className="font-semibold text-[var(--primary-color)]">
                  Status
                </Label>
                <select
                  name="status"
                  id="status"
                  className={clsx(
                    "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                    "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none",
                    "h-[38px]"
                  )}
                >
                  <option value="">Select Status</option>
                  <option value="status1">Status 1</option>
                  <option value="status2">Status 2</option>
                </select>
              </div>

              <div className="w-full md:w-1/4">
                <Label className="font-semibold text-[var(--primary-color)]">
                  Added On Date
                </Label>
                <Input
                  type="date"
                  id="addedondate"
                  name="addedondate"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={clsx(
                    "mt-1 w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm/6 text-gray-900",
                    "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none"
                  )}
                />
              </div>
              <div>
                <button className="mt-7 h-[38px] cursor-pointer rounded-sm bg-[#f5325c] px-3 text-2xl font-black text-white">
                  <i class="fa-solid fa-upload"></i>
                </button>
              </div>
            </Field>
          </div>
        )}
        <div>
          <DynamicTableEdit tableHead={tableHead} tableData={tableData} />
        </div>
      </div>
    </>
  );
};

export default RegularReturn;

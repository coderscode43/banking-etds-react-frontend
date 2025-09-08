import React from "react";
import DynamicTableEdit from "@/components/tables/DynamicTableEdit";
import { Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";

const StatementStatus = () => {
  // Table Details
  const tableHead = [
    { label: "Sr.No.", key: "srNo" },
    { label: "TAN", key: "tan" },
    { label: "Form", key: "form" },
    { label: "Quarter", key: "quarter" },
    { label: "AS_ON_DATE", key: "AS_ON_DATE" },
    { label: "Financial Year", key: "fy" },
    { label: "Status", key: "status" },
    { label: "RT", key: "rt" },
  ];

  const tableData = [
    {
      id: 2290968,
      TAN: "MUMT27600G",
      FORM: "27Q",
      QUARTER: "Q3",
      AS_ON_DATE: "2025-06-26",
      FY: "201718",
      STATUS: "Processed Without Defaults",
      RT: "Regular",
      tan: "MUMT27600G",
      fy: "201718",
      form: "27Q",
      quarter: "Q3",
      status: "Processed Without Defaults",
      rt: "Regular",
      as_ON_DATE: "2025-06-26",
    },
  ];
  return (
    <>
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-[var(--primary-color)]">
          Statement Status
        </h1>

        <div>
          <form className="flex items-end justify-start gap-5">
            <Field className="flex gap-3">
              <div>
                <Label className="font-semibold text-[var(--primary-color)]">
                  TAN
                </Label>
                <select
                  name="tan"
                  id="tan"
                  className={clsx(
                    "mt-1 block w-72 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                    "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none",
                    "h-[38px]"
                  )}
                >
                  <option value="">Select TAN</option>
                  <option value="tan1">TAN 1</option>
                  <option value="tan2">TAN 2</option>
                </select>
              </div>

              <div>
                <Label className="font-semibold text-[var(--primary-color)]">
                  Quarter
                </Label>
                <select
                  name="quarter"
                  id="quarter"
                  className={clsx(
                    "mt-1 block w-72 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                    "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none",
                    "h-[38px]"
                  )}
                >
                  <option value="">Select Quarter</option>
                  <option value="qtr1">Quarter 1</option>
                  <option value="qtr2">Quarter 2</option>
                  <option value="qtr3">Quarter 3</option>
                  <option value="qtr4">Quarter 4</option>
                </select>
              </div>

              <div>
                <Label className="font-semibold text-[var(--primary-color)]">
                  Financial Year
                </Label>
                <select
                  name="fy"
                  id="fy"
                  className={clsx(
                    "mt-1 block w-72 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                    "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none",
                    "h-[38px]"
                  )}
                >
                  <option value="">Select Financial Year</option>
                  <option value="25-26">2025-2026</option>
                  <option value="24-25">2024-2025</option>
                </select>
              </div>
            </Field>
            <div className="flex gap-4">
              <button className="h-[38px] cursor-pointer rounded-sm bg-[#03d87f] px-3 text-2xl font-black text-white">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>

              <button className="h-[38px] cursor-pointer rounded-sm bg-[#ffa500] px-3 text-2xl font-black text-white">
                <i className="fa-solid fa-filter"></i>
              </button>
            </div>
          </form>
        </div>

        <div>
          <Field className="flex gap-3">
            <div>
              <Label className="font-semibold text-[var(--primary-color)]">
                Status
              </Label>
              <Input
                placeholder="Status"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none"
                )}
              />
            </div>

            <div>
              <Label className="font-semibold text-[var(--primary-color)]">
                RT
              </Label>
              <Input
                placeholder="RT"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none"
                )}
              />
            </div>

            <div>
              <Label className="font-semibold text-[var(--primary-color)]">
                Form
              </Label>
              <select
                name="form"
                id="form"
                className={clsx(
                  "mt-1 block w-72 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none",
                  "h-[38px]"
                )}
              >
                <option value="">Form</option>
                <option value="24q">24Q</option>
                <option value="26q">26Q</option>
                <option value="27q">27Q</option>
                <option value="27eq">27EQ</option>
              </select>
            </div>
          </Field>
        </div>

        <div>
          <DynamicTableEdit tableHead={tableHead} tableData={tableData} />
        </div>
      </div>
    </>
  );
};

export default StatementStatus;

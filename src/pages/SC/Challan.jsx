import React, { useState } from "react";
import DynamicTableEdit from "@/components/tables/DynamicTableEdit";
import { Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";

const Challan = () => {
  const [date, setDate] = useState("");
  const [date1, setDate1] = useState("");

  // Table Details
  const tableHead = [
    { label: "Sr.No.", key: "srNo" },
    { label: "CIN", key: "cin" },
    { label: "TAN", key: "tan" },
    { label: "Amount of Challan", key: "amountOfChallan" },
    { label: "Date of Deposition", key: "dateOfDeposition" },
    { label: "As on Date", key: "asOnDate" },
    { label: "Challan Mismatch", key: "challanMismatch" },
  ];

  const tableData = [
    {
      cin: "kjlkljiouoiu",
      tan: "PNET00060E",
      availableBalance: "hgf",
      amountOfChallan: "jhj",
      dateOfDeposition: null,
      asOnDate: "24-06-2025",
      challanMismatch: null,
      section: null,
      minorHead: null,
    },
  ];

  return (
    <>
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-[var(--primary-color)]">
          Challan Details
        </h1>

        <div>
          <form className="flex items-end justify-start gap-5">
            <Field className="flex gap-3">
              <div>
                <Label className="font-semibold text-[var(--primary-color)]">
                  CIN
                </Label>
                <Input
                  placeholder="CIN"
                  className={clsx(
                    "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                    "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none"
                  )}
                />
              </div>

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
                  Challan Mismatch
                </Label>
                <select
                  name="challanMismatch"
                  id="challanMismatch"
                  className={clsx(
                    "mt-1 block w-72 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                    "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none",
                    "h-[38px]"
                  )}
                >
                  <option value="">Select Option</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
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
                Amount of challan
              </Label>
              <Input
                placeholder="Amount of challan"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none"
                )}
              />
            </div>

            <div>
              <Label className="font-semibold text-[var(--primary-color)]">
                Date of Deposition
              </Label>
              <Input
                type="date"
                id="dateofdeposition"
                name="dateofdeposition"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={clsx(
                  "mt-1 w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none"
                )}
              />
            </div>

            <div>
              <Label className="font-semibold text-[var(--primary-color)]">
                As on Date
              </Label>
              <Input
                type="date"
                id="asOnDate"
                name="asOnDate"
                value={date1}
                onChange={(e) => setDate1(e.target.value)}
                className={clsx(
                  "mt-1 w-full rounded-md border border-gray-300 bg-white px-6 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none"
                )}
              />
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

export default Challan;

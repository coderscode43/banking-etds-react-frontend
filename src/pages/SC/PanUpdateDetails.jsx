import React, { useState } from "react";
import DynamicTableEdit from "@/components/tables/DynamicTableEdit";
import { Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";

const PanUpdateDetails = () => {
  const [showDivs, setShowDivs] = useState(false);
  // Table Details
  const tableHead = [
    { label: "Sr.No.", key: "srNo" },
    { label: "FY", key: "fy" },
    { label: "Month", key: "month" },
    { label: "Challan Heading", key: "challanHeading" },
    { label: "Customer/Vendor ID", key: "custVendId" },
    { label: "Previous Pan", key: "previousPAN" },
    { label: "New Pan", key: "newPAN" },
    { label: "Remark", key: "remark" },
  ];

  const tableData = [
    {
      id: 87,
      fy: "2024-25",
      month: "SEPTEMBER",
      challanHeading: "Interest_26Q",
      custVendId: "60526495",
      previousPAN: "NA",
      newPAN: "FQKPK0019N",
      action: null,
      remark: null,
      addNewEntry: null,
    },
  ];
  return (
    <>
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-[var(--primary-color)]">
          PAN Update Details
        </h1>

        <div>
          <Field className="flex flex-wrap gap-3">
            <div className="w-full md:w-1/4">
              <Label className="font-semibold text-[var(--primary-color)]">
                Challan Heading
              </Label>
              <Input
                name="challanHeading"
                id="challanHeading"
                placeholder="Challan Heading"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none"
                )}
              />
            </div>

            <div className="w-full md:w-1/4">
              <Label className="font-semibold text-[var(--primary-color)]">
                Customer/Vendor ID
              </Label>
              <Input
                name="custVendID"
                id="custVendID"
                placeholder="Customer/Vendor ID"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none"
                )}
              />
            </div>

            <div className="w-full md:w-1/4">
              <Label className="font-semibold text-[var(--primary-color)]">
                Previous PAN
              </Label>
              <Input
                name="previousPAN"
                id="previousPAN"
                placeholder="Previous PAN"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none"
                )}
              />
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
            </div>
          </Field>
        </div>

        {showDivs && (
          <div>
            <Field className="flex flex-wrap gap-3">
              <div className="w-full md:w-1/4">
                <Label className="font-semibold text-[var(--primary-color)]">
                  New PAN
                </Label>
                <Input
                  name="newPAN"
                  id="newPAN"
                  placeholder="New PAN"
                  className={clsx(
                    "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                    "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none"
                  )}
                />
              </div>

              <div className="w-full md:w-1/4">
                <Label className="font-semibold text-[var(--primary-color)]">
                  Financial Year
                </Label>
                <select
                  name="fy"
                  id="fy"
                  className={clsx(
                    "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                    "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none",
                    "h-[38px]"
                  )}
                >
                  <option value="">Select Financial Year</option>
                  <option value="24-25">2024-2025</option>
                  <option value="23-24">2023-2024</option>
                </select>
              </div>

              <div className="w-full md:w-1/4">
                <Label className="font-semibold text-[var(--primary-color)]">
                  Month
                </Label>
                <select
                  name="month"
                  id="month"
                  className={clsx(
                    "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                    "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none",
                    "h-[38px]"
                  )}
                >
                  <option value="">Select Month</option>
                  <option value="jan">January</option>
                  <option value="feb">February</option>
                  <option value="march">March</option>
                  <option value="april">April</option>
                  <option value="may">May</option>
                  <option value="june">June</option>
                  <option value="july">July</option>
                  <option value="aug">August</option>
                  <option value="sep">September</option>
                  <option value="october">October</option>
                  <option value="november">November</option>
                  <option value="december">December</option>
                </select>
              </div>
              <div>
                <button className="mt-7 h-[38px] cursor-pointer rounded-sm bg-[#1761fd] px-2 text-white">
                  Export to Excel
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

export default PanUpdateDetails;

import DynamicTableEdit from "@/components/tables/DynamicTableEdit";
import { Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";
import React, { useState } from "react";

const Ldc = () => {
  const [showDivs, setShowDivs] = useState(false);
  const tableHead = [
    {
      key: "srNo",
      label: "Sr.No",
    },
    {
      key: "LDC_NUMBER",
      label: "LDC_NUMBER",
    },
    {
      key: "NAME",
      label: "NAME",
    },
    {
      key: "TAN",
      label: "TAN",
    },
    {
      key: "PAN",
      label: "PAN",
    },
    {
      key: "FY",
      label: "Finanial Year",
    },
    {
      key: "VALID_FROM",
      label: "Valid From",
    },
    {
      key: "VALID_TO",
      label: "Valid To",
    },
    {
      key: "SECTION_CODE",
      label: "Section Code",
    },
    {
      key: "NATURE_OF_PAYMENT",
      label: "Nature of Payment",
    },
    {
      key: "LDC_RATE",
      label: "LDC Rate",
    },
    {
      key: "certificate_LIMIT",
      label: "Certificate Limit",
    },
    {
      key: "AMOUNT_CONSUMED",
      label: "Amount Consumed",
    },
    {
      key: "ISSUE_DATE",
      label: "Issued Date",
    },
    {
      key: "CANCEL_DATE",
      label: "Cancel Date",
    },
    {
      key: "as_ON_DATE",
      label: "As on Date",
    },
  ];

  const tableData = [
    {
      LDC_NUMBER: "sdgsdg",
      NAME: "dsfgdg",
      TAN: "MUMP20147B",
      PAN: "dfgdgdsd",
      FY: "202021",
      VALID_FROM: "2025-06-16",
      VALID_TO: "2025-06-12",
      SECTION_CODE: null,
      NATURE_OF_PAYMENT: "gfdfg",
      LDC_RATE: "sdgdsfg",
      CERTIFICATE_LIMIT: "dfg",
      AMOUNT_CONSUMED: "sdfg",
      ISSUE_DATE: "2025-06-19",
      CANCEL_DATE: "2025-06-11",
      AS_ON_DATE: "2025-06-25",
      pan: "dfgdgdsd",
      as_ON_DATE: "2025-06-25",
      valid_FROM: "2025-06-16",
      valid_TO: "2025-06-12",
      issue_DATE: "2025-06-19",
      section_CODE: null,
      cancel_DATE: "2025-06-11",
      ldc_NUMBER: "sdgsdg",
      amount_CONSUMED: "sdfg",
      ldc_RATE: "sdgdsfg",
      certificate_LIMIT: "dfg",
      nature_OF_PAYMENT: "gfdfg",
      fy: "202021",
      name: "dsfgdg",
      tan: "MUMP20147B",
    },
  ];
  return (
    <>
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-[var(--primary-color)]">
          Lower Deduction Certificate
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
                PAN
              </Label>
              <Input
                name="pan"
                id="pan"
                placeholder="PAN"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none"
                )}
              />
            </div>
            <div className="w-full md:w-1/4">
              <Label className="font-semibold text-[var(--primary-color)]">
                Name
              </Label>
              <Input
                name="name"
                id="name"
                placeholder="Name"
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
                  <option value="tan1">Tan 1</option>
                  <option value="tan2">Tan 2</option>
                  <option value="tan3">Tan 3</option>
                </select>
              </div>
              <div className="w-full md:w-1/4">
                <Label className="font-semibold text-[var(--primary-color)]">
                  Section Code
                </Label>
                <select
                  name="sectionCode"
                  id="sectionCode"
                  className={clsx(
                    "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                    "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none",
                    "h-[38px]"
                  )}
                >
                  <option value="">Select Section Code</option>
                  <option value="scode1">Section Code 1</option>
                  <option value="scode2">Section Code 2</option>
                  <option value="scode3">Section Code 3</option>
                </select>
              </div>
              <div className="w-full md:w-1/4">
                <Label className="font-semibold text-[var(--primary-color)]">
                  LDC Rate
                </Label>
                <Input
                  name="ldcRate"
                  id="ldcRate"
                  placeholder="LDC Rate"
                  className={clsx(
                    "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                    "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none"
                  )}
                />
              </div>

              <br />

              <div className="w-full md:w-1/4">
                <Label className="font-semibold text-[var(--primary-color)]">
                  LDC Number
                </Label>
                <Input
                  name="ldcNumber"
                  id="ldcNumber"
                  placeholder="LDC Number"
                  className={clsx(
                    "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                    "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none"
                  )}
                />
              </div>
              <div className="w-full md:w-1/4">
                <Label className="font-semibold text-[var(--primary-color)]">
                  Amount Consumed
                </Label>
                <Input
                  name="amountConsumed"
                  id="amountConsumed"
                  placeholder="Amount Consumed"
                  className={clsx(
                    "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                    "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none"
                  )}
                />
              </div>
              <div className="w-full md:w-1/4">
                <Label className="font-semibold text-[var(--primary-color)]">
                  Nature of Payment
                </Label>
                <Input
                  name="natureofPayment"
                  id="natureofPayment"
                  placeholder="Nature of Payment "
                  className={clsx(
                    "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                    "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none"
                  )}
                />
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

export default Ldc;

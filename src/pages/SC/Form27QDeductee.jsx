import React, { useState } from "react";
import DynamicTableEdit from "@/components/tables/DynamicTableEdit";
import { Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";

const Form27QDeductee = () => {
  const [showDivs, setShowDivs] = useState(false);
  // Table Details
  const tableHead = [
    { label: "Sr.No.", key: "srNo" },
    { label: "Quarter", key: "quarter" },
    { label: "Month", key: "month" },
    { label: "RO Code", key: "roCode" },
    { label: "Branch Code", key: "branchCode" },
    { label: "Challan Heading", key: "challanHeading" },
    { label: "PAN", key: "pan" },
    { label: "Name", key: "tan" },
    { label: "Section Code", key: "sectionCode" },
    { label: "TAN", key: "tan" },
    { label: "Action", key: "action" },
  ];

  const tableData = [
    {
      id: 5481507,
      challanHeading: "Interest_27Q",
      deducteeRefNo: null,
      deducteeCode: "02-INDIVIDUAL",
      pan: "AKHPJ5307L",
      name: "ISHU JOSHI",
      sectionCode: "195",
      dateOfPayment: "2023-04-30",
      amountPaid: 166.0,
      tds: 52.0,
      surcharge: 0.0,
      eduCess: 0.0,
      totalTaxDeducted: 52.0,
      totalTaxDeposited: 52.0,
      dateOfDeduction: "2023-04-30",
      rateAtWhichTaxCollected: 31.2,
      remarksReason: null,
      grossingUpIndicator: "N",
      certificateNumber: null,
      uniqueAcknowledgeNo: 0,
      countryOfResidence: "113-INDIA",
      emailId: null,
      contactNoOfDeductee: null,
      addressOfDeductee: null,
      taxIdentificationNo: 0,
      fy: "2023-24",
      quarter: "Q4",
      tdsRateAsPerItActs: "A-If TDS rate is as per Income Tax Act",
      natureOfRemittance: "27-INTEREST PAYMENT",
      branchCode: 4265,
      accNo: "2513613456",
      challanSrNo: 1,
      month: "JANUARY",
      custVendId: "82509532",
      uniqueRefNo: "KM73652431",
      cashWithdrawal194N: 0.0,
      cashWithdrawal194N20Lto1Cr: 0.0,
      cashWithdrawal194N1Cr: 0.0,
      TAN: "CALU00023C",
      roCode: "TXNRG,NROCU,TDA,,NRO",
      errorDescription: null,
      warningDescription: null,
      shortDeduction: 0.0,
      interestOnShortDeduction: 0.0,
      interestOnLatePayment: 0.0,
      interestOnLateDeduction: 0.0,
      resolved: false,
      comments: null,
      deducteeSrNo: 10351,
      tranAmt: 0,
      additionalDetail: null,
      tan: "CALU00023C",
    },
  ];
  return (
    <>
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-[var(--primary-color)]">
          Form 27Q Deductee Details
        </h1>

        <div>
          <Field className="flex flex-wrap gap-3">
            <div className="w-full md:w-1/4">
              <Label className="font-semibold text-[var(--primary-color)]">
                Quarter
              </Label>
              <select
                name="quarter"
                id="quarter"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none",
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

            <div className="w-full md:w-1/4">
              <Label className="font-semibold text-[var(--primary-color)]">
                Branch Code
              </Label>
              <Input
                name="branchCode"
                id="branchCode"
                placeholder="Branch Code"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none"
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
                  "focus:outline-none"
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

              <button className="h-[38px] cursor-pointer rounded-sm bg-[#024dec] px-3 text-2xl font-black text-white">
                <i class="fa-solid fa-table"></i>
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
                    "focus:outline-none",
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
                  PAN
                </Label>
                <Input
                  name="pan"
                  id="pan"
                  placeholder="PAN"
                  className={clsx(
                    "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                    "focus:outline-none"
                  )}
                />
              </div>
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
                    "focus:outline-none"
                  )}
                />
              </div>
              <br />
              <div className="w-full md:w-1/4">
                <Label className="font-semibold text-[var(--primary-color)]">
                  RO Code
                </Label>
                <Input
                  name="roCode"
                  id="roCode"
                  placeholder="RO Code"
                  className={clsx(
                    "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                    "focus:outline-none"
                  )}
                />
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
                    "focus:outline-none",
                    "h-[38px]"
                  )}
                >
                  <option value="">Select Section</option>
                  <option value="section1">Section 1</option>
                  <option value="section2">Section 2</option>
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
                    "focus:outline-none",
                    "h-[38px]"
                  )}
                >
                  <option value="">Select Status</option>
                  <option value="resolved">Resolved</option>
                  <option value="pending">Pending</option>
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

export default Form27QDeductee;

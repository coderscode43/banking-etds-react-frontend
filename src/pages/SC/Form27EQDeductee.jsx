import clsx from "clsx";
import common from "@/common/common";
import { useEffect, useState } from "react";
import { Field, Input, Label, Switch } from "@headlessui/react";
import DynamicTableActionTotal from "@/components/tables/DynamicTableActionTotal";
import FilterButtonDropdown from "@/components/component/FilterButtonDropdown";
import StickyScrollBar from "@/components/component/StickyScrollBar";
import { TooltipWrapper } from "@/components/component/Tooltip";

const Form27EQDeductee = () => {
  const entity = "form27EQDeductee";

  const [showDivs, setShowDivs] = useState(false);
  const [listData, setListData] = useState([]);
  const [autoResize, setAutoResize] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Set());

  useEffect(() => {
    const fetchListData = async () => {
      try {
        const response = await common.getListData(entity);
        setListData(response.data.entities);
      } catch (error) {
        console.error("Error fetching list data:", error);
      }
    };
    fetchListData();
  }, []);

  // Table Details
  const tableHead = [
    { label: "Sr.No.", key: "srNo" },
    { label: "Quarter", key: "quarter" },
    { label: "Month", key: "month" },
    { label: "RO Code", key: "roCode" },
    { label: "Branch Code", key: "branchCode" },
    { label: "Challan Heading", key: "challanHeading" },
    { label: "PAN", key: "pan" },
    { label: "Name", key: "name" },
    { label: "Section Code", key: "sectionCode" },
    { label: "TAN", key: "tan" },
    { label: "Action", key: "action" },
  ];

  const extraColumns = [
    { label: "Date of Payment", key: "dateOfPayment" },
    { label: "Date of Deduction", key: "dateOfDeduction" },
    { label: "Unique Ref Number", key: "uniqueRefNo" },
    { label: "Amount Paid", key: "amountPaid" },
    { label: "Account Number", key: "accNo" },
    { label: "TDS", key: "tds" },
    { label: "Surcharge", key: "surcharge" },
    { label: "Education Cess", key: "eduCess" },
    { label: "Total Tax Deducted", key: "totalTaxDeducted" },
    { label: "Total Tax Deposited", key: "totalTaxDeposited" },
    { label: "Certificate No", key: "certificateNumber" },
    { label: "Remarks Reason", key: "remarksReason" },
    { label: "Deductee Code", key: "deducteeCode" },
    { label: "Rate at which Tax Deducted", key: "rateAtWhichTaxCollected" },
    { label: "Cash Withdrawl (194N)", key: "cashWithdrawal194N" },
    {
      label: "Cash Withdrawl 194N(20L to 1cr)",
      key: "cashWithdrawal194N20Lto1Cr",
    },
    { label: "Cash Withdrawl 194N(>1cr)", key: "cashWithdrawal194N1Cr" },
    { label: "Error Description", key: "errorDescription" },
    { label: "Warning Description", key: "warningDescription" },
    { label: "Short Deduction", key: "shortDeduction" },
    { label: "Interest on Short Deduction", key: "interestOnShortDeduction" },
    { label: "Interest on Late Payment", key: "interestOnLatePayment" },
    { label: "Interest on Late Deduction", key: "interestOnLateDeduction" },
    { label: "Comments", key: "comments" },
    { label: "Status", key: "resolved" }, // ✅ Consider mapping boolean to "Pending"/"Resolved"
  ];

  const filteredExtraColumns = extraColumns.filter((col) =>
    checkedItems.has(col.key)
  );

  const insertIndex = Math.max(tableHead.length - 1, 0);

  const combinedTableHead = [
    ...tableHead.slice(0, insertIndex),
    ...filteredExtraColumns,
    ...tableHead.slice(insertIndex),
  ];

  const tableData = listData.map((data, index) => ({
    srNo: index + 1,
    ...data,
  }));

  return (
    <>
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-[var(--primary-color)]">
          Form 27EQ Deductee Details
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
                placeholder=" Branch Code"
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

            <div className="mt-6.5 flex gap-2">
              <TooltipWrapper tooltipText="Search">
                <button className="h-[38px] cursor-pointer rounded-sm bg-[#03d87f] px-3 text-2xl font-black text-white">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </TooltipWrapper>
              <TooltipWrapper tooltipText="Advance Search">
                <button
                  onClick={() => setShowDivs((prev) => !prev)}
                  className="h-[38px] cursor-pointer rounded-sm bg-[#ffa500] px-3 text-2xl font-black text-white"
                >
                  <i className="fa-solid fa-filter"></i>
                </button>
              </TooltipWrapper>
              <FilterButtonDropdown
                extraColumns={extraColumns}
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
              />
              <TooltipWrapper tooltipText="Auto-Resize">
                <Switch
                  checked={autoResize}
                  onChange={setAutoResize}
                  className={`group relative mt-2.5 inline-flex h-7 w-14 items-center rounded-full p-1 transition-colors ${
                    autoResize ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                      autoResize ? "translate-x-7" : "translate-x-0"
                    }`}
                  />
                </Switch>
              </TooltipWrapper>
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
              <br />
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
                  name="selectStatus"
                  id="selectStatus"
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
                <TooltipWrapper tooltipText="Export to Excel">
                  <button className="mt-7 h-[38px] cursor-pointer rounded-sm bg-[#1761fd] px-2 text-white">
                    Export to Excel
                  </button>
                </TooltipWrapper>
              </div>
            </Field>
          </div>
        )}
        <div>
          <DynamicTableActionTotal
            entity={entity}
            tableHead={combinedTableHead}
            tableData={tableData}
            autoResize={autoResize}
          />
        </div>
      </div>
    </>
  );
};

export default Form27EQDeductee;

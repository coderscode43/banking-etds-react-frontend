import clsx from "clsx";
import common from "@/common/common";
import { useEffect, useState } from "react";
import DynamicTable from "@/components/tables/DynamicTable";
import { Field, Input, Label } from "@headlessui/react";

const Ldc = () => {
  const entity = "ldc";

  const [showDivs, setShowDivs] = useState(false);
  const [listData, setListData] = useState([]);

  useEffect(() => {
    const fetchListData = async () => {
      try {
        const response = await common.getListData(entity);
        setListData(response.data.entities || []);
      } catch (error) {
        console.error("Error fetching list data:", error);
      }
    };

    fetchListData();
  }, []);

  const tableHead = [
    { key: "srNo", label: "Sr.No" },
    { key: "LDC_NUMBER", label: "LDC_NUMBER" },
    { key: "NAME", label: "NAME" },
    { key: "TAN", label: "TAN" },
    { key: "PAN", label: "PAN" },
    { key: "FY", label: "Finanial Year" },
    { key: "VALID_FROM", label: "Valid From" },
    { key: "VALID_TO", label: "Valid To" },
    { key: "SECTION_CODE", label: "Section Code" },
    { key: "NATURE_OF_PAYMENT", label: "Nature of Payment" },
    { key: "LDC_RATE", label: "LDC Rate" },
    { key: "certificate_LIMIT", label: "Certificate Limit" },
    { key: "AMOUNT_CONSUMED", label: "Amount Consumed" },
    { key: "ISSUE_DATE", label: "Issued Date" },
    { key: "CANCEL_DATE", label: "Cancel Date" },
    { key: "as_ON_DATE", label: "As on Date" },
  ];

  const tableData = listData?.map((data, index) => ({
    srNo: index + 1,
    ...data,
  }));
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
                  "focus:outline-none",
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
                    "focus:outline-none",
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
                    "focus:outline-none"
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
                    "focus:outline-none"
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
                    "focus:outline-none"
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
                    "focus:outline-none"
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
          <DynamicTable tableHead={tableHead} tableData={tableData} />
        </div>
      </div>
    </>
  );
};

export default Ldc;

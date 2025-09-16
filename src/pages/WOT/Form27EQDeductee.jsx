import clsx from "clsx";
import common from "@/common/common";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DynamicTableActionTotal from "@/components/tables/DynamicTableActionTotal";
import { Field, Input, Label } from "@headlessui/react";

const Form27EQDeductee = () => {
  const entity = "form27EQDeductee";

  const { fy, branchCode } = useParams();

  const [listData, setListData] = useState([]);
  const [showDivs, setShowDivs] = useState(false);

  useEffect(() => {
    const fetchListData = async () => {
      const response = await common.getWOTListData(entity, fy, branchCode);
      setListData(response.data.entities || []);
    };
    fetchListData();
  }, [fy, branchCode]);

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

  const tableData = listData?.map((data, index) => ({
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
                  "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
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
                id="roCode"
                name="roCode"
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
                id="name"
                name="name"
                placeholder="Name"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none"
                )}
              />
            </div>
            <div className="mt-6.5 flex gap-2">
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
                <i className="fa-solid fa-table"></i>
              </button>
            </div>
          </Field>
        </div>
        {showDivs && (
          <div className="">
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
                  Challan Heading
                </Label>
                <Input
                  placeholder="Challan Heading"
                  className={clsx(
                    "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                    "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none"
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
                    "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none",
                    "h-[38px]"
                  )}
                >
                  <option value="">Select Section</option>
                  <option value="section1">Section 1</option>
                  <option value="section2">Section 2</option>
                </select>
              </div>
              <div className="mt-6.5">
                <button className="h-[38px] cursor-pointer rounded-sm bg-[#1761fd] px-2 text-white">
                  Export to Excel
                </button>
              </div>
            </Field>
          </div>
        )}
        <div>
          <DynamicTableActionTotal
            entity={entity}
            tableHead={tableHead}
            tableData={tableData}
          />
        </div>
      </div>
    </>
  );
};

export default Form27EQDeductee;

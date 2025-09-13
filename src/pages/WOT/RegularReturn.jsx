import clsx from "clsx";
import common from "@/common/common";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DynamicTableAction from "@/components/tables/DynamicTableAction";
import { Field, Input, Label } from "@headlessui/react";

const RegularReturn = () => {
  const entity = "regularReturn";

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

  const tableHead = [
    { key: "srNo", label: "Sr.No" },
    { key: "date", label: "Date" },
    { key: "fy", label: "Financial year" },
    { key: "tan", label: "Tan" },
    { key: "quarter", label: "Quarter" },
    { key: "form", label: "Form" },
    { key: "addedBy", label: "Added by" },
    { key: "latestRemark", label: "Latest remark" },
    { key: "status", label: "Status" },
    { key: "returnFiling", label: "Return filing date" },
    { key: "action", label: "Action" },
  ];

  const tableData = listData?.map((data, index) => ({
    srNo: index + 1,
    ...data,
  }));

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
                  "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
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
                  "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
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
                  "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
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
            </div>
          </Field>
        </div>

        {showDivs && (
          <div className="">
            <Field className="flex flex-wrap gap-3">
              <div className="w-full md:w-1/4">
                <Label className="font-semibold text-[var(--primary-color)]">
                  Status
                </Label>
                <select
                  name="status"
                  id="status"
                  className={clsx(
                    "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                  )}
                >
                  <option value="">Select Status</option>
                  <option value="status1">Status 1</option>
                  <option value="status2">Status 2</option>
                  <option value="status3">Status 3</option>
                </select>
              </div>
              <div className="w-full md:w-1/4">
                <Label className="font-semibold text-[var(--primary-color)]">
                  Added On Date
                </Label>
                <Input
                  placeholder="addedDate"
                  name="addedDate"
                  id="addedDate"
                  type="date"
                  className={clsx(
                    "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                  )}
                />
              </div>
              <div className="mt-6.5">
                <button className="h-[38px] cursor-pointer rounded-sm bg-[#1761fd] px-2 text-white">
                  Export to Excel
                </button>
              </div>
            </Field>
          </div>
        )}
        <DynamicTableAction
          entity={entity}
          tableHead={tableHead}
          tableData={tableData}
        />
      </div>
    </>
  );
};

export default RegularReturn;

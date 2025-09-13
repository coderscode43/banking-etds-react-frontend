import clsx from "clsx";
import common from "@/common/common";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Field, Input, Label } from "@headlessui/react";
import DynamicTableAction from "@/components/tables/DynamicTableAction";

const CorrectionRequest = () => {
  const entity = "correctionRequest";

  const { fy, branchCode } = useParams();

  const [listData, setListData] = useState([]);
  const [showDivs, setShowDivs] = useState(false);

  useEffect(() => {
    const fetchListData = async () => {
      const response = await common.getWOTListData(entity, fy, branchCode);
      console.log(response);
      setListData(response.data.entities || []);
    };
    fetchListData();
  }, [fy, branchCode]);

  const tableHead = [
    { key: "srNo", label: "Sr.No" },
    { key: "ticketNumber", label: "Ticket Number" },
    { key: "fy", label: "Financial Year" },
    { key: "branchCode", label: "Branch" },
    { key: "quarter", label: "Quarter" },
    { key: "name", label: "Name of Customer" },
    { pan: "pan", label: "Pan Of Customer" },
    { key: "typeOfCorrection", label: "Type of Correction" },
    { key: "status", label: "Status" },
    { key: "lastUpdatedOn", label: "Last Updated On" },
    { key: "status", label: "Action" },
  ];

  const tableData = listData?.map((data, index) => ({
    srNo: index + 1,
    ...data,
  }));

  return (
    <>
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-[var(--primary-color)]">
          Correction Request Details
        </h1>

        <div>
          <Field className="flex flex-wrap gap-3">
            <div className="w-full md:w-1/4">
              <Label className="font-semibold text-[var(--primary-color)]">
                Status
              </Label>
              <select
                name="status"
                id="status"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "h-[38px] focus:outline-none"
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
                Financial Year
              </Label>
              <select
                name="fy"
                id="fy"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "h-[38px] focus:outline-none"
                )}
              >
                {" "}
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
                {" "}
                <option value="">Select Quarter</option>
                <option value="Q1">Q1</option>
                <option value="Q2">Q2</option>
                <option value="Q3">Q3</option>
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

              <button className="h-[38px] cursor-pointer rounded-sm bg-[#1761fd] px-3 text-2xl font-black text-white">
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          </Field>
        </div>
        {showDivs && (
          <div className="">
            <Field className="flex flex-wrap gap-3">
              <div className="w-full md:w-1/4">
                <Label className="font-semibold text-[var(--primary-color)]">
                  Ticket Number
                </Label>
                <Input
                  id="ticketNo"
                  name="ticketNo"
                  placeholder="Ticket Number"
                  className={clsx(
                    "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                    "focus:outline-none"
                  )}
                />
              </div>
              <div className="w-full md:w-1/4">
                <Label className="font-semibold text-[var(--primary-color)]">
                  Name of Customer
                </Label>
                <Input
                  id="customer"
                  name="customer"
                  placeholder="Name of Customer"
                  className={clsx(
                    "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                    "focus:outline-none"
                  )}
                />
              </div>
              <div className="w-full md:w-1/4">
                <Label className="font-semibold text-[var(--primary-color)]">
                  PAN of Customer
                </Label>
                <Input
                  id="pan"
                  name="pan"
                  placeholder="Pan number"
                  className={clsx(
                    "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                    "focus:outline-none"
                  )}
                />
              </div>
              <div className="w-full md:w-1/4">
                <Label className="font-semibold text-[var(--primary-color)]">
                  Type of Correction
                </Label>
                <select
                  name="correctionType"
                  id="correctionType"
                  className={clsx(
                    "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                    "h-[38px] focus:outline-none"
                  )}
                >
                  {" "}
                  <option value="">Select Correction Type</option>
                  <option value="CorrectionType1">Correction Type 1</option>
                  <option value="CorrectionType2">Correction Type 2</option>
                  <option value="CorrectionType3">Correction Type 3</option>
                </select>
              </div>
              <div className="w-full md:w-1/4">
                <Label className="font-semibold text-[var(--primary-color)]">
                  From Date Of Request
                </Label>
                <Input
                  placeholder="fromRequestDate"
                  name="fromRequestDate"
                  id="fromRequestDate"
                  type="date"
                  className={clsx(
                    "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                    "focus:outline-none"
                  )}
                />
              </div>
              <div className="w-full md:w-1/4">
                <Label className="font-semibold text-[var(--primary-color)]">
                  To Date Of Request
                </Label>
                <Input
                  placeholder="toRequestDate"
                  name="toRequestDate"
                  id="toRequestDate"
                  type="date"
                  className={clsx(
                    "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                    "focus:outline-none"
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

export default CorrectionRequest;

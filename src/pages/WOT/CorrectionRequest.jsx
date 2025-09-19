import clsx from "clsx";
import common from "@/common/common";
import { useEffect, useState, useContext } from "react";
import staticDataContext from "@/context/staticDataContext";
import { useNavigate, useParams } from "react-router-dom";
import { Field, Input, Label } from "@headlessui/react";
import DynamicTableAction from "@/components/tables/DynamicTableAction";
import { TooltipWrapper } from "@/components/component/Tooltip";
import Pagination from "@/components/component/Pagination";

const CorrectionRequest = () => {
  const entity = "correctionRequest";

  const navigate = useNavigate();
  const { fy, branchCode } = useParams();
  const { Quarter, status, typeOfCorrection, financialYear } =
    useContext(staticDataContext);

  const [listData, setListData] = useState([]);
  const [showDivs, setShowDivs] = useState(false);
  const [gotoPage, setGotoPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchListData = async () => {
      try {
        const response = await common.getWOTListData(entity, fy, branchCode);
        const count = response.data.count || 0;
        const pages = Math.ceil(count / 100);
        setTotalPages(pages);
        setListData(response.data.entities || []);
      } catch (error) {
        console.error("Error fetching list data:", error);
      }
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
    srNo: (currentPage - 1) * 100 + index + 1,
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
                {status &&
                  status.length > 0 &&
                  status.map((status, index) => {
                    return (
                      <option key={index} value={status}>
                        {status}
                      </option>
                    );
                  })}
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
                <option value="">Select Financial Year</option>
                {financialYear &&
                  financialYear.length > 0 &&
                  financialYear.map((FY, index) => {
                    return (
                      <option key={index} value={FY}>
                        {FY}
                      </option>
                    );
                  })}
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
                {Quarter &&
                  Quarter.length > 0 &&
                  Quarter.map((quarter, index) => {
                    return (
                      <option key={index} value={quarter}>
                        {quarter}
                      </option>
                    );
                  })}
              </select>
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
              <TooltipWrapper tooltipText="Add Correction Request">
                <button
                  onClick={() => {
                    navigate(
                      `/homeWOT/${branchCode}/${fy}/add/addCorrectionRequest`
                    );
                  }}
                  className="h-[38px] cursor-pointer rounded-sm bg-[#1761fd] px-3 text-2xl font-black text-white"
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              </TooltipWrapper>
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
                  <option value="">Select Correction Type</option>
                  {typeOfCorrection &&
                    typeOfCorrection.length > 0 &&
                    typeOfCorrection.map((correction, index) => {
                      return (
                        <option key={index} value={correction}>
                          {correction}
                        </option>
                      );
                    })}
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
              <div>
                <TooltipWrapper tooltipText="Export to Excel">
                  <button className="mt-6.5 h-[38px] cursor-pointer rounded-sm bg-[#1761fd] px-2 text-white">
                    Export to Excel
                  </button>
                </TooltipWrapper>
              </div>
            </Field>
          </div>
        )}
        <DynamicTableAction
          entity={entity}
          layoutType="wot"
          tableHead={tableHead}
          tableData={tableData}
        />
      </div>

      {/* Pagination */}
      {listData.length > 0 && (
        <Pagination
          entity={entity}
          setListData={setListData}
          totalPages={totalPages}
          gotoPage={gotoPage}
          setGotoPage={setGotoPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
};

export default CorrectionRequest;

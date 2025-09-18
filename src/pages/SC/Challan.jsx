import clsx from "clsx";
import common from "@/common/common";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Field, Input, Label } from "@headlessui/react";
import DynamicTable from "@/components/tables/DynamicTable";
import staticDataContext from "@/context/staticDataContext";
import { TooltipWrapper } from "@/components/component/Tooltip";

const Challan = () => {
  const entity = "challan";

  const { params } = useParams();
  const { Tan } = useContext(staticDataContext);

  const [date, setDate] = useState("");
  const [newDate, newSetDate] = useState("");
  const [showDivs, setShowDivs] = useState(false);
  const [listData, setListData] = useState([]);
  const [gotoPage, setGotoPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchListData = async () => {
      try {
        const response = await common.getListData(entity);
        const count = response.data.count || 0;
        const pages = Math.ceil(count / 100);
        setTotalPages(pages);
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
    { label: "CIN", key: "cin" },
    { label: "TAN", key: "tan" },
    { label: "Amount of Challan", key: "AMOUNT_OF_CLALLAN" },
    { label: "Date of Deposition", key: "DATE_OF_DEPOSITION" },
    { label: "As on Date", key: "AS_ON_DATE" },
    { label: "Challan Mismatch", key: "CHALLAN_MISMATCH" },
  ];

  // Table Data
  const tableData = listData?.map((data, index) => ({
    srNo: (currentPage - 1) * 100 + (index + 1),
    ...data,
  }));

  const handlePagination = async (pageNo) => {
    setGotoPage(pageNo);
    setCurrentPage(pageNo);

    try {
      let response;
      if (params !== undefined) {
        response = await common.getSearchPagination(entity, pageNo, params);
      } else {
        response = await common.getPagination(entity, pageNo);
      }
      setListData(response.data.entities || []);
    } catch (err) {
      console.error("Error while loading next page:", err);
    }
  };

  return (
    <>
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-[var(--primary-color)]">
          Challan Details
        </h1>

        <div>
          <Field className="flex flex-wrap gap-3">
            <div className="w-full md:w-1/4">
              <Label className="font-semibold text-[var(--primary-color)]">
                CIN
              </Label>
              <Input
                name="cin"
                id="cin"
                placeholder="CIN"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none"
                )}
              />
            </div>

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
                {Tan &&
                  Tan.length > 0 &&
                  Tan.map((tan, index) => {
                    return (
                      <option key={index} value={tan}>
                        {tan}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div className="w-full md:w-1/4">
              <Label className="font-semibold text-[var(--primary-color)]">
                Challan Mismatch
              </Label>
              <select
                name="challanMismatch"
                id="challanMismatch"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none",
                  "h-[38px]"
                )}
              >
                <option value="">Select Option</option>
                <option value="true">True</option>
                <option value="false">False</option>
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
            </div>
          </Field>
        </div>

        {showDivs && (
          <div>
            <Field className="flex flex-wrap gap-3">
              <div className="w-full md:w-1/4">
                <Label className="font-semibold text-[var(--primary-color)]">
                  Amount of challan
                </Label>
                <Input
                  name="amountofchallan"
                  id="amountofchallan"
                  placeholder="Amount of challan"
                  className={clsx(
                    "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                    "focus:outline-none"
                  )}
                />
              </div>

              <div className="w-full md:w-1/4">
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
                    "focus:outline-none"
                  )}
                />
              </div>

              <div className="w-full md:w-1/4">
                <Label className="font-semibold text-[var(--primary-color)]">
                  As on Date
                </Label>
                <Input
                  type="date"
                  id="asOnDate"
                  name="asOnDate"
                  value={newDate}
                  onChange={(e) => newSetDate(e.target.value)}
                  className={clsx(
                    "mt-1 w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm/6 text-gray-900",
                    "focus:outline-none"
                  )}
                />
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
          <DynamicTable tableHead={tableHead} tableData={tableData} />
        </div>
      </div>

      {/* Pagination */}
      {listData.length > 0 && (
        <div className="my-5">
          <>
            <div className="flex items-center justify-center gap-5">
              <button
                className="cursor-pointer rounded-md bg-[#024dec] px-3 py-1 text-white disabled:bg-gray-400"
                disabled={currentPage === 1}
                onClick={() => handlePagination(currentPage - 1)}
              >
                Previous
              </button>
              <div className="flex items-center justify-center">
                <h5>
                  Displaying page{" "}
                  <span className="font-semibold">{currentPage}</span> of{" "}
                  <span className="font-semibold">{totalPages}</span>
                </h5>
              </div>
              <button
                className="cursor-pointer rounded-md bg-[#024dec] px-3 py-1 text-white disabled:bg-gray-400"
                disabled={currentPage === totalPages}
                onClick={() => handlePagination(currentPage + 1)}
              >
                Next
              </button>
            </div>

            {totalPages > 1 && (
              <div className="mt-5 flex items-center justify-center gap-3">
                <span>Go to</span>
                <input
                  type="number"
                  min={1}
                  max={totalPages}
                  value={gotoPage}
                  onChange={(e) => setGotoPage(Number(e.target.value))}
                  className="w-20 rounded-md border border-gray-400 p-0.5 text-center"
                />
                <button
                  className="ml-2 cursor-pointer rounded-md bg-green-700 px-4 py-1 text-white disabled:bg-gray-400 disabled:opacity-50"
                  disabled={gotoPage < 1 || gotoPage > totalPages}
                  onClick={() => handlePagination(gotoPage)}
                >
                  Go
                </button>
              </div>
            )}
          </>
        </div>
      )}
    </>
  );
};

export default Challan;

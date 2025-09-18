import common from "@/common/common";
import { TooltipWrapper } from "@/components/component/Tooltip";
import DynamicTable from "@/components/tables/DynamicTable";
import staticDataContext from "@/context/staticDataContext";
import { Field, Input, Label, Switch } from "@headlessui/react";
import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TotalAmount = () => {
  const entity = "totalAmount";

  const { params } = useParams();
  const { financialYear, Month, Section } = useContext(staticDataContext);

  const [listData, setListData] = useState([]);
  const [showDivs, setShowDivs] = useState(false);
  const [autoResize, setAutoResize] = useState(false);
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
        setListData(response.data.entities || []);
      } catch (error) {
        console.error("Error fetching list data:", error);
      }
    };

    fetchListData();
  }, []);

  // Table Details
  const tableHead = [
    { label: "Sr.No.", key: "srNo" },
    { label: "Customer ID", key: "custVendId" },
    { label: "PAN", key: "pan" },
    { label: "Section", key: "sectionCode" },
    { label: "Challan Heading", key: "challanHeading" },
    { label: "Month", key: "month" },
    { label: "FY", key: "fy" },
    { label: "System Amount", key: "null" },
    { label: "Traces Amount", key: "null" },
    { label: "System Amount Tax", key: "null" },
    { label: "Traces Amount Tax", key: "null" },
    { label: "Remark", key: "remark" },
    { label: "Source", key: "source" },
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
          Total Amount Details
        </h1>

        <div>
          <Field className="flex flex-wrap gap-3">
            <div className="w-full md:w-1/4">
              <Label className="font-semibold text-[var(--primary-color)]">
                Customer ID
              </Label>
              <Input
                name="customerID"
                id="customerID"
                placeholder="Customer ID"
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
                  Month
                </Label>
                <select
                  name="month"
                  id="month"
                  className={clsx(
                    "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                    "focus:outline-none",
                    "h-[38px]"
                  )}
                >
                  <option value="">Select Month</option>
                  {Month &&
                    Month.length > 0 &&
                    Month.map((month, index) => {
                      return (
                        <option key={index} value={month}>
                          {month}
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
                    "mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                    "focus:outline-none",
                    "h-[38px]"
                  )}
                >
                  <option value="">Select Financial Year</option>
                  {financialYear &&
                    financialYear.length > 0 &&
                    financialYear.map((fy, index) => {
                      return (
                        <option key={index} value={fy}>
                          {fy}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="w-full md:w-1/4">
                <Label className="font-semibold text-[var(--primary-color)]">
                  Section
                </Label>
                <select
                  name="section"
                  id="section"
                  className={clsx(
                    "mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                    "focus:outline-none",
                    "h-[38px]"
                  )}
                >
                  <option value="">Select Section</option>
                  {Section &&
                    Section.length > 0 &&
                    Section.map((Section, index) => {
                      return (
                        <option key={index} value={Section}>
                          {Section}
                        </option>
                      );
                    })}
                </select>
              </div>

              <br />

              <div className="w-full md:w-1/4">
                <Label className="font-semibold text-[var(--primary-color)]">
                  System Amount
                </Label>
                <Input
                  name="systemAmount"
                  id="systemAmount"
                  placeholder="System Amount"
                  className={clsx(
                    "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                    "focus:outline-none"
                  )}
                />
              </div>

              <div className="w-full md:w-1/4">
                <Label className="font-semibold text-[var(--primary-color)]">
                  Traces Amount
                </Label>
                <Input
                  name="tracesAmount"
                  id="tracesAmount"
                  placeholder="Traces Amount"
                  className={clsx(
                    "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                    "focus:outline-none"
                  )}
                />
              </div>

              <div className="w-full md:w-1/4">
                <Label className="font-semibold text-[var(--primary-color)]">
                  System Tax Amount
                </Label>
                <Input
                  name="systemTaxAmount"
                  id="systemTaxAmount"
                  placeholder="System Tax Amount"
                  className={clsx(
                    "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                    "focus:outline-none"
                  )}
                />
              </div>

              <br />

              <div className="w-full md:w-1/4">
                <Label className="font-semibold text-[var(--primary-color)]">
                  Traces Tax Amount
                </Label>
                <Input
                  name="tracesTaxAmount"
                  id="tracesTaxAmount"
                  placeholder="Traces Tax Amount"
                  className={clsx(
                    "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
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
          <DynamicTable
            tableHead={tableHead}
            tableData={tableData}
            autoResize={autoResize}
          />
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

export default TotalAmount;

import common from "@/common/common";
import Pagination from "@/components/component/Pagination";
import { TooltipWrapper } from "@/components/component/Tooltip";
import DynamicTable from "@/components/tables/DynamicTable";
import staticDataContext from "@/context/staticDataContext";
import { Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";
import { useContext, useEffect, useState } from "react";

const PanUpdateList = () => {
  const entity = "panUpdateList";

  const { financialYear, Month } = useContext(staticDataContext);

  const [gotoPage, setGotoPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [showDivs, setShowDivs] = useState(false);
  const [listData, setListData] = useState([]);

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
    { label: "FY", key: "fy" },
    { label: "Month", key: "month" },
    { label: "Challan Heading", key: "challanHeading" },
    { label: "Customer/Vendor ID", key: "custVendId" },
    { label: "Previous Pan", key: "previousPAN" },
    { label: "New Pan", key: "newPAN" },
    { label: "Remark", key: "remark" },
  ];

  // Table Data
  const tableData = listData?.map((data, index) => ({
    srNo: (currentPage - 1) * 100 + (index + 1),
    ...data,
  }));

  return (
    <>
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-[var(--primary-color)]">
          PAN Update Details
        </h1>

        <div>
          <Field className="flex flex-wrap gap-3">
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
                Customer/Vendor ID
              </Label>
              <Input
                name="custVendID"
                id="custVendID"
                placeholder="Customer/Vendor ID"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none"
                )}
              />
            </div>

            <div className="w-full md:w-1/4">
              <Label className="font-semibold text-[var(--primary-color)]">
                Previous PAN
              </Label>
              <Input
                name="previousPAN"
                id="previousPAN"
                placeholder="Previous PAN"
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
            </div>
          </Field>
        </div>

        {showDivs && (
          <div>
            <Field className="flex flex-wrap items-end gap-3">
              <div className="w-full md:w-1/4">
                <Label className="font-semibold text-[var(--primary-color)]">
                  New PAN
                </Label>
                <Input
                  name="newPAN"
                  id="newPAN"
                  placeholder="New PAN"
                  className={clsx(
                    "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                    "focus:outline-none"
                  )}
                />
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
              <div>
                <TooltipWrapper tooltipText="Export to Excel">
                  <button className="h-[38px] cursor-pointer rounded-sm bg-[#1761fd] px-3 text-2xl text-white">
                    <i className="fa-solid fa-file-excel"></i>
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

export default PanUpdateList;

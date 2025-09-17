import clsx from "clsx";
import common from "@/common/common";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Field, Input, Label, Switch } from "@headlessui/react";
import DynamicTableActionTotal from "@/components/tables/DynamicTableActionTotal";
import FilterButtonDropdown from "@/components/component/FilterButtonDropdown";

const Form24QDeductee = () => {
  const entity = "form24QDeductee";

  const { params } = useParams();

  const [listData, setListData] = useState([]);
  const [showDivs, setShowDivs] = useState(false);
  const [gotoPage, setGotoPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [autoResize, setAutoResize] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Set());

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

  const handlePagination = async (pageNo) => {
    setGotoPage(pageNo);
    setCurrentPage(pageNo);

    try {
      if (params !== undefined) {
        const response = await common.getSearchPagination(
          entity,
          pageNo,
          params
        );
        setListData(response.data.entities || []);
      } else {
        const response = await common.getPagination(entity, pageNo);
        setListData(response.data.entities || []);
      }
    } catch (err) {
      console.error("Error while loading next page:", err);
    }
  };

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
    { label: "TAN", key: "TAN" },
    { label: "Action", key: "action" },
  ];

  const extraColumns = [
    { label: "Date of Payment", key: "dateOfPayment" },
    { label: "Date of Deduction", key: "dateOfDeduction" },
    { label: "Unique Ref Number", key: "uniqueRefNo" },
    { label: "Amount paid", key: "amountPaid" },
    { label: "Account Number", key: "accNo" },
    { label: "TDS", key: "tds" },
    { label: "surcharge", key: "surcharge" },
    { label: "education cess", key: "education cess" },
    { label: "Total Tax Deducted", key: "totalTaxDeducted" },
    { label: "Total Tax Deposited", key: "totalTaxDeposited" },
    { label: "Certificate No", key: "certificateNumber" },
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

  const tableData = listData?.map((data, index) => ({
    srNo: (currentPage - 1) * 100 + (index + 1),
    ...data,
  }));

  return (
    <>
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-[var(--primary-color)]">
          Form 24Q Deductee Details
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
              <FilterButtonDropdown
                extraColumns={extraColumns}
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
              />
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
                  <option value="section 1">Section 1</option>
                  <option value="section 2">Section 2</option>
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
                <button className="mt-7 h-[38px] cursor-pointer rounded-sm bg-[#1761fd] px-2 text-white">
                  Export to Excel
                </button>
              </div>
            </Field>
          </div>
        )}

        <div>
          <DynamicTableActionTotal
            entity={entity}
            layoutType="sc"
            tableHead={combinedTableHead}
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

export default Form24QDeductee;

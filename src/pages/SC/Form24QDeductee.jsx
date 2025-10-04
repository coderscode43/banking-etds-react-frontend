import common from "@/common/common";
import FilterButtonDropdown from "@/components/component/FilterButtonDropdown";
import GenerateExcelButton from "@/components/component/GenerateExcelButton";
import Pagination from "@/components/component/Pagination";
import SwitchButton from "@/components/component/SwitchButton";
import { TooltipWrapper } from "@/components/component/Tooltip";
import DynamicTableActionTotal from "@/components/tables/DynamicTableActionTotal";
import staticDataContext from "@/context/staticDataContext";
import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Form24QDeductee = () => {
  const entity = "form24QDeductee";

  const { params } = useParams();
  const navigate = useNavigate();
  const { Quarter, Tan, Section } = useContext(staticDataContext);

  const [listData, setListData] = useState([]);
  const [showDivs, setShowDivs] = useState(false);
  const [gotoPage, setGotoPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [autoResize, setAutoResize] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [searchParams, setSearchParams] = useState({
    quarter: "",
    branchCode: "",
    name: "",
    TAN: "",
    pan: "",
    challanHeading: "",
    roCode: "",
    sectionCode: "",
    resolved: "",
  });

  useEffect(() => {
    const fetchListData = async () => {
      try {
        let response;
        if (params) {
          const pageNo = 0;
          response = await common.getSearchListData(entity, pageNo, params);
          setSearchParams({
            quarter: "",
            branchCode: "",
            name: "",
            TAN: "",
            pan: "",
            challanHeading: "",
            roCode: "",
            sectionCode: "",
            resolved: "",
          });
        } else {
          response = await common.getListData(entity);
        }

        setListData(response.data.entities || []);
        const count = response.data.count || 0;
        const pages = Math.ceil(count / 100);
        setTotalPages(pages);
      } catch (error) {
        console.error("Error fetching list data:", error);
      }
    };

    fetchListData();
  }, [params]);

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

  const handleSearch = async () => {
    const refinedParams = common.getRefinedSearchParams(searchParams);
    navigate(`/home/listSearch/${entity}/${refinedParams}`);
  };

  return (
    <>
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-[var(--primary-color)]">
          Form 24Q Deductee Details
        </h1>

        <div>
          <div className="flex flex-wrap gap-3">
            <div className="w-full md:w-1/4">
              <label
                htmlFor="quarter"
                className="font-semibold text-[var(--primary-color)]"
              >
                Quarter
              </label>
              <select
                name="quarter"
                id="quarter"
                className="mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                value={searchParams.quarter}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
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

            <div className="w-full md:w-1/4">
              <label
                htmlFor="branchCode"
                className="font-semibold text-[var(--primary-color)]"
              >
                Branch Code
              </label>
              <input
                name="branchCode"
                id="branchCode"
                placeholder="Branch Code"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                value={searchParams.branchCode}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              />
            </div>
            <div className="w-full md:w-1/4">
              <label
                htmlFor="name"
                className="font-semibold text-[var(--primary-color)]"
              >
                Name
              </label>
              <input
                name="name"
                id="name"
                placeholder="Name"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                value={searchParams.name}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              />
            </div>

            <div className="flex items-end gap-2">
              <TooltipWrapper tooltipText="Search">
                <button
                  onClick={handleSearch}
                  className="h-[38px] cursor-pointer rounded-sm bg-[#03d87f] px-3 text-2xl font-black text-white"
                >
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
              <SwitchButton
                autoResize={autoResize}
                setAutoResize={setAutoResize}
              />
            </div>
          </div>
        </div>

        <div
          className={clsx(
            "overflow-hidden transition-all duration-500 ease-in-out",
            showDivs ? "max-h-[150px]" : "max-h-0"
          )}
        >
          <div className="flex flex-wrap items-end gap-3">
            <div className="w-full md:w-1/4">
              <label className="font-semibold text-[var(--primary-color)]">
                TAN
              </label>
              <select
                name="TAN"
                id="TAN"
                className={
                  "custom-scrollbar mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                }
                value={searchParams.TAN}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
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
              <label className="font-semibold text-[var(--primary-color)]">
                PAN
              </label>
              <input
                name="pan"
                id="pan"
                placeholder="PAN"
                className={
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                }
                value={searchParams.pan}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              />
            </div>
            <div className="w-full md:w-1/4">
              <label className="font-semibold text-[var(--primary-color)]">
                Challan Heading
              </label>
              <input
                name="challanHeading"
                id="challanHeading"
                placeholder="Challan Heading"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none"
                )}
                value={searchParams.challanHeading}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              />
            </div>

            <br />

            <div className="w-full md:w-1/4">
              <label className="font-semibold text-[var(--primary-color)]">
                RO Code
              </label>
              <input
                name="roCode"
                id="roCode"
                placeholder="RO Code"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none"
                )}
                value={searchParams.roCode}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              />
            </div>

            <div className="w-full md:w-1/4">
              <label className="font-semibold text-[var(--primary-color)]">
                Section Code
              </label>
              <select
                name="sectionCode"
                id="sectionCode"
                className={
                  "custom-scrollbar mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                }
                value={searchParams.sectionCode}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
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

            <div className="w-full md:w-1/4">
              <label className="font-semibold text-[var(--primary-color)]">
                Status
              </label>
              <select
                name="resolved"
                id="resolved"
                className={
                  "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                }
                value={searchParams.resolved}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              >
                <option value="">Select Status</option>
                <option value="resolved">Resolved</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div>
              <GenerateExcelButton
                entity={entity}
                params={params}
                searchParams={searchParams}
                layoutType={"sc"}
              />
            </div>
          </div>
        </div>

        <DynamicTableActionTotal
          entity={entity}
          layoutType="sc"
          tableHead={combinedTableHead}
          tableData={tableData}
          autoResize={autoResize}
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

export default Form24QDeductee;

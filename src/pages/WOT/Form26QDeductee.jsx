import clsx from "clsx";
import common from "@/common/common";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import staticDataContext from "@/context/staticDataContext";
import DynamicTableActionTotal from "@/components/tables/DynamicTableActionTotal";
import { Field, Input, Label } from "@headlessui/react";
import FilterButtonDropdown from "@/components/component/FilterButtonDropdown";
import { TooltipWrapper } from "@/components/component/Tooltip";
import Pagination from "@/components/component/Pagination";
import { useNavigate } from "react-router-dom";

const Form26QDeductee = () => {
  const entity = "form26QDeductee";

  const navigate = useNavigate();
  const { fy, branchCode, params } = useParams();
  const { Quarter, Tan, Section } = useContext(staticDataContext);

  const [listData, setListData] = useState([]);
  const [showDivs, setShowDivs] = useState(false);
  const [gotoPage, setGotoPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [searchParams, setSearchParams] = useState({
    quarter: "",
    pan: "",
    name: "",
    challanHeading: "",
    TAN: "",
    sectionCode: "",
  });

  useEffect(() => {
    const fetchListData = async () => {
      try {
        let response;
        if (params) {
          const pageNo = 0;
          response = await common.getWOTSearchListData(
            entity,
            fy,
            branchCode,
            pageNo,
            params
          );
          setSearchParams({
            quarter: "",
            pan: "",
            name: "",
            challanHeading: "",
            TAN: "",
            sectionCode: "",
          });
        } else {
          response = await common.getWOTListData(entity, fy, branchCode);
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
  }, [fy, branchCode, params]);

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

  const extraColumns = [
    { label: "Date of Payment", key: "dateOfPayment" },
    { label: "Date of Deduction", key: "dateOfDeduction" },
    { label: "Unique Ref Number", key: "uniqueRefNo" },
    { label: "Amount Paid", key: "amountPaid" },
    { label: "Account Number", key: "accNo" },
    { label: "TDS", key: "tds" },
    { label: "Surcharge", key: "surcharge" },
    { label: "Education Cess", key: "eduCess" },
    { label: "Total Tax Deducted", key: "totalTaxDeducted" },
    { label: "Total Tax Deposited", key: "totalTaxDeposited" },
    { label: "Certificate No", key: "certificateNumber" },
    { label: "Remarks Reason", key: "remarksReason" },
    { label: "Deductee Code", key: "deducteeCode" },
    { label: "Rate at which Tax Deducted", key: "rateAtWhichTaxCollected" },
    { label: "Cash Withdrawl (194N)", key: "cashWithdrawal194N" },
    {
      label: "Cash Withdrawl 194N(20L to 1cr)",
      key: "cashWithdrawal194N20Lto1Cr",
    },
    { label: "Cash Withdrawl 194N(>1cr)", key: "cashWithdrawal194N1Cr" },
    { label: "Error Description", key: "errorDescription" },
    { label: "Warning Description", key: "warningDescription" },
    { label: "Short Deduction", key: "shortDeduction" },
    { label: "Interest on Short Deduction", key: "interestOnShortDeduction" },
    { label: "Interest on Late Payment", key: "interestOnLatePayment" },
    { label: "Interest on Late Deduction", key: "interestOnLateDeduction" },
    { label: "Comments", key: "comments" },
    { label: "Status", key: "resolved" }, // ✅ Consider mapping boolean to "Pending"/"Resolved"
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
    navigate(
      `/homeWOT/${branchCode}/${fy}/listSearch/${entity}/${refinedParams}`
    );
  };

  return (
    <>
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-[var(--primary-color)]">
          Form 26Q Deductee Details
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
              <Label className="font-semibold text-[var(--primary-color)]">
                PAN
              </Label>
              <Input
                placeholder="Pan"
                id="pan"
                name="pan"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                )}
                value={searchParams.pan}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
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
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                )}
                value={searchParams.name}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              />
            </div>
            <div className="mt-6.5 flex gap-2">
              <TooltipWrapper tooltipText="Search">
                <button
                  className="h-[38px] cursor-pointer rounded-sm bg-[#03d87f] px-3 text-2xl font-black text-white"
                  onClick={handleSearch}
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
            </div>
          </Field>
        </div>

        <div
          className={clsx(
            "overflow-hidden transition-all duration-500 ease-in-out",
            showDivs ? "max-h-[150px]" : "max-h-0"
          )}
        >
          <Field className="flex flex-wrap items-end gap-3">
            <div className="w-full md:w-1/4">
              <Label className="font-semibold text-[var(--primary-color)]">
                TAN
              </Label>
              <select
                name="TAN"
                id="TAN"
                className={clsx(
                  "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                )}
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
              <Label className="font-semibold text-[var(--primary-color)]">
                Challan Heading
              </Label>
              <Input
                placeholder="Challan Heading"
                id="challanHeading"
                name="challanHeading"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                )}
                value={searchParams.challanHeading}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
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
                  "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                )}
                value={searchParams.sectionCode}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              >
                <option value="">Select Section</option>
                {Section &&
                  Section.length > 0 &&
                  Section.map((section, index) => {
                    return (
                      <option key={index} value={section}>
                        {section}
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

        <div>
          <DynamicTableActionTotal
            entity={entity}
            layoutType={"wot"}
            tableHead={combinedTableHead}
            tableData={tableData}
          />
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

export default Form26QDeductee;

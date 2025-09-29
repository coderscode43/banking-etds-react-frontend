import common from "@/common/common";
import Pagination from "@/components/component/Pagination";
import SwitchButton from "@/components/component/SwitchButton";
import { TooltipWrapper } from "@/components/component/Tooltip";
import DynamicTable from "@/components/tables/DynamicTable";
import staticDataContext from "@/context/staticDataContext";
import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Ldc = () => {
  const entity = "ldc";

  const navigate = useNavigate();
  const { params } = useParams();
  const { Tan, financialYear, Section } = useContext(staticDataContext);

  const [gotoPage, setGotoPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [showDivs, setShowDivs] = useState(false);
  const [listData, setListData] = useState([]);
  const [autoResize, setAutoResize] = useState(false);
  const [searchParams, setSearchParams] = useState({
    FY: "",
    PAN: "",
    NAME: "",
    TAN: "",
    SECTION_CODE: "",
    LDC_RATE: "",
    LDC_NUMBER: "",
    AMOUNT_CONSUMED: "",
    NATURE_OF_PAYMENT: "",
  });

  useEffect(() => {
    const fetchListData = async () => {
      try {
        let response;
        if (params) {
          const pageNo = 0;
          response = await common.getSearchListData(entity, pageNo, params);
          setSearchParams({
            FY: "",
            PAN: "",
            NAME: "",
            TAN: "",
            SECTION_CODE: "",
            LDC_RATE: "",
            LDC_NUMBER: "",
            AMOUNT_CONSUMED: "",
            NATURE_OF_PAYMENT: "",
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

  const tableHead = [
    { key: "srNo", label: "Sr.No" },
    { key: "LDC_NUMBER", label: "LDC_NUMBER" },
    { key: "NAME", label: "NAME" },
    { key: "TAN", label: "TAN" },
    { key: "PAN", label: "PAN" },
    { key: "FY", label: "Finanial Year" },
    { key: "VALID_FROM", label: "Valid From" },
    { key: "VALID_TO", label: "Valid To" },
    { key: "SECTION_CODE", label: "Section Code" },
    { key: "NATURE_OF_PAYMENT", label: "Nature of Payment" },
    { key: "LDC_RATE", label: "LDC Rate" },
    { key: "certificate_LIMIT", label: "Certificate Limit" },
    { key: "AMOUNT_CONSUMED", label: "Amount Consumed" },
    { key: "ISSUE_DATE", label: "Issued Date" },
    { key: "CANCEL_DATE", label: "Cancel Date" },
    { key: "as_ON_DATE", label: "As on Date" },
  ];

  // Table Data
  const tableData = listData?.map((data, index) => ({
    srNo: (currentPage - 1) * 100 + (index + 1),
    ...data,
  }));

  const handleSearch = async () => {
    const refinedParams = common.getRefinedSearchParams(searchParams);
    navigate(`/home/listSearch/${entity}/${refinedParams}`);
  };

  const handleGenerateExcel = async () => {
    const refinedParams = common.getRefinedSearchParams(searchParams);
    await common.getGenerateExcel(entity, refinedParams);
  };

  return (
    <>
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-[var(--primary-color)]">
          Lower Deduction Certificate
        </h1>

        <div>
          <div className="flex flex-wrap gap-3">
            <div className="w-full md:w-1/4">
              <label className="font-semibold text-[var(--primary-color)]">
                Financial Year
              </label>
              <select
                name="FY"
                id="FY"
                className={clsx(
                  "custom-scrollbar mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                )}
                value={searchParams.FY}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
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
              <label className="font-semibold text-[var(--primary-color)]">
                PAN
              </label>
              <input
                name="PAN"
                id="PAN"
                placeholder="PAN Number"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none"
                )}
                value={searchParams.PAN}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              />
            </div>
            <div className="w-full md:w-1/4">
              <label className="font-semibold text-[var(--primary-color)]">
                Name
              </label>
              <input
                name="NAME"
                id="NAME"
                placeholder="Name of Customer"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none"
                )}
                value={searchParams.NAME}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              />
            </div>

            <div className="flex items-end gap-2">
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
                className={clsx(
                  "custom-scrollbar mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
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
              <label className="font-semibold text-[var(--primary-color)]">
                Section Code
              </label>
              <select
                name="SECTION_CODE"
                id="SECTION_CODE"
                className={clsx(
                  "custom-scrollbar mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                )}
                value={searchParams.SECTION_CODE}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              >
                <option value="">Select Section Code</option>
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
                LDC Rate
              </label>
              <input
                name="LDC_RATE"
                id="LDC_RATE"
                placeholder="LDC Rate"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none"
                )}
                value={searchParams.LDC_RATE}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              />
            </div>

            <br />

            <div className="w-full md:w-1/4">
              <label className="font-semibold text-[var(--primary-color)]">
                LDC Number
              </label>
              <input
                name="LDC_NUMBER"
                id="LDC_NUMBER"
                placeholder="LDC Number"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none"
                )}
                value={searchParams.LDC_NUMBER}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              />
            </div>
            <div className="w-full md:w-1/4">
              <label className="font-semibold text-[var(--primary-color)]">
                Amount Consumed
              </label>
              <input
                name="AMOUNT_CONSUMED"
                id="AMOUNT_CONSUMED"
                placeholder="Amount Consumed"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none"
                )}
                value={searchParams.AMOUNT_CONSUMED}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              />
            </div>
            <div className="w-full md:w-1/4">
              <label className="font-semibold text-[var(--primary-color)]">
                Nature of Payment
              </label>
              <input
                name="NATURE_OF_PAYMENT"
                id="NATURE_OF_PAYMENT"
                placeholder="Nature of Payment "
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none"
                )}
                value={searchParams.NATURE_OF_PAYMENT}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              />
            </div>
            <div>
              <TooltipWrapper tooltipText="Export to Excel">
                <button
                  onClick={handleGenerateExcel}
                  className="h-[38px] cursor-pointer rounded-sm bg-[#1761fd] px-3 text-2xl text-white"
                >
                  <i className="fa-solid fa-file-excel"></i>
                </button>
              </TooltipWrapper>
            </div>
          </div>
        </div>

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

export default Ldc;

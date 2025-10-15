import common from "@/common/common";
import GenerateExcelButton from "@/components/component/GenerateExcelButton";
import Pagination from "@/components/component/Pagination";
import { TooltipWrapper } from "@/components/component/Tooltip";
import DynamicTable from "@/components/tables/DynamicTable";
import staticDataContext from "@/context/staticDataContext";
import { date, fy } from "@/lib/utils";
import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const StatementStatus = () => {
  const entity = "statementStatus";

  const { params } = useParams();
  const navigate = useNavigate();
  const { Quarter, Tan, financialYear, Form } = useContext(staticDataContext);

  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState([]);
  const [showDivs, setShowDivs] = useState(false);
  const [gotoPage, setGotoPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState({
    TAN: "",
    QUARTER: "",
    FY: "",
    STATUS: "",
    RT: "",
    FORM: "",
  });

  useEffect(() => {
    const fetchListData = async () => {
      try {
        setLoading(true); // Start loading
        let response;
        if (params) {
          const pageNo = 0;
          response = await common.getSearchListData(entity, pageNo, params);
          setSearchParams({
            TAN: "",
            QUARTER: "",
            FY: "",
            STATUS: "",
            RT: "",
            FORM: "",
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
      } finally {
        setLoading(false);
      }
    };

    fetchListData();
  }, [params]);

  // Table Details
  const tableHead = [
    { label: "Sr.No.", key: "srNo" },
    { label: "TAN", key: "tan" },
    { label: "Form", key: "form" },
    { label: "Quarter", key: "quarter" },
    { label: "AS_ON_DATE", key: "AS_ON_DATE", formatter: date },
    { label: "Financial Year", key: "fy", formatter: fy },
    { label: "Status", key: "status" },
    { label: "RT", key: "rt" },
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

  return (
    <>
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-[var(--primary-color)]">
          Statement Status
        </h1>

        <div>
          <div className="flex flex-wrap gap-3">
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
                Quarter
              </label>
              <select
                name="QUARTER"
                id="QUARTER"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none",
                  "h-[38px]"
                )}
                value={searchParams.QUARTER}
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
              <label className="font-semibold text-[var(--primary-color)]">
                Financial Year
              </label>
              <select
                name="FY"
                id="FY"
                className={
                  "custom-scrollbar mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                }
                value={searchParams.FY}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
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
                Status
              </label>
              <input
                name="STATUS"
                id="STATUS"
                placeholder="Status"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none"
                )}
                value={searchParams.STATUS}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              />
            </div>

            <div className="w-full md:w-1/4">
              <label className="font-semibold text-[var(--primary-color)]">
                RT
              </label>
              <input
                name="RT"
                id="RT"
                placeholder="RT"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none"
                )}
                value={searchParams.RT}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              />
            </div>

            <div className="w-full md:w-1/4">
              <label className="font-semibold text-[var(--primary-color)]">
                Form
              </label>
              <select
                name="FORM"
                id="FORM"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none",
                  "h-[38px]"
                )}
                value={searchParams.FORM}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              >
                <option value="">Form</option>
                {Form &&
                  Form.length > 0 &&
                  Form.map((FORM, index) => {
                    return (
                      <option key={index} value={FORM}>
                        {FORM}
                      </option>
                    );
                  })}
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

        <div>
          <DynamicTable
            tableHead={tableHead}
            tableData={tableData}
            loading={loading}
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

export default StatementStatus;

import clsx from "clsx";
import common from "@/common/common";
import { useEffect, useState, useContext } from "react";
import staticDataContext from "@/context/staticDataContext";
import { useNavigate, useParams } from "react-router-dom";
import DynamicTableAction from "@/components/tables/DynamicTableAction";
import { TooltipWrapper } from "@/components/component/Tooltip";
import Pagination from "@/components/component/Pagination";
import GenerateExcelButton from "@/components/component/GenerateExcelButton";

const CorrectionRequest = () => {
  const entity = "correctionRequest";

  const navigate = useNavigate();
  const { fy, branchCode, params } = useParams();
  const { Quarter, status, typeOfCorrection, financialYear } =
    useContext(staticDataContext);

  const [listData, setListData] = useState([]);
  const [showDivs, setShowDivs] = useState(false);
  const [gotoPage, setGotoPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState({
    status: "",
    fy: "",
    quarter: "",
    ticketNumber: "",
    name: "",
    pan: "",
    typeOfCorrection: "",
    toDate: "",
    fromDate: "",
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
            status: "",
            fy: "",
            quarter: "",
            ticketNumber: "",
            name: "",
            pan: "",
            typeOfCorrection: "",
            toDate: "",
            fromDate: "",
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
          Correction Request Details
        </h1>

        <div>
          <div className="flex flex-wrap gap-3">
            <div className="w-full md:w-1/4">
              <label className="font-semibold text-[var(--primary-color)]">
                Status
              </label>
              <select
                name="status"
                id="status"
                className={clsx(
                  "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                )}
                value={searchParams.status}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
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
              <label className="font-semibold text-[var(--primary-color)]">
                Financial Year
              </label>
              <select
                name="fy"
                id="fy"
                className={clsx(
                  "custom-scrollbar mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                )}
                value={searchParams.fy}
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
                Quarter
              </label>
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
                Ticket Number
              </label>
              <input
                id="ticketNumber"
                name="ticketNumber"
                placeholder="Ticket Number"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                )}
                value={searchParams.ticketNumber}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              />
            </div>
            <div className="w-full md:w-1/4">
              <label className="font-semibold text-[var(--primary-color)]">
                Name of Customer
              </label>
              <input
                id="name"
                name="name"
                placeholder="Name of Customer"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                )}
                value={searchParams.name}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              />
            </div>
            <div className="w-full md:w-1/4">
              <label className="font-semibold text-[var(--primary-color)]">
                PAN of Customer
              </label>
              <input
                id="pan"
                name="pan"
                placeholder="Pan number"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none"
                )}
                value={searchParams.pan}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              />
            </div>
            <div className="w-full md:w-1/4">
              <label className="font-semibold text-[var(--primary-color)]">
                Type of Correction
              </label>
              <select
                name="typeOfCorrection"
                id="typeOfCorrection"
                className={clsx(
                  "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                )}
                value={searchParams.typeOfCorrection}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
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
              <label className="font-semibold text-[var(--primary-color)]">
                From Date Of Request
              </label>
              <input
                placeholder="fromRequestDate"
                name="fromDate"
                id="fromDate"
                type="date"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                )}
                value={searchParams.fromDate}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              />
            </div>
            <div className="w-full md:w-1/4">
              <label className="font-semibold text-[var(--primary-color)]">
                To Date Of Request
              </label>
              <input
                placeholder="toRequestDate"
                name="toDate"
                id="toDate"
                type="date"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                )}
                value={searchParams.toDate}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              />
            </div>
            <div>
              <GenerateExcelButton
                entity={entity}
                params={params}
                branchCode={branchCode}
                fy={fy}
                layoutType="wot"
              />
            </div>
          </div>
        </div>

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

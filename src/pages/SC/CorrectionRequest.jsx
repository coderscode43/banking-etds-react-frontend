import common from "@/common/common";
import Pagination from "@/components/component/Pagination";
import SwitchButton from "@/components/component/SwitchButton";
import { TooltipWrapper } from "@/components/component/Tooltip";
import DynamicTableAction from "@/components/tables/DynamicTableAction";
import staticDataContext from "@/context/staticDataContext";
import { Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CorrectionRequest = () => {
  const entity = "correctionRequest";

  const navigate = useNavigate();
  const { params } = useParams();
  const { Quarter, typeOfCorrection, financialYear } =
    useContext(staticDataContext);

  const [listData, setListData] = useState([]);
  const [showDivs, setShowDivs] = useState(false);
  const [autoResize, setAutoResize] = useState(false);
  const [gotoPage, setGotoPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState({
    status: "",
    FY: "",
    quarter: "",
    ticketNumber: "",
    name: "",
    pan: "",
    typeOfCorrection: "",
    fromDate: "",
    toDate: "",
  });

  useEffect(() => {
    const fetchListData = async () => {
      try {
        let response;
        if (params) {
          const pageNo = 0;
          response = await common.getSearchListData(entity, pageNo, params);
          setSearchParams({
            status: "",
            FY: "",
            quarter: "",
            ticketNumber: "",
            name: "",
            pan: "",
            typeOfCorrection: "",
            fromDate: "",
            toDate: "",
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
    { key: "ticketNumber", label: "Ticket Number" },
    { key: "fy", label: "Financial Year" },
    { key: "branchCode", label: "Branch" },
    { key: "quarter", label: "Quarter" },
    { key: "name", label: "Name of Customer" },
    { key: "pan", label: "Pan Of Customer" },
    { key: "typeOfCorrection", label: "Type of Correction" },
    { key: "status", label: "Status" },
    { key: "lastUpdatedOn", label: "Last Updated On" },
    { key: "action", label: "Action" },
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
                  "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                )}
                value={searchParams.status}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              >
                <option value="">Select Status</option>
                <option value="Resolved">Resolved</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div className="w-full md:w-1/4">
              <Label className="font-semibold text-[var(--primary-color)]">
                Financial Year
              </Label>
              <select
                name="FY"
                id="FY"
                className={clsx(
                  "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
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
              <TooltipWrapper tooltipText="Add Correction Request">
                <button
                  onClick={() => {
                    navigate(`/home/add/addCorrectionRequest`);
                  }}
                  className="h-[38px] cursor-pointer rounded-sm bg-[#1761fd] px-3 text-2xl font-black text-white"
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              </TooltipWrapper>
              <SwitchButton
                autoResize={autoResize}
                setAutoResize={setAutoResize}
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
                Ticket Number
              </Label>
              <Input
                name="ticketNumber"
                id="ticketNumber"
                placeholder="Ticket Number"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none"
                )}
                value={searchParams.ticketNumber}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              />
            </div>

            <div className="w-full md:w-1/4">
              <Label className="font-semibold text-[var(--primary-color)]">
                Name of Customer
              </Label>
              <Input
                name="name"
                id="name"
                placeholder="Name of Customer"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none"
                )}
                value={searchParams.name}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              />
            </div>
            <div className="w-full md:w-1/4">
              <Label className="font-semibold text-[var(--primary-color)]">
                PAN of Customer
              </Label>
              <Input
                name="pan"
                id="pan"
                placeholder="PAN Number"
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

            <br />

            <div className="w-full md:w-1/4">
              <Label className="font-semibold text-[var(--primary-color)]">
                Type of Correction
              </Label>
              <select
                id="typeOfCorrection"
                name="typeOfCorrection"
                className={clsx(
                  "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                )}
                value={searchParams.typeOfCorrection}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              >
                <option value="">Select Type of Correction</option>
                {typeOfCorrection &&
                  typeOfCorrection.length > 0 &&
                  typeOfCorrection.map((typeOfCorrection, index) => {
                    return (
                      <option key={index} value={typeOfCorrection}>
                        {typeOfCorrection}
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
                type="date"
                id="fromDate"
                name="fromDate"
                className={clsx(
                  "mt-1 w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                )}
                value={searchParams.fromDate}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              />
            </div>

            <div className="w-full md:w-1/4">
              <Label className="font-semibold text-[var(--primary-color)]">
                To Date Of Request
              </Label>
              <Input
                type="date"
                id="toDate"
                name="toDate"
                className={clsx(
                  "mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none"
                )}
                value={searchParams.toDate}
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
          </Field>
        </div>

        <div>
          <DynamicTableAction
            entity={entity}
            layoutType={"sc"}
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
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          gotoPage={gotoPage}
          setGotoPage={setGotoPage}
          totalPages={totalPages}
        />
      )}
    </>
  );
};

export default CorrectionRequest;

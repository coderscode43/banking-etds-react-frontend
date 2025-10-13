import common from "@/common/common";
import GenerateExcelButton from "@/components/component/GenerateExcelButton";
import Pagination from "@/components/component/Pagination";
import { TooltipWrapper } from "@/components/component/Tooltip";
import DynamicTableAction from "@/components/tables/DynamicTableAction";
import staticDataContext from "@/context/staticDataContext";
import { date, dateWithTime } from "@/lib/utils";
import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RegularReturn = () => {
  const entity = "regularReturn";

  const navigate = useNavigate();
  const { fy, branchCode, params } = useParams();
  const { Quarter, regularReturnStatus, typeOfForm, financialYear } =
    useContext(staticDataContext);

  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState([]);
  const [showDivs, setShowDivs] = useState(false);
  const [gotoPage, setGotoPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState({
    addedOn: "",
    status: "",
    fy: "",
    quarter: "",
    form: "",
  });

  useEffect(() => {
    const fetchListData = async () => {
      try {
        setLoading(true);
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
            addedOn: "",
            status: "",
            fy: "",
            quarter: "",
            form: "",
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
      } finally {
        setLoading(false);
      }
    };
    fetchListData();
  }, [fy, branchCode, params]);

  const tableHead = [
    { label: "Sr.No", key: "srNo" },
    { label: "Date", key: "addedOn", formatter: dateWithTime },
    { label: "Financial Year", key: "fy" },
    { label: "Tan", key: "tan" },
    { label: "Quarter", key: "quarter" },
    { label: "Form", key: "form" },
    { label: "Added by", key: "addedBy" },
    { label: "Latest remark", key: "latestRemark" },
    { label: "Status", key: "status" },
    {
      label: "Return filing date",
      key: "returnFilingDate",
      formatter: date,
      show: (data) => !!data.returnFilingDate,
    },
    { label: "Action", key: "action" },
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
          Regular Return
        </h1>

        <div>
          <div className="flex flex-wrap gap-3">
            <div className="w-full md:w-1/4">
              <label className="font-semibold text-[var(--primary-color)]">
                Financial Year
              </label>
              <select
                name="fy"
                id="fy"
                className="custom-scrollbar mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
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
              <label className="font-semibold text-[var(--primary-color)]">
                Form
              </label>
              <select
                name="form"
                id="form"
                className="mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                value={searchParams.form}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              >
                <option value="">Select Form</option>
                {typeOfForm &&
                  typeOfForm.length > 0 &&
                  typeOfForm.map((Form, index) => {
                    return (
                      <option key={index} value={Form}>
                        {Form}
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
              <select
                name="status"
                id="status"
                className="mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                value={searchParams.status}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              >
                <option value="">Select Status</option>
                {regularReturnStatus &&
                  regularReturnStatus.length > 0 &&
                  regularReturnStatus.map((status, index) => {
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
                Added On Date
              </label>
              <input
                name="addedOn"
                id="addedOn"
                type="date"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                value={searchParams.addedOn}
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
          layoutType={"wot"}
          tableHead={tableHead}
          tableData={tableData}
          loading={loading}
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

export default RegularReturn;

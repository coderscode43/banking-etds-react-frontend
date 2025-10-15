import common from "@/common/common";
import GenerateExcelButton from "@/components/component/GenerateExcelButton";
import Pagination from "@/components/component/Pagination";
import SwitchButton from "@/components/component/SwitchButton";
import { TooltipWrapper } from "@/components/component/Tooltip";
import BulkResponseReminderModal from "@/components/modals/BulkResponseReminderModal";
import DynamicTableCheckBoxAction from "@/components/tables/DynamicTableCheckBoxAction";
import staticDataContext from "@/context/staticDataContext";
import statusContext from "@/context/statusContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RegularReturn = () => {
  const entity = "regularReturn";

  const { params } = useParams();
  const navigate = useNavigate();
  const { Quarter, Tan, typeOfForm, status, financialYear } =
    useContext(staticDataContext);
  const { showError } = useContext(statusContext);

  const [loading, setLoading] = useState(true);
  const [listData, setListData] = useState([]);
  const [showDivs, setShowDivs] = useState(false);
  const [autoResize, setAutoResize] = useState(false);
  const [gotoPage, setGotoPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowsData, setSelectedRowsData] = useState([]);
  const [bulkResponseModal, setBulkResponseModal] = useState(false);
  const [searchParams, setSearchParams] = useState({
    fy: "",
    quarter: "",
    form: "",
    tan: "",
    status: "",
    addedOn: "",
  });

  useEffect(() => {
    const fetchListData = async () => {
      try {
        setLoading(true);
        let response;
        if (params) {
          const pageNo = 0;
          response = await common.getSearchListData(entity, pageNo, params);
          setSearchParams({
            fy: "",
            quarter: "",
            form: "",
            tan: "",
            status: "",
            addedOn: "",
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

  const tableHead = [
    { label: "Sr.No.", key: "srNo" },
    { key: "addedOn", label: "Date" },
    { key: "fy", label: "Financial Year", format: (value) => value || "-" },
    { key: "tan", label: "TAN" },
    { key: "quarter", label: "Quarter" },
    { key: "form", label: "Form" },
    { key: "addedBy", label: "Added By" },
    { key: "latestRemark", label: "Latest Response" },
    { key: "status", label: "Status" },
    {
      key: "returnFilingDate",
      label: "Return Filing Date",
      // format: (d) =>
      //   d ? new Date(d.replace(/-/g, "/")).toLocaleDateString("en-GB") : "",
    },
    { key: "action", label: "Action" },
  ];

  // Table Data
  const tableData = listData?.map((data, index) => ({
    srNo: (currentPage - 1) * 100 + (index + 1),
    ...data,
  }));

  const handleBulkResponse = () => setBulkResponseModal(true);

  const handleSearch = async () => {
    const refinedParams = common.getRefinedSearchParams(searchParams);
    navigate(`/home/listSearch/${entity}/${refinedParams}`);
  };

  return (
    <>
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-[var(--primary-color)]">
          Regular Return
        </h1>
        <div>
          <div className="flex flex-wrap gap-2">
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
              <label className="font-semibold text-[var(--primary-color)]">
                Quarter
              </label>
              <select
                name="quarter"
                id="quarter"
                className="custom-scrollbar mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
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
                className="custom-scrollbar mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                value={searchParams.form}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              >
                <option value="">Select Form</option>
                {typeOfForm &&
                  typeOfForm.length > 0 &&
                  typeOfForm.map((form, index) => {
                    return (
                      <option key={index} value={form}>
                        {form}
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
              <TooltipWrapper tooltipText="Bulk Response/Reminder Button">
                <button
                  className="h-[38px] cursor-pointer rounded-sm bg-[#03d87f] px-3 text-2xl font-black text-white"
                  onClick={() => {
                    selectedRows.length === 0
                      ? showError(
                          "Please select row to add Bulk Remark/Reminder"
                        )
                      : handleBulkResponse();
                  }}
                >
                  <i className="fa-solid fa-comment"></i>
                </button>
              </TooltipWrapper>
              <TooltipWrapper tooltipText="Add">
                <button
                  className="h-[38px] cursor-pointer rounded-sm bg-[#1761fd] px-3 text-2xl font-black text-white"
                  onClick={() => {
                    navigate(`/home/add/addRegularReturn`);
                  }}
                >
                  <i className="fa-solid fa-plus"></i>
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
          className={`overflow-hidden transition-all duration-500 ease-in-out ${showDivs ? "max-h-[150px]" : "max-h-0"}`}
        >
          <div className="flex flex-wrap items-end gap-3">
            <div className="w-full md:w-1/4">
              <label className="font-semibold text-[var(--primary-color)]">
                TAN
              </label>
              <select
                name="tan"
                id="tan"
                className="custom-scrollbar mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                value={searchParams.tan}
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
                Status
              </label>
              <select
                name="status"
                id="status"
                className="custom-scrollbar mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
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
                Added On Date
              </label>
              <input
                type="date"
                id="addedOn"
                name="addedOn"
                className="custom-scrollbar mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
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
                searchParams={searchParams}
                layoutType={"sc"}
              />
            </div>
          </div>
        </div>
        <DynamicTableCheckBoxAction
          entity={entity}
          layoutType={"sc"}
          tableHead={tableHead}
          tableData={tableData}
          autoResize={autoResize}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          setSelectedRowsData={setSelectedRowsData}
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
      <BulkResponseReminderModal
        bulkResponseModal={bulkResponseModal}
        setBulkResponseModal={setBulkResponseModal}
        regularReturns={selectedRowsData}
      />
    </>
  );
};

export default RegularReturn;

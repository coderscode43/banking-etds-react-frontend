import clsx from "clsx";
import common from "@/common/common";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import staticDataContext from "@/context/staticDataContext";
import DynamicTableAction from "@/components/tables/DynamicTableAction";
import { Field, Input, Label } from "@headlessui/react";
import { TooltipWrapper } from "@/components/component/Tooltip";
import Pagination from "@/components/component/Pagination";
import { useNavigate } from "react-router-dom";

const RegularReturn = () => {
  const entity = "regularReturn";

  const navigate = useNavigate();
  const { fy, branchCode, params } = useParams();
  const { Quarter, status, Form, financialYear } =
    useContext(staticDataContext);

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
      }
    };
    fetchListData();
  }, [fy, branchCode, params]);

  const tableHead = [
    { key: "srNo", label: "Sr.No" },
    { key: "date", label: "Date" },
    { key: "fy", label: "Financial year" },
    { key: "tan", label: "Tan" },
    { key: "quarter", label: "Quarter" },
    { key: "form", label: "Form" },
    { key: "addedBy", label: "Added by" },
    { key: "latestRemark", label: "Latest remark" },
    { key: "status", label: "Status" },
    { key: "returnFiling", label: "Return filing date" },
    { key: "action", label: "Action" },
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
          <Field className="flex flex-wrap gap-3">
            <div className="w-full md:w-1/4">
              <Label className="font-semibold text-[var(--primary-color)]">
                Financial Year
              </Label>
              <select
                name="fy"
                id="fy"
                className={clsx(
                  "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
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
                Form
              </Label>
              <select
                name="form"
                id="form"
                className={clsx(
                  "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                )}
                value={searchParams.form}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              >
                <option value="">Select Form</option>
                {Form &&
                  Form.length > 0 &&
                  Form.map((Form, index) => {
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
              <Label className="font-semibold text-[var(--primary-color)]">
                Added On Date
              </Label>
              <Input
                name="addedOn"
                id="addedOn"
                type="date"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                )}
                value={searchParams.addedOn}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              />
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
        <DynamicTableAction
          entity={entity}
          layoutType={"wot"}
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

export default RegularReturn;

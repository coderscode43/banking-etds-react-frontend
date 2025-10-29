import common from "@/common/common";
import GenerateExcelButton from "@/components/component/GenerateExcelButton";
import Pagination from "@/components/component/Pagination";
import SwitchButton from "@/components/component/SwitchButton";
import { TooltipWrapper } from "@/components/component/Tooltip";
import DynamicTable from "@/components/tables/DynamicTable";
import staticDataContext from "@/context/staticDataContext";
import { fy } from "@/lib/utils";
import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TotalAmount = () => {
  const entity = "totalAmount";
  const navigate = useNavigate();
  const { params } = useParams();
  const { financialYear, Month, Section } = useContext(staticDataContext);

  const [loading, setLoading] = useState(true);
  const [listData, setListData] = useState([]);
  const [showDivs, setShowDivs] = useState(false);
  const [autoResize, setAutoResize] = useState(false);
  const [gotoPage, setGotoPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState({
    custVendId: "",
    challanHeading: "",
    pan: "",
    month: "",
    fy: "",
    sectionCode: "",
    totalAmountPaidRaw: "",
    totalAmountPaidUpload: "",
    totaltaxRaw: "",
    totalTaxUploaded: "",
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
            custVendId: "",
            challanHeading: "",
            pan: "",
            month: "",
            fy: "",
            sectionCode: "",
            totalAmountPaidRaw: "",
            totalAmountPaidUpload: "",
            totaltaxRaw: "",
            totalTaxUploaded: "",
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
        setLoading(false); // End loading
      }
    };

    fetchListData();
  }, [params]);

  // Table Details
  const tableHead = [
    { label: "Sr.No.", key: "srNo" },
    { label: "Customer ID", key: "custVendId" },
    { label: "PAN", key: "pan" },
    { label: "Section", key: "sectionCode" },
    { label: "Challan Heading", key: "challanHeading" },
    { label: "Month", key: "month" },
    { label: "FY", key: "fy", formatter: fy },
    { label: "System Amount", key: "totalAmountPaidRaw" },
    { label: "Traces Amount", key: "totalAmountPaidUpload" },
    { label: "System Amount Tax", key: "totaltaxRaw" },
    { label: "Traces Amount Tax", key: "totalTaxUploaded" },
    { label: "Remark", key: "remark" },
    { label: "Source", key: "source" },
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
          Total Amount Details
        </h1>

        <div>
          <div className="flex flex-wrap gap-3">
            <div className="w-full md:w-1/4">
              <label className="font-semibold text-[var(--primary-color)]">
                Customer ID
              </label>
              <input
                name="custVendId"
                id="custVendId"
                placeholder="Customer ID"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none"
                )}
                value={searchParams.custVendId}
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

            <div className="w-full md:w-1/4">
              <label className="font-semibold text-[var(--primary-color)]">
                PAN
              </label>
              <input
                name="pan"
                id="pan"
                placeholder="PAN"
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
              <div>
                <GenerateExcelButton
                  entity={entity}
                  params={params}
                  searchParams={searchParams}
                  layoutType={"sc"}
                />
              </div>
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
            showDivs ? "max-h-[250px]" : "max-h-0"
          )}
        >
          <div className="flex flex-wrap items-end gap-3">
            <div className="w-full md:w-1/4">
              <label className="font-semibold text-[var(--primary-color)]">
                Month
              </label>
              <select
                name="month"
                id="month"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none",
                  "h-[38px]"
                )}
                value={searchParams.month}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              >
                <option value="">Select Month</option>
                {Month &&
                  Month.length > 0 &&
                  Month.map((month, index) => {
                    return (
                      <option key={index} value={month}>
                        {month}
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
                className={
                  "custom-scrollbar mt-1 h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                }
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
                Section
              </label>
              <select
                name="sectionCode"
                id="sectionCode"
                className={
                  "custom-scrollbar mt-1 h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
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

            <br />

            <div className="w-full md:w-1/4">
              <label className="font-semibold text-[var(--primary-color)]">
                System Amount
              </label>
              <input
                name="totalAmountPaidRaw"
                id="totalAmountPaidRaw"
                placeholder="System Amount"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none"
                )}
                value={searchParams.totalAmountPaidRaw}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              />
            </div>

            <div className="w-full md:w-1/4">
              <label className="font-semibold text-[var(--primary-color)]">
                Traces Amount
              </label>
              <input
                name="totalAmountPaidUpload"
                id="totalAmountPaidUpload"
                placeholder="Traces Amount"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none"
                )}
                value={searchParams.totalAmountPaidUpload}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              />
            </div>

            <div className="w-full md:w-1/4">
              <label className="font-semibold text-[var(--primary-color)]">
                System Tax Amount
              </label>
              <input
                name="totaltaxRaw"
                id="totaltaxRaw"
                placeholder="System Tax Amount"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none"
                )}
                value={searchParams.totaltaxRaw}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              />
            </div>

            <br />

            <div className="w-full md:w-1/4">
              <label className="font-semibold text-[var(--primary-color)]">
                Traces Tax Amount
              </label>
              <input
                name="totalTaxUploaded"
                id="totalTaxUploaded"
                placeholder="Traces Tax Amount"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none"
                )}
                value={searchParams.totalTaxUploaded}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              />
            </div>
          </div>
        </div>

        <div>
          <DynamicTable
            tableHead={tableHead}
            tableData={tableData}
            autoResize={autoResize}
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

export default TotalAmount;

import common from "@/common/common";
import GenerateExcelButton from "@/components/component/GenerateExcelButton";
import Pagination from "@/components/component/Pagination";
import { TooltipWrapper } from "@/components/component/Tooltip";
import DynamicTable from "@/components/tables/DynamicTable";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Logs = () => {
  const entity = "logs";

  const { params } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [listData, setListData] = useState([]);
  const [showDivs, setShowDivs] = useState(false);
  const [gotoPage, setGotoPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState({
    username: "",
    entity: "",
    ipaddrs: "",
    fromDate: "",
    toDate: "",
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
            username: "",
            entity: "",
            ipAddress: "",
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
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchListData();
  }, [params]);

  const tableHead = [
    { key: "srNo", label: "Sr.No" },
    { key: "username", label: "Username" },
    { key: "ipaddrs", label: "IP Address" },
    { key: "entity", label: "Entity" },
    { key: "logsDate", label: "Date" },
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

  return (
    <>
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-[var(--primary-color)]">Logs</h1>
        <div>
          <div className="flex flex-wrap gap-3">
            <div className="w-full md:w-1/4">
              <label className="font-semibold text-[var(--primary-color)]">
                User Name
              </label>
              <input
                name="username"
                id="username"
                placeholder="Name"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none"
                )}
                value={searchParams.username}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              />
            </div>
            <div className="w-full md:w-1/4">
              <label className="font-semibold text-[var(--primary-color)]">
                Entity
              </label>
              <input
                name="entity"
                id="entity"
                placeholder="Entity"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none"
                )}
                value={searchParams.entity}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              />
            </div>
            <div className="w-full md:w-1/4">
              <label className="font-semibold text-[var(--primary-color)]">
                IP-Address
              </label>
              <input
                name="ipaddrs"
                id="ipaddrs"
                placeholder="IP-Address"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none"
                )}
                value={searchParams.ipaddrs}
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
                From Date
              </label>
              <input
                type="date"
                id="fromDate"
                name="fromDate"
                className={clsx(
                  "mt-1 w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none"
                )}
                value={searchParams.fromDate}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              />
            </div>

            <div className="w-full md:w-1/4">
              <label className="font-semibold text-[var(--primary-color)]">
                To Date
              </label>
              <input
                type="date"
                id="toDate"
                name="toDate"
                className={clsx(
                  "mt-1 w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none"
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
                searchParams={searchParams}
                layoutType={"sc"}
              />
            </div>
          </div>
        </div>

        <div>
          <DynamicTable
            entity={entity}
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

export default Logs;

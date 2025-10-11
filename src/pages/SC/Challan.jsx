import clsx from "clsx";
import common from "@/common/common";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "@/components/component/Pagination";
import { TooltipWrapper } from "@/components/component/Tooltip";
import DynamicTable from "@/components/tables/DynamicTable";
import staticDataContext from "@/context/staticDataContext";
import GenerateExcelButton from "@/components/component/GenerateExcelButton";
import { date } from "@/lib/utils";

const Challan = () => {
  const entity = "challan";

  const navigate = useNavigate();
  const { params } = useParams();
  const { Tan } = useContext(staticDataContext);

  const [showDivs, setShowDivs] = useState(false);
  const [listData, setListData] = useState([]);
  const [gotoPage, setGotoPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState({
    AMOUNT_OF_CLALLAN: "",
    CIN: "",
    TAN: "",
    CHALLAN_MISMATCH: "",
    dateOfDeposition: "",
    asOnDate: "",
  });

  useEffect(() => {
    const fetchListData = async () => {
      try {
        let response;
        if (params) {
          const pageNo = 0;
          response = await common.getSearchListData(entity, pageNo, params);
          setSearchParams({
            AMOUNT_OF_CLALLAN: "",
            CIN: "",
            TAN: "",
            CHALLAN_MISMATCH: "",
            dateOfDeposition: "",
            asOnDate: "",
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

  // Table Details
  const tableHead = [
    { label: "Sr.No.", key: "srNo" },
    { label: "CIN", key: "cin" },
    { label: "TAN", key: "tan" },
    { label: "Amount of Challan", key: "AMOUNT_OF_CLALLAN" },
    {
      label: "Date of Deposition",
      key: "DATE_OF_DEPOSITION",
      formatter: date,
    },
    { label: "As on Date", key: "AS_ON_DATE" },
    { label: "Challan Mismatch", key: "CHALLAN_MISMATCH" },
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
          Challan Details
        </h1>
        <div>
          <div className="flex flex-wrap gap-3">
            <div className="w-full md:w-1/4">
              <label className="font-semibold text-[var(--primary-color)]">
                CIN
              </label>
              <input
                name="CIN"
                id="CIN"
                placeholder="CIN"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                )}
                value={searchParams.CIN}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              />
            </div>

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
                Challan Mismatch
              </label>
              <select
                name="CHALLAN_MISMATCH"
                id="CHALLAN_MISMATCH"
                className={clsx(
                  "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                )}
                value={searchParams.CHALLAN_MISMATCH}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              >
                <option value="">Select Option</option>
                <option value="1">True</option>
                <option value="0">False</option>
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
                Amount of challan
              </label>
              <input
                name="AMOUNT_OF_CLALLAN"
                id="AMOUNT_OF_CLALLAN"
                placeholder="Amount of challan"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none"
                )}
                value={searchParams.AMOUNT_OF_CLALLAN}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              />
            </div>

            <div className="w-full md:w-1/4">
              <label className="font-semibold text-[var(--primary-color)]">
                Date of Deposition
              </label>
              <input
                type="date"
                id="dateOfDeposition"
                name="dateOfDeposition"
                className={clsx(
                  "mt-1 w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none"
                )}
                value={searchParams.dateOfDeposition}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              />
            </div>

            <div className="w-full md:w-1/4">
              <label className="font-semibold text-[var(--primary-color)]">
                As on Date
              </label>
              <input
                type="date"
                id="asOnDate"
                name="asOnDate"
                className={clsx(
                  "mt-1 w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none"
                )}
                value={searchParams.asOnDate}
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
          <DynamicTable tableHead={tableHead} tableData={tableData} />
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

export default Challan;

import clsx from "clsx";
import common from "@/common/common";
import { useContext, useEffect, useState } from "react";
import staticDataContext from "@/context/staticDataContext";
import DynamicTable from "@/components/tables/DynamicTable";
import { TooltipWrapper } from "@/components/component/Tooltip";
import Pagination from "@/components/component/Pagination";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const DeductorDetails = () => {
  const entity = "deductorDetails";

  const navigate = useNavigate();
  const { params } = useParams();
  const { State, Tan } = useContext(staticDataContext);

  const [gotoPage, setGotoPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [listData, setListData] = useState([]);
  const [searchParams, setSearchParams] = useState({
    TAN: "",
    STATE: "",
    CITY: "",
  });

  useEffect(() => {
    const fetchListData = async () => {
      try {
        let response;
        if (params) {
          const pageNo = 0;
          response = await common.getSearchListData(entity, pageNo, params);
          setSearchParams({
            TAN: "",
            STATE: "",
            CITY: "",
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
    { key: "tan", label: "TAN" },
    { key: "state", label: "State" },
    { key: "CITY", label: "City" },
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
          Deductor Details
        </h1>

        <div>
          <div className="flex flex-wrap gap-3">
            <div className="w-full md:w-1/4">
              <label className="font-semibold text-[var(--primary-color)]">
                Tan
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
                  Tan.map((Tan, index) => {
                    return (
                      <option key={index} value={Tan}>
                        {Tan}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="w-full md:w-1/4">
              <label className="font-semibold text-[var(--primary-color)]">
                State
              </label>
              <select
                name="STATE"
                id="STATE"
                className={clsx(
                  "custom-scrollbar mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                )}
                value={searchParams.STATE}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              >
                <option value="">Select State</option>
                {State &&
                  State.length > 0 &&
                  State.map((state, index) => {
                    return (
                      <option key={index} value={state}>
                        {state}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="w-full md:w-1/4">
              <label className="font-semibold text-[var(--primary-color)]">
                City
              </label>
              <input
                id="CITY"
                name="CITY"
                placeholder="City"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                )}
                value={searchParams.CITY}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              />
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

        <DynamicTable tableHead={tableHead} tableData={tableData} />
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

export default DeductorDetails;

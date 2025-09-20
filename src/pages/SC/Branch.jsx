import clsx from "clsx";
import common from "@/common/common";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Field, Input, Label } from "@headlessui/react";
import Pagination from "@/components/component/Pagination";
import staticDataContext from "@/context/staticDataContext";
import { TooltipWrapper } from "@/components/component/Tooltip";
import DynamicTableEdit from "@/components/tables/DynamicTableEdit";

const Branch = () => {
  const entity = "branch";

  const navigate = useNavigate();
  const { params } = useParams();
  const { State } = useContext(staticDataContext);

  const [listData, setListData] = useState([]);
  const [gotoPage, setGotoPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState({
    roCode: "",
    branchName: "",
    branchState: "",
  });

  useEffect(() => {
    const fetchListData = async () => {
      try {
        let response;
        if (params) {
          const pageNo = 0;
          response = await common.getSearchListData(entity, pageNo, params);
          setSearchParams({
            roCode: "",
            branchName: "",
            branchState: "",
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
    { key: "srNo", label: "Sr.No" },
    { key: "roCode", label: "ROCode" },
    { key: "branchName", label: "RO Branch Name" },
    { key: "branchEmail", label: "RO Email" },
    { key: "branchContactNo", label: "RO Contact No" },
    { key: "branchAddress", label: "RO Address" },
    { key: "branchPinCode", label: "Ro PinCode" },
    { key: "branchState", label: "Ro State" },
    { key: "branchEdit", label: "RO Edit" },
  ];

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
          RO Details
        </h1>

        <div>
          <Field className="flex flex-wrap gap-3">
            <div className="w-full md:w-1/4">
              <Label className="font-semibold text-[var(--primary-color)]">
                Ro Code
              </Label>
              <Input
                name="roCode"
                id="roCode"
                placeholder="RO Code"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                )}
                value={searchParams.roCode}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              />
            </div>
            <div className="w-full md:w-1/4">
              <Label className="font-semibold text-[var(--primary-color)]">
                RO Name
              </Label>
              <Input
                name="branchName"
                id="branchName"
                placeholder="Name"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                )}
                value={searchParams.branchName}
                onChange={(e) =>
                  common.handleSearchInputChange(e, setSearchParams)
                }
              />
            </div>
            <div className="w-full md:w-1/4">
              <Label className="font-semibold text-[var(--primary-color)]">
                State
              </Label>
              <select
                name="branchState"
                id="branchState"
                className={clsx(
                  "custom-scrollbar mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                )}
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

            <div className="mt-6.5 flex gap-2">
              <TooltipWrapper tooltipText="Search">
                <button
                  className="h-[38px] cursor-pointer rounded-sm bg-[#03d87f] px-3 text-2xl font-black text-white"
                  onClick={handleSearch}
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </TooltipWrapper>

              <TooltipWrapper tooltipText="Add RO">
                <button
                  className="h-[38px] cursor-pointer rounded-sm bg-[#1761fd] px-3 text-2xl font-black text-white"
                  onClick={() => {
                    navigate(`/home/add/addBranch`);
                  }}
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              </TooltipWrapper>

              <TooltipWrapper tooltipText="Export to Excel">
                <button className="h-[38px] cursor-pointer rounded-sm bg-[#1761fd] px-3 text-2xl text-white">
                  <i className="fa-solid fa-file-excel"></i>
                </button>
              </TooltipWrapper>
            </div>
          </Field>
        </div>

        <DynamicTableEdit
          entity={entity}
          tableHead={tableHead}
          tableData={tableData}
        />
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

export default Branch;

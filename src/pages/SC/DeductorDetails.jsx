import clsx from "clsx";
import common from "@/common/common";
import { Field, Input, Label } from "@headlessui/react";
import { useContext, useEffect, useState } from "react";
import staticDataContext from "@/context/staticDataContext";
import DynamicTable from "@/components/tables/DynamicTable";
import { TooltipWrapper } from "@/components/component/Tooltip";
import Pagination from "@/components/component/Pagination";

const DeductorDetails = () => {
  const entity = "deductorDetails";

  const { State, Tan } = useContext(staticDataContext);

  const [gotoPage, setGotoPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [listData, setListData] = useState([]);

  useEffect(() => {
    const fetchListData = async () => {
      try {
        const response = await common.getListData(entity);
        const count = response.data.count || 0;
        const pages = Math.ceil(count / 100);
        setTotalPages(pages);
        setListData(response.data.entities || []);
      } catch (error) {
        console.error("Error fetching list data:", error);
      }
    };

    fetchListData();
  }, []);

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

  return (
    <>
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-[var(--primary-color)]">
          Deductor Details
        </h1>

        <div>
          <Field className="flex flex-wrap gap-3">
            <div className="w-full md:w-1/4">
              <Label className="font-semibold text-[var(--primary-color)]">
                Tan
              </Label>

              <select
                name="tan"
                id="tan"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none",
                  "h-[38px]"
                )}
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
              <Label className="font-semibold text-[var(--primary-color)]">
                State
              </Label>
              <select
                name="state"
                id="state"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none",
                  "h-[38px]"
                )}
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
              <Label className="font-semibold text-[var(--primary-color)]">
                City
              </Label>
              <Input
                name="city"
                id="city"
                placeholder="City"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-none"
                )}
              />
            </div>

            <div className="mt-6.5 flex gap-2">
              <TooltipWrapper tooltipText="Search">
                <button className="h-[38px] cursor-pointer rounded-sm bg-[#03d87f] px-3 text-2xl font-black text-white">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </TooltipWrapper>
              <TooltipWrapper tooltipText={"Export To Excel Button"}>
                <button className="h-[38px] cursor-pointer rounded-sm bg-[#1761fd] px-2 text-white">
                  Export to Excel
                </button>
              </TooltipWrapper>
            </div>
          </Field>
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

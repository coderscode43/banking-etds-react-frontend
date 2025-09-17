import clsx from "clsx";
import common from "@/common/common";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Field, Input, Label } from "@headlessui/react";
import staticDataContext from "@/context/staticDataContext";
import { TooltipWrapper } from "@/components/component/Tooltip";
import DynamicTableEdit from "@/components/tables/DynamicTableEdit";

const Branch = () => {
  const entity = "branch";

  const navigate = useNavigate();
  const { State } = useContext(staticDataContext);

  const [listData, setListData] = useState([]);

  useEffect(() => {
    const fetchListData = async () => {
      const response = await common.getListData(entity);
      setListData(response.data.entities || []);
    };
    fetchListData();
  }, []);

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
    srNo: index + 1,
    ...data,
  }));

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
              />
            </div>
            <div className="w-full md:w-1/4">
              <Label className="font-semibold text-[var(--primary-color)]">
                RO Name
              </Label>
              <Input
                name="roName"
                id="roName"
                placeholder="Name"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
                )}
              />
            </div>
            <div className="w-full md:w-1/4">
              <Label className="font-semibold text-[var(--primary-color)]">
                State
              </Label>
              <select
                name="state"
                id="state"
                className={clsx(
                  "mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
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

            <div className="mt-6.5 flex gap-2">
              <TooltipWrapper tooltipText="Search">
                <button className="h-[38px] cursor-pointer rounded-sm bg-[#03d87f] px-3 text-2xl font-black text-white">
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
                <button className="h-[38px] cursor-pointer rounded-sm bg-[#1761fd] px-2 text-white">
                  Export to Excel
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
    </>
  );
};

export default Branch;

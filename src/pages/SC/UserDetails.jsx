import DynamicTableEdit from "@/components/tables/DynamicTableEdit";
import { Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";

const UserDetails = () => {
  const tableHead = [
    {
      key: "srNo",
      label: "Sr.No",
    },
    {
      key: "employeeId",
      label: "Employee ID",
    },
    {
      key: "typeOfUser",
      label: "Type Of Admin",
    },
    {
      key: "action",
      label: "Action",
    },
  ];

  const tableData = [
    {
      id: 2291353,
      employeeId: "vaibhav",
      typeOfUser: "admin",
    },
  ];
  return (
    <>
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-[var(--primary-color)]">
          User Details
        </h1>

        <div>
          <Field className="flex flex-wrap gap-3">
            <div className="w-full md:w-1/4">
              <Label className="font-semibold text-[var(--primary-color)]">
                User Details
              </Label>
              <Input
                id="userDetails"
                name="userDetails"
                placeholder="User Details"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none"
                )}
              />
            </div>

            <div className="w-full md:w-1/4">
              <Label className="font-semibold text-[var(--primary-color)]">
                Type Of User
              </Label>
              <select
                name="typeOfUser"
                id="typeOfUser"
                className={clsx(
                  "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                  "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none",
                  "h-[38px]"
                )}
              >
                <option value="">Select Type Of User</option>
                <option value="admin">Admin</option>
                <option value="superAdmin">Super Admin</option>
              </select>
            </div>

            <div className="mt-6.5 flex gap-4">
              <button className="h-[38px] cursor-pointer rounded-sm bg-[#03d87f] px-3 text-2xl font-black text-white">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>

              <button className="h-[38px] cursor-pointer rounded-sm bg-[#1761fd] px-2 text-white">
                Export to Excel
              </button>

              <button className="h-[38px] cursor-pointer rounded-sm bg-[#1761fd] px-3 text-2xl font-black text-white">
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          </Field>
        </div>

        <DynamicTableEdit tableHead={tableHead} tableData={tableData} />
      </div>
    </>
  );
};

export default UserDetails;

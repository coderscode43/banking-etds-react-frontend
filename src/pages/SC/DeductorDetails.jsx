import DynamicTableEdit from "@/components/tables/DynamicTableEdit";
import { Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";

const DeductorDetails = () => {
  const tableHead = [
    {
      key: "srNo",
      label: "Sr.No",
    },
    {
      key: "tan",
      label: "TAN",
    },
    {
      key: "state",
      label: "State",
    },
    {
      key: "CITY",
      label: "City",
    },
  ];

  const tableData = [
    {
      id: 10006,
      clientId: null,
      TAN: "VPNC00430D",
      FLATORFLOAR: "101",
      BUILDINGNAME: null,
      ROADSTREET: null,
      AREALOCALITY: null,
      CITY: "this is city",
      STATE: "19-MAHARASHTRA",
      PIN: "400091",
      STD: null,
      TELEPHONE: null,
      COMPANYEMAIL: null,
      STD_ALTERNATE: null,
      TELEPHONEALTERNATE: null,
      COMPANYEMAILALTERNATE: null,
      CHANGEADDRESSSINCELASTRETURN: "N",
      GSTIN: null,
      telephonealternate: null,
      companyemailalternate: null,
      roadstreet: null,
      telephone: null,
      flatorfloar: "101",
      buildingname: null,
      arealocality: null,
      companyemail: null,
      std_ALTERNATE: null,
      city: null,
      std: null,
      pin: "400091",
      state: "19-MAHARASHTRA",
      gstin: null,
      changeaddresssincelastreturn: "N",
      tan: "VPNC00430D",
    },
  ];
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
                  "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none",
                  "h-[38px]"
                )}
              >
                <option value="">Select TAN</option>
                <option value="tan1">TAN 1</option>
                <option value="tan2">TAN 2</option>
                <option value="tan3">TAN 3</option>
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
                  "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none",
                  "h-[38px]"
                )}
              >
                <option value="">Select State</option>
                <option value="state1">State 1</option>
                <option value="state2">State 2</option>
                <option value="state3">State 3</option>
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
                  "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none"
                )}
              />
            </div>

            <div className="mt-6.5 flex gap-4">
              <button className="h-[38px] cursor-pointer rounded-sm bg-[#03d87f] px-3 text-2xl font-black text-white">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>

              <button className="h-[38px] cursor-pointer rounded-sm bg-[#1761fd] px-2 text-white">
                Export to Excel
              </button>
            </div>
          </Field>
        </div>

        <DynamicTableEdit tableHead={tableHead} tableData={tableData} />
      </div>
    </>
  );
};

export default DeductorDetails;

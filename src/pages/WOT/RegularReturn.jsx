import DynamicTableEdit from "@/components/tables/DynamicTableEdit";
import { Field, Label } from "@headlessui/react";
import clsx from "clsx";

const RegularReturn = () => {
  const tableHead = [
    {
      key: "srNo",
      label: "Sr.No",
    },
    {
      key: "ipaddrs",
      label: "Zip File",
    },
    {
      key: "username",
      label: "Username",
    },
    {
      key: "tan",
      label: "Tan",
    },
    {
      key: "fy",
      label: "Financial Year",
    },
    {
      key: "quarter",
      label: "Quarter",
    },
    {
      key: "form",
      label: "Form",
    },
    {
      key: "date",
      label: "Date",
    },
    {
      key: "status",
      label: "Status",
    },
  ];

  const tableData = [
    {
      id: 2291353,
      username: "directdownload",
      logsDate: "2025-09-02",
      quarter: "Q65",
      form: "Download Certificate",
      date: "2025-09-02",
      status: "this is status",
      tan: "skjhdfjkh",
      zipFile: "skjhdfjkh",
      fy: null,
    },
    {
      id: 2291353,
      username: "directdownload",
      logsDate: "2025-09-02",
      quarter: "Q65",
      form: "Download Certificate",
      date: "2025-09-02",
      status: "this is status",
      tan: "skjhdfjkh",
      zipFile: "skjhdfjkh",
      fy: null,
    },
  ];
  return (
    <>
      {" "}
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-[var(--primary-color)]">
          Regular Return
        </h1>

        <div>
          <form className="flex items-end justify-start gap-5">
            <Field className="flex gap-3">
              <div>
                <Label className="font-semibold text-[var(--primary-color)]">
                  Financial Year
                </Label>
                <select
                  name="FY"
                  id="FY"
                  className={clsx(
                    "mt-1 block w-72 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                    "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none",
                    "h-[38px]"
                  )}
                >
                  {" "}
                  <option value="">Select Financial Year</option>
                  <option value="2025-26">2025-26</option>
                  <option value="2024-25">2024-25</option>
                  <option value="2023-24">2023-24</option>
                </select>
              </div>
              <div>
                <Label className="font-semibold text-[var(--primary-color)]">
                  Quarter
                </Label>
                <select
                  name="quarter"
                  id="quarter"
                  className={clsx(
                    "mt-1 block w-72 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                    "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none",
                    "h-[38px]"
                  )}
                >
                  {" "}
                  <option value="">Select Quarter</option>
                  <option value="Q1">Q1</option>
                  <option value="Q2">Q2</option>
                  <option value="Q3">Q3</option>
                </select>
              </div>
              <div>
                <Label className="font-semibold text-[var(--primary-color)]">
                  Form
                </Label>
                <select
                  name="form"
                  id="form"
                  className={clsx(
                    "mt-1 block w-72 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                    "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none",
                    "h-[38px]"
                  )}
                >
                  {" "}
                  <option value="">Select Form</option>
                  <option value="Form1">Form 1</option>
                  <option value="Form2">Form 2</option>
                  <option value="Form3">Form 3</option>
                </select>
              </div>
            </Field>

            <div className="flex gap-4">
              <button className="h-[38px] cursor-pointer rounded-sm bg-[#03d87f] px-3 text-2xl font-black text-white">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>

              <button className="h-[38px] cursor-pointer rounded-sm bg-[#ffa500] px-3 text-2xl font-black text-white">
                <i className="fa-solid fa-filter"></i>
              </button>
            </div>
          </form>
        </div>

        <DynamicTableEdit tableHead={tableHead} tableData={tableData} />
      </div>
    </>
  );
};

export default RegularReturn;

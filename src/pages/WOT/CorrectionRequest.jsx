import DynamicTableEdit from "@/components/tables/DynamicTableEdit";
import { Field, Label } from "@headlessui/react";
import clsx from "clsx";

const CorrectionRequest = () => {
  const tableHead = [
    { key: "srNo", label: "Sr.No" },
    { key: "ticketNumber", label: "Ticket Number" },
    { key: "fy", label: "Financial Year" },
    { key: "branchCode", label: "Branch" },
    { key: "quarter", label: "Quarter" },
    { key: "name", label: "Name of Customer" },
    { pan: "fy", label: "Pan Of Customer" },
    { key: "typeOfCorrection", label: "Type of Correction" },
    { key: "status", label: "Status" },
    { key: "lastUpdatedOn", label: "Last Updated On" },
    { key: "status", abel: "Action" },
  ];

  const tableData = [
    {
      ticketNumber: 202508070001,
      taxTeamApprovedBy: "tejas",
      correctionBy: null,
      fileName: null,
      typeOfCorrection: "PAN Updation",
      newRequestTicketNo: null,
      color: "yellow",
      mobileNumber: "8323594479",
      taxTeamApprovedOn: "07-08-2025 17:15:01",
      remark: "Test",
      correctionOn: null,
      reasonForExemption: null,
      correctionRequestDate: "07-08-2025 16:59:17",
      fy: "2024-25",
      typeOfForm: "24Q-Salary",
      custId: null,
      lastUpdatedOn: "02-09-2025 17:00:51",
      id: 2291061,
      makerBy: "admin",
      pan: null,
      tan: null,
      rejectStatus: false,
      regenarateRequest: null,
      empNo: null,
      branchCode: 1223,
      checkerApprovedBy: "tejas",
      name: "Divyanshu Singh",
      checkerApprovedOn: "07-08-2025 17:15:01",
      correctionStatus: false,
      nameOfRequest: null,
      status: "Pending Checker Approval",
      quarter: "Q1, Q2, Q3, Q4",
    },
  ];
  return (
    <>
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-[var(--primary-color)]">
          Correction Request Details
        </h1>

        <div>
          <form className="flex items-end justify-start gap-5">
            <Field className="flex gap-3">
              <div>
                <Label className="font-semibold text-[var(--primary-color)]">
                  Status
                </Label>
                <select
                  name="status"
                  id="status"
                  className={clsx(
                    "mt-1 block w-72 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900",
                    "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 focus:outline-none",
                    "h-[38px]"
                  )}
                >
                  <option value="">Select Status</option>
                  <option value="status1">Status 1</option>
                  <option value="status2">Status 2</option>
                  <option value="status3">Status 3</option>
                </select>
              </div>
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
            </Field>

            <div className="flex gap-4">
              <button className="h-[38px] cursor-pointer rounded-sm bg-[#03d87f] px-3 text-2xl font-black text-white">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>

              <button className="h-[38px] cursor-pointer rounded-sm bg-[#ffa500] px-3 text-2xl font-black text-white">
                <i className="fa-solid fa-filter"></i>
              </button>

              <button className="h-[38px] cursor-pointer rounded-sm bg-[#1761fd] px-3 text-2xl font-black text-white">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </form>
        </div>

        <DynamicTableEdit tableHead={tableHead} tableData={tableData} />
      </div>
    </>
  );
};

export default CorrectionRequest;

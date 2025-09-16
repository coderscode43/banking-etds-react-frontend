import { useNavigate } from "react-router-dom";
import DynamicTable from "@/components/tables/DynamicTable";
import { DetailGrid } from "@/components/component/DetailGrid";
import DynamicTableAction from "@/components/tables/DynamicTableAction";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

const DetailCorrectionRequest = () => {
  const navigate = useNavigate();

  const fields = [
    { label: "Ticket Number", key: "ticketNumber" },
    { label: "Financial Year", key: "fy" },
    { label: "Quarter", key: "quarter" },
    {
      label: "Date of Request",
      key: "correctionRequestDate",
      formatter: (d) =>
        d ? new Date(d.replace(/-/g, "/")).toLocaleDateString("en-GB") : "",
    },
    { label: "Name of Customer", key: "name" },
    { label: "Type of Form", key: "typeOfForm" },
    { label: "Type of Correction", key: "typeOfCorrection" },
    { label: "PAN of Customer", key: "pan" },
    {
      label: "Mobile Number of who Generated Correction/Query Request",
      key: "mobileNumber",
      // fullRow: true,
    },
    { label: "Response", key: "status" },
    { label: "Document", key: "fileName" },
  ];

  const fields1 = [
    { label: "Request Created By", key: "" },
    {
      label: "Request Created On",
      key: "fy",
      formatter: (d) => (d ? new Date(d).toLocaleDateString("en-GB") : ""),
    },
    { label: "Status", key: "quarter" },
    { label: "Checker Approved By", key: "correctionRequestDate" },
    {
      label: "Checker Approved On",
      key: "fy",
      formatter: (d) =>
        d ? new Date(d.replace(/-/g, "/")).toLocaleDateString("en-GB") : "",
    },
    { label: "Tax Team Approved By", key: "ticketNumber" },
    {
      label: "Tax Team Approved On",
      key: "fy",
      formatter: (d) =>
        d ? new Date(d.replace(/-/g, "/")).toLocaleDateString("en-GB") : "",
    },
    { label: "Correction By", key: "ticketNumber" },
    {
      label: "Correction On",
      key: "fy",
      formatter: (d) =>
        d ? new Date(d.replace(/-/g, "/")).toLocaleDateString("en-GB") : "",
    },
  ];

  const data = [
    {
      id: 2290445,
      correctionRequestDate: "06-03-2025 14:57:32",
      custId: null,
      name: "test",
      pan: null,
      nameOfRequest: null,
      branchCode: 100000,
      empNo: null,
      ticketNumber: 202503060003,
      typeOfCorrection: "PAN Updation",
      remark: "tEST",
      checkerApprovedBy: null,
      checkerApprovedOn: null,
      taxTeamApprovedBy: null,
      taxTeamApprovedOn: null,
      correctionBy: null,
      correctionOn: null,
      makerBy: "admin",
      status: "Pending Checker Approval",
      fy: "2024-25",
      quarter: "Q1",
      rejectStatus: false,
      fileName: "GSTR1Summary.xlsx^",
      correctionStatus: false,
      mobileNumber: "9987442365",
      typeOfForm: "24Q-Salary",
      tan: null,
      lastUpdatedOn: "06-03-2025 14:57:32",
      reasonForExemption: null,
      regenarateRequest: null,
      newRequestTicketNo: null,
    },
  ];

  const tableHead = [
    { key: "srNo", label: "Sr.No" },
    { key: "correctionRemark", label: "Correction Response" },
    { key: "supportingDocName", label: "Supporting Document Name" },
    { key: "addedBy", label: "Added By" },
    { key: "dateTime", label: "Added On" },
    { key: "remarkStatus", label: "Action" },
  ];

  const tableData = [
    {
      id: 2290711,
      correctionRequestId: 2290361,
      dateTime: "03-06-2025 17:15:13",
      correctionRemark: "Tst",
      addedBy: "admin",
      branchCode: 100000,
      supportingDocName: "AAEPD9007G_2024-25_1.pdf",
      remarkStatus: "Resolved",
    },
  ];

  const tableHeadOtherDetails = [
    { key: "srNo", label: "Sr.No" },
    { key: "name", label: "Name" },
    { key: "dateOfPayment", label: "Date of Payment" },
    { key: "tds", label: "TDS Amount" },
    { key: "amountPaid", label: "Gross Amount" },
    { key: "quarter", label: "Quarter" },
    { key: "pan", label: "PAN" },
    { key: "correctPan", label: "Correct PAN" },
    { key: "status", label: "Other Response" },
  ];

  const categories = [
    {
      name: "Correction Tracker",
    },
    {
      name: "Other Details",
    },
  ];

  const tableDataOtherDetails = [
    {
      id: 2290364,
      correctionRequestId: 2290361,
      dateOfPayment: "05-08-2024",
      amountPaid: 72170,
      correctAmountPaid: null,
      tds: 14434,
      correctTds: null,
      pan: "AAAPA1234A",
      correctPan: "AAAAC0641A",
      sectionCode: "94A",
      correctSection: null,
      correctRemark: null,
      quarter: "Q2",
      name: "Sample",
    },
  ];

  return (
    <>
      <div className="rounded-md border border-gray-100 p-4 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
        <h1 className="ms-2 mb-5 text-2xl font-bold text-[var(--primary-color)]">
          Correction Details
        </h1>

        <DetailGrid fields={fields} data={data[0]} columns={3} />
        <hr className="m-5 bg-gray-400" />
        <DetailGrid fields={fields1} data={data[0]} columns={3} />
        <div className="mb-3 flex justify-end gap-4 py-5">
          <button
            className="cursor-pointer rounded-md bg-red-600 p-2 px-4 font-semibold text-white"
            onClick={() => navigate(-1)}
          >
            <i className="fa-solid fa-reply-all"></i>&nbsp; Back
          </button>
        </div>

        <TabGroup className="mx-2 flex w-full flex-col items-center">
          <TabList className="flex w-full justify-around rounded-md border-gray-200 bg-gray-100 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
            {categories.map(({ name }) => (
              <Tab
                key={name}
                className={({ selected }) =>
                  `w-full cursor-pointer space-x-1 rounded-md border-0 px-28 py-2 font-semibold ${
                    selected
                      ? "bg-[#1d3864] text-[#fff] outline-none"
                      : "w-full text-[#1d3864] outline-none"
                  }`
                }
              >
                {name}
              </Tab>
            ))}
          </TabList>
          <TabPanels className="mt-9 w-full">
            <TabPanel
              key={categories.name}
              className="rounded-xl bg-gray-100 shadow-sm"
            >
              <DynamicTableAction tableHead={tableHead} tableData={tableData} />
            </TabPanel>
            <TabPanel
              key={categories.name}
              className="rounded-xl bg-white shadow-sm"
            >
              <DynamicTable
                tableHead={tableHeadOtherDetails}
                tableData={tableDataOtherDetails}
              />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </>
  );
};

export default DetailCorrectionRequest;

import common from "@/common/common";
import { useNavigate } from "react-router-dom";
import { DetailGrid } from "@/components/component/DetailGrid";
import DynamicTableEdit from "@/components/tables/DynamicTableEdit";
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
    // {
    //   label: "Document",
    //   key: "fileName",
    // },
  ];

  const fields1 = [
    { label: "Request Created By", key: "" },
    {
      label: "Request Created On",
      key: "",
      formatter: (d) =>
        d ? new Date(d.replace(/-/g, "/")).toLocaleDateString("en-GB") : "",
    },
    { label: "Status", key: "status" },
    { label: "Checker Approved By", key: "checkerApprovedBy" },
    {
      label: "Checker Approved On",
      key: "checkerApprovedOn",
      formatter: (d) =>
        d ? new Date(d.replace(/-/g, "/")).toLocaleDateString("en-GB") : "",
    },
    { label: "Tax Team Approved By", key: "taxTeamApprovedBy" },
    {
      label: "Tax Team Approved On",
      key: "taxTeamApprovedOn",
      formatter: (d) => (d ? new Date(d).toLocaleDateString("en-GB") : ""),
    },
    { label: "Correction By", key: "correctionBy" },
    {
      label: "Correction On",
      key: "correctionOn",
      formatter: (d) => (d ? new Date(d).toLocaleDateString("en-GB") : ""),
    },
  ];

  const data = [
    {
      id: 2291061,
      correctionRequestDate: "07-08-2025 16:59:17",
      custId: 123,
      name: "Divyanshu Singh",
      pan: 123,
      nameOfRequest: 123,
      branchCode: 1223,
      empNo: 123,
      ticketNumber: 202508070001,
      typeOfCorrection: "PAN Updation",
      remark: "Test",
      checkerApprovedBy: "tejas",
      checkerApprovedOn: "07-08-2025 17:15:01",
      taxTeamApprovedBy: "tejas",
      taxTeamApprovedOn: "07-08-2025 17:15:01",
      correctionBy: 123,
      correctionOn: 123,
      makerBy: "admin",
      status: "Pending Checker Approval",
      fy: "2024-25",
      quarter: "Q1, Q2, Q3, Q4",
      rejectStatus: false,
      fileName: 123,
      correctionStatus: false,
      mobileNumber: "8323594479",
      typeOfForm: "24Q-Salary",
      tan: 123,
      lastUpdatedOn: "02-09-2025 17:00:51",
      reasonForExemption: 123,
      regenarateRequest: 123,
      newRequestTicketNo: 123,
    },
  ];

  const tableHead = [
    { key: "srNo", label: "Sr.No" },
    { key: "correctionRequestId", label: "Correction Response" },
    { key: "supportingDocName", label: "Supporting Document Name" },
    { key: "addedBy", label: "Added By" },
    { key: "", label: "Added On" },
    { key: "", label: "Action" },
  ];

  const tableData = [
    {
      id: 2291065,
      correctionRequestId: 2291061,
      dateTime: "07-08-2025 17:15:01",
      correctionRemark: "ok",
      addedBy: "tejas",
      branchCode: 1223,
      supportingDocName: "file01",
      remarkStatus: "Approved",
    },

    {
      id: 2291065,
      correctionRequestId: 123,
      dateTime: "07-08-2025 17:15:01",
      correctionRemark: "ok",
      addedBy: "abhishek",
      branchCode: 1223,
      supportingDocName: "file02",
      remarkStatus: "Approved",
    },

    {
      id: 2291065,
      correctionRequestId: 22910,
      dateTime: "07-08-2025 17:15:01",
      correctionRemark: "ok",
      addedBy: "khushi",
      branchCode: 1223,
      supportingDocName: "file03",
      remarkStatus: "Approved",
    },
  ];

  const tableHeadOtherDetails = [
    { key: "srNo", label: "Sr.No" },
    { key: "correctionRequestId", label: "Correction Response" },
    { key: "supportingDocName", label: "Supporting Document Name" },
    { key: "addedBy", label: "Added By" },
    { key: "", label: "Added On" },
    { key: "", label: "Action" },
  ];

  const categories = [
    { name: "Correction Tracker" },
    { name: "Other Details" },
  ];

  const tableDataOtherDetails = [
    {
      id: 2291065,
      correctionRequestId: 2291061,
      dateTime: "07-08-2025 17:15:01",
      correctionRemark: "ok",
      addedBy: "tejas",
      branchCode: 1223,
      supportingDocName: "file01",
      remarkStatus: "Approved",
    },

    {
      id: 2291065,
      correctionRequestId: 123,
      dateTime: "07-08-2025 17:15:01",
      correctionRemark: "ok",
      addedBy: "abhishek",
      branchCode: 1223,
      supportingDocName: "file02",
      remarkStatus: "Approved",
    },

    {
      id: 2291065,
      correctionRequestId: 22910,
      dateTime: "07-08-2025 17:15:01",
      correctionRemark: "ok",
      addedBy: "khushi",
      branchCode: 1223,
      supportingDocName: "file03",
      remarkStatus: "Approved",
    },
  ];

  return (
    <>
      <div className="rounded-md p-4 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
        <h1 className="ms-2 mb-5 text-2xl font-bold text-[var(--primary-color)]">
          Correction Details
        </h1>

        <DetailGrid fields={fields} data={data[0]} columns={3} />
        <hr className="m-5 bg-gray-400" />
        <DetailGrid fields={fields1} data={data[0]} columns={3} />
        <div className="mb-3 flex justify-end gap-4 py-5">
          <button className="rounded-md bg-blue-600 p-2 px-4 font-semibold text-white">
            <i className="fa-solid fa-plus"></i>&nbsp; Add Response
          </button>
          <button
            className="rounded-md bg-red-600 p-2 px-4 font-semibold text-white"
            onClick={common.navigateBack(navigate)}
          >
            <i className="fa-solid fa-reply-all"></i>&nbsp; Back
          </button>
        </div>

        <TabGroup className="mx-2 flex w-full flex-col items-center">
          <TabList className="flex w-full justify-around rounded-md border-gray-200 bg-gray-100 p-1 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
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
              <DynamicTableEdit tableHead={tableHead} tableData={tableData} />
            </TabPanel>

            {
              <TabPanel
                key={categories.name}
                className="rounded-xl bg-white shadow-sm"
              >
                <DynamicTableEdit
                  tableHead={tableHeadOtherDetails}
                  tableData={tableDataOtherDetails}
                />
              </TabPanel>
            }
          </TabPanels>
        </TabGroup>
      </div>
    </>
  );
};

export default DetailCorrectionRequest;

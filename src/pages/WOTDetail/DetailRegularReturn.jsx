import { DetailGrid } from "@/components/component/DetailGrid";
import DynamicTableEdit from "@/components/tables/DynamicTableEdit";
import { useNavigate } from "react-router-dom";

const DetailRegularReturn = () => {
  const navigate = useNavigate();

  const fields = [
    { label: "Financial Year", key: "fy" },
    { label: "Tan", key: "tan" },
    { label: "Quarter", key: "quarter" },
    { label: "Form", key: "form" },
    {
      label: "Added On",
      key: "addedOn",
      formatter: (d) => (d ? new Date(d).toLocaleDateString("en-GB") : ""),
    },
    { label: "Added By", key: "addedBy" },

    { label: "Latest Response", key: "latestRemark" },
    { label: "Status", key: "status" },
  ];

  const data = [
    {
      id: 2290637,
      fy: "2024-25",
      tan: "MUMT08795D-HeadOffice",
      quarter: "Q2",
      form: "27Q-Other than Salary~NRI",
      branchCode: "100000",
      addedBy: "admin",
      addedOn: "2025-05-02T12:34:05",
      latestRemark: "This is the latestRemark",
      status: "Request for data from RO",
      returnFilingDate: null,
    },
  ];

  const tableHead = [
    { key: "srNo", label: "Sr.No" },
    { key: "ipaddrs", label: "Zip File" },
    { key: "username", label: "Username" },
    { key: "tan", label: "Tan" },
    { key: "fy", label: "Financial Year" },
    { key: "quarter", label: "Quarter" },
    { key: "form", label: "Form" },
    { key: "date", label: "Date" },
    { key: "status", label: "Status" },
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
  ];

  return (
    <>
      <div className="rounded-md p-4 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
        <h1 className="ms-2 mb-5 text-2xl font-bold text-[var(--primary-color)]">
          Regular Return
        </h1>

        <DetailGrid fields={fields} data={data[0]} columns={2} />

        <div className="mb-3 flex justify-end gap-4 pr-5">
          <button className="cursor-pointer rounded-md bg-blue-600 p-2 px-4 font-semibold text-white">
            <i className="fa-solid fa-plus mr-2"></i> <span>Add Response</span>
          </button>
          <button
            className="cursor-pointer rounded-md bg-red-600 p-2 px-4 font-semibold text-white"
            onClick={() => navigate(-1)}
          >
            <i className="fa-solid fa-reply-all"></i>&nbsp; Back
          </button>
        </div>

        <DynamicTableEdit tableHead={tableHead} tableData={tableData} />
      </div>
    </>
  );
};

export default DetailRegularReturn;

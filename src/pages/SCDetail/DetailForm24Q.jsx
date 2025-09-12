import common from "@/common/common";
import { DetailGrid } from "@/components/component/DetailGrid";
import DynamicTableEdit from "@/components/tables/DynamicTableEdit";
import { useNavigate } from "react-router-dom";

const DetailForm24Q = () => {
  const navigate = useNavigate();

  const fields = [
    { label: "Quarter", key: "quarter" },

    { label: "Month", key: "month" },

    { label: "RO Code", key: "roCode" },

    { label: "Branch Code", key: "branchCode" },

    { label: "Transaction ID", key: "custVendId" },

    { label: "Unique Ref No", key: "uniqueRefNo" },

    { label: "Account No", key: "accNo" },

    { label: "Challan Heading", key: "challanHeading" },

    { label: "PAN Ref No.", key: "panRefNo" },

    { label: "PAN", key: "pan" },

    { label: "Section Code", key: "sectionCode" },

    { label: "Date of Payment", key: "dateOfPayment" },

    { label: "Date of Deduction", key: "dateOfDeduction" },

    { label: "Amount Paid", key: "amountPaid" },

    { label: "TDS", key: "tds" },

    { label: "Surcharge", key: "surcharge" },

    { label: "Education Cess", key: "eduCess" },

    { label: "Total TDS ", key: "" },

    { label: "Total Tax Deposited", key: "totalTaxDeposited" },

    { label: "TAN ", key: "tan" },

    { label: "Certificate Number  ", key: "certificateNumber" },

    { label: "Error Description", key: "errorDescription" },

    { label: "Warning Description", key: "warningDescription" },

    { label: "Short Deduction", key: "shortDeduction" },

    { label: "Interest On Short Deduction", key: "interestOnShortDeduction" },
    { label: "Interest On Late Payment  ", key: "interestOnLatePayment" },
    { label: "Interest On Late Deduction   ", key: "interestOnLateDeduction" },
    { label: "Status ", key: "" },
  ];

  const data = [
    {
      id: 150118,
      challanHeading: "Interest_24Q",
      deducteeRefNo: 789456,
      panRefNo: 457856,
      pan: "ABFPL4107P",
      name: "R.D.LAKHAN . 26056)",
      sectionCode: "92B",
      dateOfPayment: "2024-03-31",
      dateOfDeduction: "2024-04-22",
      amountPaid: 5122795,
      tds: 123,
      surcharge: 123,
      eduCess: 123,
      totalTaxDeducted: 4578,
      totalTaxDeposited: 4578,
      certificateNumber: 784578,
      remarksReason: 784512,
      fy: "2023-24",
      quarter: "Q4",
      branchCode: 100000,
      accNo: 4582145,
      challanSrNo: 3,
      month: "MARCH",
      custVendId: "123456789",
      uniqueRefNo: 123444,
      TAN: "MUMT09716A",
      roCode: "100000",
      errorDescription: 123,
      warningDescription: 789,
      shortDeduction: 123,
      interestOnShortDeduction: 123,
      interestOnLatePayment: 123,
      interestOnLateDeduction: 123,
      resolved: true,
      comments: 789,
      deducteeSrNo: 59,
      tranAmt: 123,
      additionalDetail: 789,
      tan: "MUMT09716A",
    },
  ];

  const tableHead = [
    { key: "srNo", label: "Sr.No" },
    { key: "zipFile", label: "Zip File" },
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
      quarter: "123",
      form: "Download Certificate",
      date: "2025-09-02",
      status: "this is status",
      tan: "123",
      zipFile: "123",
      fy: 2025,
    },

    {
      id: 2291354,
      username: "directdownload",
      logsDate: "2025-09-02",
      quarter: "12345",
      form: "Download Certificate",
      date: "2025-09-02",
      status: "this is statussss",
      tan: "12345",
      zipFile: "12345",
      fy: 2025,
    },
  ];

  return (
    <>
      <div className="rounded-md p-4 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
        <h1 className="ms-2 mb-5 text-2xl font-bold text-[var(--primary-color)]">
          Details of Form 24Q Deductee
        </h1>

        <DetailGrid fields={fields} data={data[0]} columns={2} />

        <div className="flex justify-end gap-4 pr-5">
          <button className="cursor-pointer rounded-md bg-blue-600 p-2 px-4 font-semibold text-white">
            <i className="fa-solid fa-pen-to-square"></i>&nbsp; Edit
          </button>
          <button
            className="cursor-pointer rounded-md bg-red-600 p-2 px-4 font-semibold text-white"
            onClick={common.navigateBack(navigate)}
          >
            <i className="fa-solid fa-reply-all"></i>&nbsp; Back
          </button>
        </div>
        <div className="mt-5">
          <DynamicTableEdit tableHead={tableHead} tableData={tableData} />
        </div>
      </div>
    </>
  );
};

export default DetailForm24Q;

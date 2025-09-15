import { DetailGrid } from "@/components/component/DetailGrid";
import { useNavigate } from "react-router-dom";

const DetailForm24QDeductee = () => {
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
    { label: "PAN Ref No", key: "panRefNo" },
    { label: "Pan", key: "pan" },
    { label: "Section Code", key: "sectionCode" },
    {
      label: "Date of Payment",
      key: "dateOfPayment",
      formatter: (d) => (d ? new Date(d).toLocaleDateString("en-GB") : ""),
    },
    {
      label: "Date of Deduction",
      key: "dateOfDeduction",
      formatter: (d) => (d ? new Date(d).toLocaleDateString("en-GB") : ""),
    },
    { label: "Amount Paid", key: "amountPaid" },
    { label: "TDS", key: "tds" },
    { label: "Surcharge", key: "surcharge" },
    { label: "Education Cess", key: "eduCess" },
    { label: "Total TDS", key: "totalTaxDeducted" },
    { label: "Total Tax Deposited", key: "totalTaxDeposited" },
    { label: "Tan", key: "tan" },
    { label: "Certificate Number", key: "certificateNumber" },
    { label: "Error Description", key: "errorDescription" },
    { label: "Warning Description", key: "warningDescription" },
    { label: "Short Deduction", key: "shortDeduction" },
    { label: "Interest on Short Deduction", key: "interestOnShortDeduction" },
    { label: "Interest on Late Payment", key: "interestOnLatePayment" },
    { label: "Interest on Late Deduction", key: "interestOnLateDeduction" },
    { label: "Status", key: "comments" },
  ];

  const tableData = [
    {
      id: 150118,
      challanHeading: "Interest_24Q",
      deducteeRefNo: null,
      panRefNo: "965823569425",
      pan: "ABFPL4107P",
      name: "R.D.LAKHAN . 26056)",
      sectionCode: "92B",
      dateOfPayment: "2024-03-31",
      dateOfDeduction: "2024-04-22",
      amountPaid: 5122795.0,
      tds: 4530.0,
      surcharge: 9650.0,
      eduCess: 3650.0,
      totalTaxDeducted: 2536.0,
      totalTaxDeposited: 4256.0,
      certificateNumber: "658",
      remarksReason: "this is the reason for Remark",
      fy: "2023-24",
      quarter: "Q4",
      branchCode: 100000,
      accNo: "380001025002463",
      challanSrNo: 3,
      month: "MARCH",
      custVendId: "123456789",
      uniqueRefNo: "658",
      TAN: "MUMT09716A",
      roCode: "100000",
      errorDescription: "this is error Description",
      warningDescription: "this is warning Description",
      shortDeduction: 6953.0,
      interestOnShortDeduction: 5263.0,
      interestOnLatePayment: 5246.0,
      interestOnLateDeduction: 9874.0,
      resolved: true,
      comments: "This is comments",
      deducteeSrNo: 59,
      tranAmt: 25836,
      additionalDetail: null,
      tan: "MUMT09716A",
    },
  ];

  return (
    <>
      <div className="rounded-md p-4 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
        <h1 className="ms-2 mb-5 text-2xl font-bold text-[var(--primary-color)]">
          Details Form 24Q Deductee
        </h1>

        <DetailGrid fields={fields} data={tableData[0]} columns={2} />

        <div className="flex justify-end gap-4 pr-5">
          <button
            className="cursor-pointer rounded-md bg-red-600 p-2 px-4 font-semibold text-white"
            onClick={() => navigate(-1)}
          >
            <i className="fa-solid fa-reply-all"></i>&nbsp; Back
          </button>
        </div>
      </div>
    </>
  );
};

export default DetailForm24QDeductee;

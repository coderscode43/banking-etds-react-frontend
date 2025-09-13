import { DetailGrid } from "@/components/component/DetailGrid";
import { useNavigate } from "react-router-dom";

const DetailForm26QDeductee = () => {
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
    { label: "Section Code", key: "sectionCode" },
    {
      label: "Date of Payment",
      key: "dateOfPayment",
      formatter: (d) => (d ? new Date(d).toLocaleDateString("en-GB") : ""),
    },
    { label: "Amount Paid", key: "amountPaid" },
    { label: "TDS", key: "tds" },
    { label: "Surcharge", key: "surcharge" },
    { label: "Education Cess", key: "eduCess" },
    { label: "Total TDS", key: "tds" },
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

  const data = [
    {
      id: 150116,
      challanHeading: "Interest_24Q",
      deducteeRefNo: 3562,
      panRefNo: 658,
      pan: "CGFPG6220H",
      name: "HARSHALI GUPTA",
      sectionCode: "92B",
      dateOfPayment: "2024-03-31",
      dateOfDeduction: "2024-03-31",
      amountPaid: 122610.0,
      tds: 6953.0,
      surcharge: 36500.0,
      eduCess: 260.0,
      totalTaxDeducted: 65200.0,
      totalTaxDeposited: 95300.0,
      certificateNumber: 236,
      remarksReason: 953,
      fy: "2023-24",
      quarter: "Q4",
      branchCode: 100000,
      accNo: 231,
      challanSrNo: 3,
      month: "MARCH",
      custVendId: "123456789",
      uniqueRefNo: 6977,
      TAN: "MUMT09716A",
      roCode: "100000",
      errorDescription: "this is an error Description",
      warningDescription: "warning Description",
      shortDeduction: 600.0,
      interestOnShortDeduction: 500.0,
      interestOnLatePayment: 430.0,
      interestOnLateDeduction: 850.0,
      resolved: false,
      comments: "This is comment from professional",
      deducteeSrNo: 57,
      tranAmt: 65030,
      additionalDetail: "Additional Detail",
      tan: "MUMT09716A",
    },
  ];

  return (
    <>
      <div className="rounded-md p-4 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
        <h1 className="ms-2 mb-5 text-2xl font-bold text-[var(--primary-color)]">
          Details Form 26Q Deductee
        </h1>

        <DetailGrid fields={fields} data={data[0]} columns={2} />

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

export default DetailForm26QDeductee;

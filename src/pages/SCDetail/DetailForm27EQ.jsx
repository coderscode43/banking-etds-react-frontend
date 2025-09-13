import { useNavigate } from "react-router-dom";
import { DetailGrid } from "@/components/component/DetailGrid";

const DetailForm27EQ = () => {
  const navigate = useNavigate();

  const fields = [
    { label: "Quarter", key: "quarter" },
    { label: "Month", key: "month" },
    { label: "Branch Code", key: "branchCode" },
    { label: "Vend/Cust Id", key: "custVendId" },
    { label: "RO Code", key: "roCode" },
    { label: "TAN", key: "tan" },
    { label: "Unique Ref No", key: "uniqueRefNo" },
    { label: "Account Number", key: "accNo" },
    { label: "Challan Heading", key: "challanHeading" },
    { label: "Party Reference No.", key: "" },
    { label: "Party Code", key: "" },
    { label: "PAN of the Party", key: "pan" },
    { label: "Name of the Party", key: "name" },
    { label: "Amount Receipt/Debited", key: "" },
    { label: "Date of Received/Debited", key: "dateOfDeduction" },
    { label: "TDS", key: "tds" },
    { label: "Surcharge", key: "surcharge" },
    { label: "Education Cess.", key: "eduCess" },
    { label: "Total Tax Collected", key: "" },
    { label: "Total Tax Deposited", key: "totalTaxDeposited" },
    { label: "Date of Collected", key: "" },
    { label: "Total Value of Purchase", key: "dateOfPayment" },
    { label: "Rate at which Tax Collected", key: "rateAtWhichTaxCollected" },
    { label: "Reason for Non Collection", key: "" },
    { label: "Section / Collection Code", key: "sectionCode" },
    { label: "Certificate Number  ", key: "certificateNumber" },
    { label: "Deductee is Non-Resident", key: "" },
    { label: "Permanent Establishment ", key: "" },
    { label: "Reason For NonCollection F or G", key: "" },
    { label: "if Answer to 681A is Yes Then Challan Number", key: "" },
    {
      label:
        "if Answer to 681A is Yes Then Date Of Payment Of TDS To Central Government",
      key: "",
    },
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
      id: 917297,
      challanHeading: "INTEREST_26Q",
      deducteeRefNo: "GA00014738",
      deducteeCode: "2",
      pan: "AAEFE9798B",
      name: "Mr. EXPRESS WHEELS AUTO SERVICES",
      sectionCode: "94C",
      dateOfPayment: "2024-03-27",
      amountPaid: 10670,
      tds: 213,
      surcharge: 123,
      eduCess: 123,
      totalTaxDeducted: 213,
      totalTaxDeposited: 213,
      dateOfDeduction: "2024-05-31",
      rateAtWhichTaxCollected: 223,
      remarksReason: 123,
      certificateNumber: 123,
      fy: "2023-24",
      quarter: "Q4",
      branchCode: "150000",
      accNo: 123,
      challanSrNo: 22,
      month: "MARCH",
      custVendId: "152651293",
      uniqueRefNo: 123,
      cashWithdrawal194N: 123,
      cashWithdrawal194N20Lto1Cr: 123,
      cashWithdrawal194N1Cr: 123,
      TAN: "PNET00060E",
      roCode: "150000",
      errorDescription: 123,
      warningDescription: 123,
      shortDeduction: 123,
      interestOnShortDeduction: 123,
      interestOnLatePayment: 123,
      interestOnLateDeduction: 123,
      resolved: false,
      comments: 123,
      deducteeSrNo: 29,
      tranAmt: 123,
      additionalDetail: 123,
      tan: "PNET00060E",
      remarks: 123,
    },
  ];

  return (
    <>
      <div className="rounded-md p-4 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
        <h1 className="ms-2 mb-5 text-2xl font-bold text-[var(--primary-color)]">
          Details of Form 27EQ Deductee
        </h1>

        <DetailGrid fields={fields} data={data[0]} columns={2} />
        <div className="flex justify-end gap-4 pr-5">
          <button className="cursor-pointer rounded-md bg-blue-600 p-2 px-4 font-semibold text-white">
            <i className="fa-solid fa-pen-to-square"></i>&nbsp; Edit
          </button>
          <button
            className="cursor-pointer rounded-md bg-red-600 p-2 px-4 font-semibold text-white"
            onClick={() => {
              navigate(-1);
            }}
          >
            <i className="fa-solid fa-reply-all"></i>&nbsp; Back
          </button>
        </div>
      </div>
    </>
  );
};

export default DetailForm27EQ;

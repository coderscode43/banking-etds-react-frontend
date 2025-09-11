import { DetailGrid } from "@/components/component/DetailGrid";
import { Navigate } from "react-router-dom";
import React from "react";

const DetailForm27Q = () => {
  const navigate = Navigate;
  const handleNavigateBack = navigate(-1);
  const fields = [
    {
      label: "Quarter",

      key: "quarter",
    },

    {
      label: "Grossing up Indicator",

      key: "grossingUpIndicator",
    },

    {
      label: "Month",

      key: "month",
    },

    {
      label: "No of certificate under section ",

      key: "",
    },

    {
      label: "Branch Code",

      key: "branchCode",
    },

    {
      label: "TDS Rate As Per It Acts",

      key: "tdsRateAsPerItActs",
    },

    {
      label: "RO Code",

      key: "roCode",
    },

    {
      label: "TAN",

      key: "tan",
    },

    {
      label: "Vend/Cust Id",

      key: "custVendId",
    },

    {
      label: "Vend/Nature Of Remittance",

      key: "natureOfRemittance",
    },

    {
      label: "Unique Ref No",

      key: "uniqueRefNo",
    },

    {
      label: "Unique Knowledge No.",

      key: "uniqueAcknowledgeNo",
    },

    {
      label: "Account Number",

      key: "accNo",
    },

    {
      label: "Country",

      key: "countryOfResidence",
    },

    {
      label: "Challan Heading",

      key: "challanHeading",
    },

    {
      label: "E-Mail",

      key: "emailId",
    },

    {
      label: "Deductee Reference No.",

      key: "deducteeRefNo",
    },

    {
      label: "Contact No.",

      key: "contactNoOfDeductee",
    },

    {
      label: "Deductee Code",

      key: "deducteeCode",
    },

    {
      label: "Address",

      key: "addressOfDeductee",
    },

    {
      label: "PAN",

      key: "pan",
    },

    {
      label: "Tax Identification Number  ",

      key: "taxIdentificationNo",
    },

    {
      label: "Name",

      key: "name",
    },

    {
      label: "Cash Withdrawl (194N)",

      key: "cashWithdrawal194N",
    },

    {
      label: "Section Code",

      key: "sectionCode",
    },

    {
      label: "Cash Withdrawl 194N(20L to 1cr) ",

      key: "cashWithdrawal194N20Lto1Cr",
    },

    {
      label: "Date of Payment",

      key: "dateOfPayment",
    },

    {
      label: "Cash Withdrawl 194N(>1cr)",

      key: "cashWithdrawal194N1Cr",
    },

    {
      label: "Paid Amount",

      key: "amountPaid",
    },

    {
      label: "Error Description",

      key: "errorDescription",
    },

    {
      label: "TDS",

      key: "tds",
    },

    {
      label: "Warning Description",

      key: "warningDescription",
    },

    {
      label: "Surcharge",

      key: "surcharge",
    },

    {
      label: "Short Deduction",
      key: "shortDeduction",
    },

    {
      label: "Education Cess.",

      key: "eduCess",
    },

    {
      label: "Interest on Short Deduction",

      key: "interestOnShortDeduction",
    },

    {
      label: "Total Tax Deducted",

      key: "totalTaxDeducted",
    },

    {
      label: "Interest on Late Payment",

      key: "interestOnLatePayment",
    },

    {
      label: "Total Tax Deposited",

      key: "totalTaxDeposited",
    },

    {
      label: "Interest on Late Deduction",

      key: "interestOnLateDeduction",
    },

    {
      label: "Date of Deduction",

      key: "dateOfDeduction",
    },

    {
      label: "Reason for non Deduction",

      key: "",
    },

    {
      label: "Reason for Non Collection",

      key: "",
    },

    {
      label: "Status ",

      key: "",
    },
  ];

  const data = [
    {
      id: 5481507,
      challanHeading: "Interest_27Q",
      deducteeRefNo: 123,
      deducteeCode: "02-INDIVIDUAL",
      pan: "AKHPJ5307L",
      name: "ISHU JOSHI",
      sectionCode: "195",
      dateOfPayment: "2023-04-30",
      amountPaid: "166.0JS:166",
      tds: "52.0JS:52",
      surcharge: "0.0JS:0",
      eduCess: "0.0JS:0",
      totalTaxDeducted: "52.0JS:52",
      totalTaxDeposited: "52.0JS:52",
      dateOfDeduction: "2023-04-30",
      rateAtWhichTaxCollected: 31.2,
      remarksReason: 123,
      grossingUpIndicator: "123",
      certificateNumber: 123,
      uniqueAcknowledgeNo: 123,
      countryOfResidence: "113-INDIA",
      emailId: 1223,
      contactNoOfDeductee: 123,
      addressOfDeductee: 123,
      taxIdentificationNo: 123,
      fy: "2023-24",
      quarter: "Q4",
      tdsRateAsPerItActs: "A-If TDS rate is as per Income Tax Act",
      natureOfRemittance: "27-INTEREST PAYMENT",
      branchCode: 4265,
      accNo: "2513613456",
      challanSrNo: 123,
      month: "JANUARY",
      custVendId: "82509532",
      uniqueRefNo: "KM73652431",
      cashWithdrawal194N: "132",
      cashWithdrawal194N20Lto1Cr: "123",
      cashWithdrawal194N1Cr: "123",
      TAN: "CALU00023C",
      roCode: "TXNRG,NROCU,TDA,,NRO",
      errorDescription: 123,
      warningDescription: 123,
      shortDeduction: "123",
      interestOnShortDeduction: "123",
      interestOnLatePayment: "123",
      interestOnLateDeduction: "123",
      resolved: false,
      comments: 123,
      deducteeSrNo: 10351,
      tranAmt: 123,
      additionalDetail: 123,
      tan: "CALU00023C",
      remarks: 123,
    },
  ];

  return (
    <>
      <div className="rounded-md p-4 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
        <h1 className="ms-2 mb-5 text-2xl font-bold text-[var(--primary-color)]">
          Details of Form 27Q Deductee
        </h1>

        <DetailGrid fields={fields} data={data[0]} columns={2} />
        <div className="flex justify-end gap-4 pr-5">
          <button className="cursor-pointer rounded-md bg-blue-600 p-2 px-4 font-semibold text-white">
            <i className="fa-solid fa-pen-to-square"></i>&nbsp; Edit
          </button>
          <button
            className="cursor-pointer rounded-md bg-red-600 p-2 px-4 font-semibold text-white"
            onClick={handleNavigateBack}
          >
            <i class="fa-solid fa-reply-all"></i>&nbsp; Back
          </button>
        </div>
      </div>
    </>
  );
};

export default DetailForm27Q;

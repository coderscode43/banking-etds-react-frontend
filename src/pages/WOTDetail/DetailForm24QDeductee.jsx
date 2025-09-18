import common from "@/common/common";
import { useEffect, useState } from "react";
import { DetailGrid } from "@/components/component/DetailGrid";
import { useNavigate, useParams } from "react-router-dom";

const DetailForm24QDeductee = () => {
  const entity = "form24QDeductee";
  
  const navigate = useNavigate();
  const { fy, branchCode, id } = useParams();

  const [detailGridData, setDetailGridData] = useState({});

  useEffect(() => {
    const fetchDetailGridData = async () => {
      try {
        const response = await common.getDetailListData(
          entity,
          fy,
          branchCode,
          id
        );
        setDetailGridData(response.data.deductee || {});
      } catch (error) {
        console.error("Error fetching list data:", error);
      }
    };
    fetchDetailGridData();
  }, [fy, branchCode, id]);

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
    {
      label: "Status",
      key: "resolved",
      formatter: (value) =>
        value === true || value === "true" ? "Resolved" : "Not Resolved",
    },
  ];

  return (
    <>
      <div className="rounded-md p-4 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
        <h1 className="ms-2 mb-5 text-2xl font-bold text-[var(--primary-color)]">
          Details Form 24Q Deductee
        </h1>

        <DetailGrid fields={fields} data={detailGridData} columns={2} />

        <div className="mt-5 flex justify-end gap-4 pr-5">
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

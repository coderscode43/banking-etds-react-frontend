import common from "@/common/common";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailGrid } from "@/components/component/DetailGrid";
import UpdateForm26QDeducteeModal from "@/components/modals/UpdateForm26QDeducteeModal";

const DetailForm26Q = () => {
  const entity = "form26QDeductee";

  const navigate = useNavigate();
  const { fy, branchCode, id } = useParams();

  const [detailGridData, setDetailGridData] = useState({});

  useEffect(() => {
    const fetchDetailListData = async () => {
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
    fetchDetailListData();
  }, [branchCode, fy, id]);

  const fields = [
    { label: "Quarter", key: "quarter" },
    { label: "Month", key: "month" },
    { label: "Branch Code", key: "branchCode" },
    { label: "Transaction ID", key: "custVendId" },
    { label: "RO Code", key: "roCode" },
    { label: "TAN", key: "tan" },
    { label: "Unique Ref No", key: "uniqueRefNo" },
    { label: "Account No", key: "accNo" },
    { label: "Challan Heading", key: "challanHeading" },
    { label: "Deductee Code", key: "deducteeCode" },
    { label: "PAN of the Deductee", key: "pan" },
    { label: "Name of the Deductee", key: "name" },
    { label: "Section Code", key: "sectionCode" },
    { label: "Date of Payment", key: "dateOfPayment" },
    { label: "Amount Paid", key: "amountPaid" },
    { label: "TDS", key: "tds" },
    { label: "Surcharge", key: "surcharge" },
    { label: "Education Cess", key: "eduCess" },
    { label: "Total Tax Deducted", key: "totalTaxDeducted" },
    { label: "Total Tax Deposited", key: "totalTaxDeposited" },
    { label: "Date of Deduction ", key: "dateOfDeduction" },
    { label: "Rate at which Tax Deducted", key: "rate_at_which_tax_deducted" },
    { label: "Short Deduction", key: "shortDeduction" },
    { label: "Certificate Number  ", key: "certificateNumber" },
    { label: "Cash Withdrawl (194N) Description", key: "cashWithdrawal194N" },
    {
      label: "Cash Withdrawl 194N(20L to 1cr)",
      key: "cashWithdrawal194N20Lto1Cr",
    },
    { label: "Cash Withdrawl 194N(>1cr)", key: "cashWithdrawal194N1Cr" },
    { label: "Error Description", key: "errorDescription" },
    { label: "Warning  Description", key: "warningDescription" },
    { label: "Interest On Short Deduction", key: "interestOnShortDeduction" },
    { label: "Interest On Late Payment  ", key: "interestOnLatePayment" },
    { label: "Interest On Late Deduction   ", key: "interestOnLateDeduction" },
    { label: "Status ", key: "" },
  ];

  return (
    <>
      <div className="rounded-md p-4 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
        <h1 className="ms-2 mb-5 text-2xl font-bold text-[var(--primary-color)]">
          Details of Form 26Q Deductee
        </h1>

        <DetailGrid fields={fields} data={detailGridData} columns={2} />
        <div className="flex justify-end gap-4 pr-5">
          <UpdateForm26QDeducteeModal />
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

export default DetailForm26Q;

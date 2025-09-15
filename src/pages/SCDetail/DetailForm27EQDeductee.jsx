import common from "@/common/common";
import { DetailGrid } from "@/components/component/DetailGrid";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UpdateForm27EQDeducteeModal from "@/components/modals/UpdateForm27EQDeducteeModal";

const DetailForm27EQDeductee = () => {
  const entity = "form27EQDeductee";

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
    { label: "Vend/Cust Id", key: "custVendId" },
    { label: "RO Code", key: "roCode" },
    { label: "TAN", key: "tan" },
    { label: "Unique Ref No", key: "uniqueRefNo" },
    { label: "Account Number", key: "accNo" },
    { label: "Challan Heading", key: "challanHeading" },
    { label: "Party Reference No.", key: "deducteeRefNo" },
    { label: "Party Code", key: "deducteeCode" },
    { label: "PAN of the Party", key: "pan" },
    { label: "Name of the Party", key: "name" },
    { label: "Amount Receipt/Debited", key: "amountPaid" },
    { label: "Date of Received/Debited", key: "dateOfDeduction" },
    { label: "TDS", key: "tds" },
    { label: "Surcharge", key: "surcharge" },
    { label: "Education Cess.", key: "eduCess" },
    { label: "Total Tax Collected", key: "totalTaxDeducted" },
    { label: "Total Tax Deposited", key: "totalTaxDeposited" },
    { label: "Date of Collected", key: "dateOfPayment" },
    { label: "Total Value of Purchase", key: "amountPaid" },
    { label: "Rate at which Tax Collected", key: "rateAtWhichTaxCollected" },
    { label: "Reason for Non Collection", key: "remarksReason" },
    { label: "Section / Collection Code", key: "sectionCode" },
    { label: "Certificate Number  ", key: "certificateNumber" },
    { label: "Deductee is Non-Resident", key: "" }, // no data key
    { label: "Permanent Establishment ", key: "" }, // no data key
    { label: "Reason For NonCollection F or G", key: "" }, // no data key
    { label: "if Answer to 681A is Yes Then Challan Number", key: "" }, // no data key
    {
      label:
        "if Answer to 681A is Yes Then Date Of Payment Of TDS To Central Government",
      key: "",
    }, // no data key
    { label: "Error Description", key: "errorDescription" },
    { label: "Warning Description", key: "warningDescription" },
    { label: "Short Deduction", key: "shortDeduction" },
    { label: "Interest On Short Deduction", key: "interestOnShortDeduction" },
    { label: "Interest On Late Payment", key: "interestOnLatePayment" },
    { label: "Interest On Late Deduction", key: "interestOnLateDeduction" },
    { label: "Status ", key: "status" },
  ];

  return (
    <>
      <div className="rounded-md p-4 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
        <h1 className="ms-2 mb-5 text-2xl font-bold text-[var(--primary-color)]">
          Details of Form 27EQ Deductee
        </h1>

        <DetailGrid fields={fields} data={detailGridData} columns={2} />
        <div className="flex justify-end gap-4 pr-5">
          <UpdateForm27EQDeducteeModal />
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

export default DetailForm27EQDeductee;

import common from "@/common/common";
import { DetailGrid } from "@/components/component/DetailGrid";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UpdateForm27QDeducteeModal from "@/components/modals/UpdateForm27QDeducteeModal";
import DynamicTableApproveReject from "@/components/tables/DynamicTableApproveReject";
import { date, statusFormatter } from "@/lib/utils";

const DetailForm27QDeductee = () => {
  const entity = "form27QDeductee";

  const navigate = useNavigate();
  const { fy, branchCode, id } = useParams();

  const [detailGridData, setDetailGridData] = useState({});
  const [detailListData, setDetailListData] = useState([]);

  useEffect(() => {
    const fetchDetailListData = async () => {
      try {
        const response = await common.getDetailListData(
          entity,
          fy,
          branchCode,
          id
        );
        setDetailListData(response.data.remarks || []);
        setDetailGridData(response.data.deductee || {});
      } catch (error) {
        console.error("Error fetching list data:", error);
      }
    };
    fetchDetailListData();
  }, [branchCode, fy, id]);

  const fields = [
    { label: "Quarter", key: "quarter" },
    {
      label: "Grossing up Indicator",
      key: "grossingUpIndicator",
      formatter: date,
    },
    { label: "Month", key: "month" },
    { label: "No of certificate under section ", key: "certificateNumber" },
    { label: "Branch Code", key: "branchCode" },
    { label: "TDS Rate As Per It Acts", key: "tdsRateAsPerItActs" },
    { label: "RO Code", key: "roCode" },
    { label: "TAN", key: "tan" },
    { label: "Vend/Cust Id", key: "custVendId" },
    { label: "Vend/Nature Of Remittance", key: "natureOfRemittance" },
    { label: "Unique Ref No", key: "uniqueRefNo" },
    { label: "Unique Knowledge No.", key: "uniqueAcknowledgeNo" },
    { label: "Account Number", key: "accNo" },
    { label: "Country", key: "countryOfResidence" },
    { label: "Challan Heading", key: "challanHeading" },
    { label: "E-Mail", key: "emailId" },
    { label: "Deductee Reference No.", key: "deducteeRefNo" },
    { label: "Contact No.", key: "contactNoOfDeductee" },
    { label: "Deductee Code", key: "deducteeCode" },
    { label: "Address", key: "addressOfDeductee" },
    { label: "PAN", key: "pan" },
    { label: "Tax Identification Number  ", key: "taxIdentificationNo" },
    { label: "Name", key: "name" },
    { label: "Cash Withdrawl (194N)", key: "cashWithdrawal194N" },
    { label: "Section Code", key: "sectionCode" },
    {
      label: "Cash Withdrawl 194N(20L to 1cr) ",
      key: "cashWithdrawal194N20Lto1Cr",
    },
    { label: "Date of Payment", key: "dateOfPayment", formatter: date },
    { label: "Cash Withdrawl 194N(>1cr)", key: "cashWithdrawal194N1Cr" },
    { label: "Paid Amount", key: "amountPaid" },
    { label: "Error Description", key: "errorDescription" },
    { label: "TDS", key: "tds" },
    { label: "Warning Description", key: "warningDescription" },
    { label: "Surcharge", key: "surcharge" },
    { label: "Short Deduction", key: "shortDeduction" },
    { label: "Education Cess.", key: "eduCess" },
    { label: "Interest on Short Deduction", key: "interestOnShortDeduction" },
    { label: "Total Tax Deducted", key: "totalTaxDeducted" },
    { label: "Interest on Late Payment", key: "interestOnLatePayment" },
    { label: "Total Tax Deposited", key: "totalTaxDeposited" },
    { label: "Interest on Late Deduction", key: "interestOnLateDeduction" },
    { label: "Date of Deduction", key: "dateOfDeduction", formatter: date },
    { label: "Reason for non Deduction", key: "remarksReason" },
    { label: "Reason for Non Collection", key: "remarks" },
    {
      label: "Status",
      key: "resolved",
      formatter: (value) => statusFormatter(value, true),
    },
  ];

  const tableHead = [
    { key: "srNo", label: "Sr.No" },
    { key: "addedby", label: "Added By" },
    { key: "remark", label: "Remark" },
    { key: "datetime", label: "Date of Remark", formatter: date },
    { key: "status", label: "Status" },
    { key: "approvedon", label: "Approved On", formatter: date },
    { key: "approvedby", label: "Approved By" },
    { key: "action", label: "Action" },
  ];

  const tableData = detailListData?.map((data, index) => ({
    srNo: index + 1,
    ...data,
  }));

  return (
    <>
      <div className="rounded-md p-4 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
        <h1 className="ms-2 mb-5 text-2xl font-bold text-[var(--primary-color)]">
          Details of Form 27Q Deductee
        </h1>

        <DetailGrid fields={fields} data={detailGridData} columns={2} />
        <div className="mt-5 flex justify-end gap-4 pr-5">
          <UpdateForm27QDeducteeModal
            data={detailGridData}
            initialEntity={"deducteeremark"}
          />
          <button
            className="cursor-pointer rounded-md bg-red-600 p-2 px-4 font-semibold text-white"
            onClick={() => navigate(-1)}
          >
            <i className="fa-solid fa-reply-all"></i>&nbsp; Back
          </button>
        </div>
        <div className="mt-5">
          <DynamicTableApproveReject
            tableHead={tableHead}
            tableData={tableData}
            pageType={"detail"}
            layoutType={"sc"}
            formTitle={"27Q"}
            entityName={"form27QDeductee"}
          />
        </div>
      </div>
    </>
  );
};

export default DetailForm27QDeductee;

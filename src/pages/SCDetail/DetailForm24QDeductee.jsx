import common from "@/common/common";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailGrid } from "@/components/component/DetailGrid";
import { date, dateWithTime, statusFormatter } from "@/lib/utils";
import DynamicTableApproveReject from "@/components/tables/DynamicTableApproveReject";
import UpdateForm24QDeducteeModal from "@/components/modals/UpdateForm24QDeducteeModal";

const DetailForm24QDeductee = () => {
  const entity = "form24QDeductee";

  const navigate = useNavigate();
  const { fy, branchCode, id } = useParams();

  const [loading, setLoading] = useState(true);
  const [detailGridData, setDetailGridData] = useState({});
  const [detailListData, setDetailListData] = useState([]);

  useEffect(() => {
    const fetchDetailListData = async () => {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchDetailListData();
  }, [branchCode, fy, id]);

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
    { label: "Date of Payment", key: "dateOfPayment", formatter: date },
    { label: "Date of Deduction", key: "dateOfDeduction", formatter: date },
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
    { key: "datetime", label: "Date of Remark", formatter: dateWithTime },
    { key: "status", label: "Status" },
    { key: "approvedon", label: "Approved On", formatter: dateWithTime },
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
          Details of Form 24Q Deductee
        </h1>

        <DetailGrid fields={fields} data={detailGridData} columns={2} />

        <div className="mt-5 flex justify-end gap-4 pr-5">
          <UpdateForm24QDeducteeModal
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
            formTitle={"24Q"}
            entity={entity}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
};

export default DetailForm24QDeductee;

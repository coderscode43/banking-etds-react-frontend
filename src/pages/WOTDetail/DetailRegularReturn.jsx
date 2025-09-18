import common from "@/common/common";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailGrid } from "@/components/component/DetailGrid";
import DynamicTableAction from "@/components/tables/DynamicTableAction";
import AddRegularReturnResponsesWOTModal from "@/components/modals/AddRegularReturnResponsesWOTModal";

const DetailRegularReturn = () => {
  const entity = "regularReturn";
  
  const navigate = useNavigate();
  const { fy, branchCode, id } = useParams();

  const [detailGridData, setDetailGridData] = useState({});
  const [detailListData, setDetailListData] = useState([]);

  useEffect(() => {
    const fetchDetailGridData = async () => {
      try {
        const response = await common.getDetailListData(
          entity,
          fy,
          branchCode,
          id
        );
        setDetailGridData(response.data.details || {});
        setDetailListData(response.data.remarks || []);
      } catch (error) {
        console.log("Error fetching list data:", error);
      }
    };
    fetchDetailGridData();
  }, [fy, branchCode, id]);

  const fields = [
    { label: "Financial Year", key: "fy" },
    { label: "Tan", key: "tan" },
    { label: "Quarter", key: "quarter" },
    { label: "Form", key: "form" },
    {
      label: "Added On",
      key: "addedOn",
      formatter: (d) => (d ? new Date(d).toLocaleDateString("en-GB") : ""),
    },
    { label: "Added By", key: "addedBy" },

    { label: "Latest Response", key: "latestRemark" },
    { label: "Status", key: "status" },
    {
      label: "Return Filing Date",
      key: "returnFilingDate",
      formatter: (d) => (d ? new Date(d).toLocaleDateString("en-GB") : ""),
    },
  ];

  const tableHead = [
    { key: "srNo", label: "Sr.No" },
    { key: "remark", label: "Correction Response" },
    { key: "remarkStatus", label: "Status" },
    { key: "supportingDocName", label: "Supporting Document Name" },
    { key: "addedBy", label: "Added By" },
    {
      key: "addedOn",
      label: "Added On",
      formatter: (d) => (d ? new Date(d).toLocaleDateString("en-GB") : ""),
    },
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
          Regular Return
        </h1>

        <DetailGrid fields={fields} data={detailGridData} columns={2} />

        <div className="mt-5 mb-5 flex justify-end gap-4 pr-5">
          <AddRegularReturnResponsesWOTModal />
          <button
            className="cursor-pointer rounded-md bg-red-600 p-2 px-4 font-semibold text-white"
            onClick={() => navigate(-1)}
          >
            <i className="fa-solid fa-reply-all"></i>&nbsp; Back
          </button>
        </div>

        <DynamicTableAction
          entity={entity}
          tableHead={tableHead}
          tableData={tableData}
        />
      </div>
    </>
  );
};

export default DetailRegularReturn;

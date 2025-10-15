import common from "@/common/common";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailGrid } from "@/components/component/DetailGrid";
import AddRegularReturnResponseModal from "@/components/modals/AddRegularReturnResponseModal";
import DynamicTableDownload from "@/components/tables/DynamicTableDownload";
import { useContext } from "react";
import statusContext from "@/context/statusContext";
import { errorMessage } from "@/lib/utils";

const DetailRegularReturn = () => {
  const entity = "regularReturn";
  const page = "regularReturnRemark";

  const navigate = useNavigate();
  const { fy, branchCode, id } = useParams();
  const { showError } = useContext(statusContext);

  const [loading, setLoading] = useState(true);
  const [detailGridData, setDetailGridData] = useState({});
  const [detailListData, setDetailListData] = useState([]);

  useEffect(() => {
    const fetchDetailListData = async () => {
      try {
        setLoading(true);
        const response = await common.getDetailListDataSC(entity, id);

        setDetailListData(response.data.RRR || []);
        setDetailGridData(response.data.RR || {});
      } catch (error) {
        console.error("Error fetching list data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailListData();
  }, [branchCode, fy, id]);

  const fields = [
    { label: "Financial Year  ", key: "fy" },
    { label: "TAN", key: "tan" },
    { label: "Quarter", key: "quarter" },
    { label: "Form", key: "form" },
    { label: "Added On", key: "addedOn" },
    { label: "Added By", key: "addedBy" },
    { label: "Latest Response", key: "latestRemark" },
    {
      label: "Status",
      key: "resolved",
      formatter: (value) =>
        value === true || value === "true" ? "Resolved" : "Not Resolved",
    },
  ];

  const tableHead = [
    { label: "Sr.No", key: "srNo" },
    { label: "Correction Response", key: "remark" },
    { label: "Status", key: "remarkStatus" },
    { label: "Supporting Document Name", key: "supportingDocName" },
    { label: "Added By", key: "addedBy" },
    { label: "Added On", key: "addedOn" },
    { label: "Action", key: "download" },
  ];

  const tableData = detailListData.map((data, index) => ({
    srNo: index + 1,
    ...data,
  }));

  const handleDownload = async (id) => {
    try {
      await common.getDownloadFile(page, id);
    } catch (error) {
      showError(
        `Can not download.
         ${error?.response?.data?.entityName}  
         ${errorMessage(error)}`
      );
    }
  };

  return (
    <>
      <div className="rounded-md p-4 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
        <h1 className="ms-2 mb-5 text-2xl font-bold text-[var(--primary-color)]">
          Regular Return
        </h1>

        <DetailGrid fields={fields} data={detailGridData} columns={2} />
        <div className="mt-5 flex justify-end gap-4 pr-5">
          <AddRegularReturnResponseModal
            regularReturnId={id}
            status={detailGridData.status}
          />
          <button
            className="cursor-pointer rounded-md bg-red-600 px-4 py-2 font-semibold text-white"
            onClick={() => navigate(-1)}
          >
            <i className="fa-solid fa-reply-all"></i>&nbsp; Back
          </button>
        </div>
        <div className="mt-5">
          <DynamicTableDownload
            tableHead={tableHead}
            tableData={tableData}
            downloadKey="supportingDocName"
            handleDownload={handleDownload}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
};

export default DetailRegularReturn;

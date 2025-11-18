import common from "@/common/common";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DetailGrid } from "@/components/component/DetailGrid";
import EditBranchDetailsModal from "@/components/modals/EditBranchDetailsModal";

const DetailBranch = () => {
  const entity = "branch";

  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { rowID } = location.state || {};

  const [detailData, setDetailData] = useState({});

  useEffect(() => {
    try {
      setLoading(true);
      const fetchDetailData = async () => {
        const response = await common.getDetailListDataSC(entity, rowID);
        setDetailData(response.data);
      };
      fetchDetailData();
    } catch (error) {
      console.error("Error fetching detail data:", error);
    } finally {
      setLoading(false);
    }
  }, [rowID]);

  const fields = [
    { label: "RO Code", key: "roCode" },
    { label: "Branch Code", key: "branchCode" },
    { label: "RO Name", key: "branchName" },
    { label: "RO Email", key: "branchEmail" },
    { label: "RO Contact No", key: "branchContactNo" },
    { label: "RO Address", key: "branchAddress" },
    { label: "RO Pincode", key: "branchPinCode" },
    { label: "RO State", key: "branchState" },
  ];

  const data = [detailData];

  return (
    <>
      <div className="rounded-md border-gray-100 p-4 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
        <h1 className="ms-2 mb-5 text-2xl font-bold text-[var(--primary-color)]">
          RO Details
        </h1>

        <DetailGrid
          fields={fields}
          data={data[0]}
          columns={2}
          loading={loading}
        />
        <div className="mt-3 flex justify-end gap-4 pr-5">
          <EditBranchDetailsModal data={detailData} entity={entity} />
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

export default DetailBranch;

import { useNavigate } from "react-router-dom";
import { DetailGrid } from "@/components/component/DetailGrid";
import EditBranchDetails from "@/components/modals/EditBranchDetailsModal";

const DetailBranch = () => {
  const navigate = useNavigate();

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

  const data = [
    {
      id: 2285929,
      roCode: "100",
      branchCode: 1000,
      branchName: "tset",
      branchEmail: "tset@gmail.com",
      branchContactNo: "9874561230",
      branchAddress: "kkkk",
      branchPinCode: "400091",
      branchState: "Maharashtra-19",
      tan: 123,
    },
  ];

  return (
    <>
      <div className="rounded-md p-4 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
        <h1 className="ms-2 mb-5 text-2xl font-bold text-[var(--primary-color)]">
          RO Details
        </h1>

        <DetailGrid fields={fields} data={data[0]} columns={2} />
        <div className="mt-3 flex justify-end gap-4 pr-5">
          {/* <button className="cursor-pointer rounded-md bg-blue-600 p-2 px-4 font-semibold text-white">
            <i className="fa-solid fa-pen-to-square"></i>&nbsp; Edit
          </button> */}
          <EditBranchDetails />
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

export default DetailBranch;

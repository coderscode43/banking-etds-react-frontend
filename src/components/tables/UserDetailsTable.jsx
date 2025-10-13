import common from "@/common/common";
import statusContext from "@/context/statusContext";
import { errorMessage } from "@/lib/utils";
import { useContext, useState } from "react";
import TableLoadingSkeleton from "../component/TableLoadingSkeleton";
import DynamicModal from "../modals/DynamicModal";

const UserDetailsTable = ({
  tableHead,
  tableData,
  entity,
  loading = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeID, setEmployeeID] = useState("");
  const { showSuccess, showError } = useContext(statusContext);

  const closeModal = () => setIsModalOpen(false);

  const handleDelete = async (employeeId) => {
    try {
      const response = await common.getDeleteUserDetails(entity, employeeId);
      setIsModalOpen(false);
      showSuccess(response.data.successMsg);
    } catch (error) {
      showError(
        `Can not save ${error?.response?.data?.entityName}  ${errorMessage(error)}`
      );
      console.log(error);
    }
  };

  // Skeleton loader rows count (adjust as needed)
  const skeletonRows = 100;

  return (
    <>
      <div className="relative w-full">
        <div className="w-full overflow-clip rounded-md border border-gray-200">
          <table className="w-full text-[14px]">
            <thead className="bg-[var(--secondary-color)]">
              <tr className="border-[1.5px] border-[var(--secondary-color)]">
                {tableHead.map(({ label }, index) => (
                  <th
                    key={index}
                    className={`sticky top-[56px] bg-[var(--secondary-color)] p-2 whitespace-nowrap text-white ${
                      index === tableHead.length - 1
                        ? "border-[var(--secondary-color)]"
                        : "border-gray-300"
                    } z-0 border-r-[1.5px]`}
                  >
                    <div className="block min-w-[70px] resize-x overflow-auto">
                      {label}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <TableLoadingSkeleton
                  columns={tableHead.length}
                  rows={skeletonRows}
                />
              ) : tableData.length === 0 ? (
                <tr>
                  <td
                    colSpan={tableHead.length}
                    className="p-4 text-center text-[16px] font-semibold text-red-500"
                  >
                    No Data Found
                  </td>
                </tr>
              ) : (
                <>
                  {tableData.map((data, index) => (
                    <tr
                      key={index}
                      className="cursor-pointer text-center hover:bg-gray-100"
                    >
                      {tableHead.map(({ key }, colIndex) => (
                        <td
                          key={colIndex}
                          className="max-w-[70px] min-w-[100px] overflow-hidden border-[1.5px] border-gray-300 p-2 text-ellipsis whitespace-nowrap"
                        >
                          {key === "action" ? (
                            <i
                              onClick={() => {
                                setEmployeeID(data.employeeId);
                                setIsModalOpen(true);
                              }}
                              className="fa-solid fa-trash text-md rounded-sm bg-blue-600 px-3.5 py-[13px] text-white"
                            ></i>
                          ) : (
                            (data[key] ?? " ")
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Render the modal only when open */}
      {isModalOpen && (
        <DynamicModal
          title="Are you sure?"
          description="Do you really want to delete this User?"
          type="delete"
          isModalOpen={() => setIsModalOpen(true)}
          closeModal={closeModal}
          handler={() => handleDelete(employeeID)}
        />
      )}
    </>
  );
};

export default UserDetailsTable;

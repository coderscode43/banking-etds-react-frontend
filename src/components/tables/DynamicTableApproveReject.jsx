import { useState } from "react";
import { useParams } from "react-router-dom";
import TableLoadingSkeleton from "../component/TableLoadingSkeleton";
import { TooltipWrapper } from "../component/Tooltip";
import ApproveRejectDeducteeModalSC from "../modals/ApproveRejectDeducteeModalSC";

const DynamicTableApproveReject = ({
  entity,
  tableHead,
  tableData,
  formTitle,
  loading = false,
}) => {
  const { id } = useParams();

  const [openModal, setOpenModal] = useState(false);
  const [rowData, setRowData] = useState({});

  // Skeleton loader rows count (adjust as needed)
  const skeletonRows = 100;

  const closeModal = () => setOpenModal(false);

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
                      style={{ backgroundColor: data.color || "transparent" }}
                      className={`cursor-pointer text-center hover:bg-gray-100`}
                    >
                      {tableHead.map(({ key, formatter }, colIndex) => (
                        <td
                          key={colIndex}
                          className="whitespace-wrap border-[1.5px] border-gray-300 p-2 text-ellipsis"
                        >
                          {key === "action" && data.status === "Pending" ? (
                            <TooltipWrapper tooltipText="Approve">
                              <i
                                onClick={() => {
                                  setRowData(data);
                                  setOpenModal(true);
                                }}
                                className="fa-solid fa-file-pen text-lg"
                              ></i>
                            </TooltipWrapper>
                          ) : formatter ? (
                            formatter(data[key])
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
      <ApproveRejectDeducteeModalSC
        isModalOpen={openModal}
        closeModal={closeModal}
        formTitle={formTitle}
        rowData={rowData}
        deducteeId={id}
        entity={entity}
        loading={loading}
      />
    </>
  );
};

export default DynamicTableApproveReject;

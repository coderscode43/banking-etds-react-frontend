import { useNavigate, useParams } from "react-router-dom";
import StickyScrollbarWrapper from "../component/StickyScrollbarWrapper";
import TableLoadingSkeleton from "../component/TableLoadingSkeleton";
import { TooltipWrapper } from "../component/Tooltip";

const DynamicTableActionTotal = ({
  entity,
  layoutType,
  tableHead,
  tableData,
  loading = false,
  autoResize,
}) => {
  const { fy } = useParams();
  const navigate = useNavigate();

  // Key of the column to total — adjust as needed
  const totalKey = "amount";

  // Calculate total sum for that key
  const totalValue = tableData.reduce(
    (sum, row) => sum + (Number(row[totalKey]) || 0),
    0
  );

  // Skeleton loader rows count (adjust as needed)
  const skeletonRows = 100;

  return (
    <div className="relative w-full">
      <div className="w-full overflow-clip rounded-md border border-gray-200">
        <StickyScrollbarWrapper>
          <table className="w-full text-[14px]">
            <thead
              className="bg-[var(--secondary-color)]"
              style={{
                zIndex: "9",
                position: "sticky",
                top: "56px",
              }}
            >
              <tr>
                {tableHead.map(({ label }, index) => (
                  <th
                    key={index}
                    className={`z-0 border-r-[1.5px] border-l-[1.5px] bg-[var(--secondary-color)] p-2 whitespace-nowrap text-white ${
                      index === 0
                        ? "border-l-[var(--secondary-color)]" // left border on first th
                        : "border-l-gray-300"
                    } ${
                      index === tableHead.length - 1
                        ? "border-r-[var(--secondary-color)]" // right border on last th
                        : "border-r-gray-300"
                    } `}
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
                      onDoubleClick={(e) => {
                        // Check if the clicked column is the last one
                        if (e.target.cellIndex === tableHead.length - 1) {
                          return; // Do nothing if it's the last column
                        }
                        if (layoutType === "sc") {
                          navigate(
                            `/home/detail/${entity}/${data.id}/${data.fy}/${data.branchCode}/detail${
                              entity.charAt(0).toUpperCase() + entity.slice(1)
                            }`
                          );
                        } else if (layoutType === "wot") {
                          navigate(
                            `/homeWOT/${data.branchCode}/${fy}/detail/${entity}/${data.id}/detail${
                              entity.charAt(0).toUpperCase() + entity.slice(1)
                            }`
                          );
                        }
                      }}
                    >
                      {tableHead.map(({ key, formatter }, colIndex) => (
                        <td
                          key={colIndex}
                          className={`border-[1.5px] border-gray-300 p-2 text-ellipsis whitespace-nowrap ${autoResize ? "w-auto" : "max-w-[110px] min-w-[20px] overflow-hidden"}`}
                        >
                          {/* Handle the action icon separately */}
                          {key === "action" ? (
                            <TooltipWrapper tooltipText="Detail">
                              <i
                                className="fa-solid fa-file-pen cursor-pointer text-lg"
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent double-click from firing
                                  if (layoutType === "sc") {
                                    navigate(
                                      `/home/detail/${entity}/${data.id}/${data.fy}/${data.branchCode}/detail${
                                        entity.charAt(0).toUpperCase() +
                                        entity.slice(1)
                                      }`
                                    );
                                  } else if (layoutType === "wot") {
                                    navigate(
                                      `/homeWOT/${data.branchCode}/${fy}/detail/${entity}/${data.id}/detail${
                                        entity.charAt(0).toUpperCase() +
                                        entity.slice(1)
                                      }`
                                    );
                                  }
                                }}
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

                  {/* Total Row */}
                  {/* Total Row with 2 columns (70% and 30%) */}
                  <tr className="bg-gray-50 text-center font-semibold">
                    <td
                      colSpan={tableHead.length - 1}
                      className="border-[1.5px] border-gray-300 p-2 text-center"
                    >
                      Total
                    </td>
                    <td
                      colSpan={1}
                      className="border-[1.5px] border-gray-300 p-2"
                    >
                      {totalValue}
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </StickyScrollbarWrapper>
      </div>
    </div>
  );
};

export default DynamicTableActionTotal;

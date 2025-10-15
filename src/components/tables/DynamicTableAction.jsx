import { useNavigate } from "react-router-dom";
import StickyScrollbarWrapper from "../component/StickyScrollbarWrapper";
import { TooltipWrapper } from "../component/Tooltip";
import TableLoadingSkeleton from "../component/TableLoadingSkeleton";

const DynamicTableAction = ({
  entity,
  layoutType,
  tableHead,
  tableData,
  autoResize,
  loading = false,
}) => {
  const navigate = useNavigate();

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
                  {loading ? (
                    <TableLoadingSkeleton
                      columns={tableHead.length}
                      rows={skeletonRows}
                    />
                  ) : (
                    tableData.map((data, index) => (
                      <tr
                        key={index}
                        // Correction Request color based on Data
                        style={{ backgroundColor: data.color || "transparent" }}
                        className={`cursor-pointer text-center hover:bg-gray-100`}
                        onDoubleClick={() => {
                          if (layoutType === "sc") {
                            navigate(
                              `/home/detail/${entity}/${data.id}/${data.fy}/${data.branchCode}/detail${
                                entity.charAt(0).toUpperCase() + entity.slice(1)
                              }`
                            );
                          } else if (layoutType === "wot") {
                            navigate(
                              `/homeWOT/${data.branchCode}/${data.fy}/detail/${entity}/${data.id}/detail${entity.charAt(0).toUpperCase() + entity.slice(1)}`
                            );
                          }
                        }}
                      >
                        {tableHead.map(({ key, formatter }, colIndex) => (
                          <td
                            key={colIndex}
                            className={`border-[1.5px] border-gray-300 p-2 text-ellipsis whitespace-nowrap ${
                              autoResize
                                ? "w-auto"
                                : "max-w-[110px] min-w-[20px] overflow-hidden"
                            } `}
                          >
                            {key === "action" ? (
                              <TooltipWrapper tooltipText="Detail">
                                <i className="fa-solid fa-file-pen text-lg"></i>
                              </TooltipWrapper>
                            ) : formatter ? (
                              formatter(data[key])
                            ) : (
                              (data[key] ?? " ")
                            )}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </>
              )}
            </tbody>
          </table>
        </StickyScrollbarWrapper>
      </div>
    </div>
  );
};

export default DynamicTableAction;

import React from "react";
import TableLoadingSkeleton from "../loader/TableLoadingSkeleton";
import StickyScrollbarWrapper from "../component/StickyScrollbarWrapper";

const DynamicTableDownload = ({
  tableHead,
  tableData,
  downloadKey = "download",
  handleDownload,
  loading = false,
}) => {
  // Skeleton loader rows count (adjust as needed)
  const skeletonRows = 10;

  return (
    <div className="relative w-full">
      <div className="w-full overflow-clip rounded-md border border-gray-200">
        <StickyScrollbarWrapper>
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
                      className={`text-center hover:bg-gray-100`}
                    >
                      {tableHead.map(({ key, formatter }, colIndex) => (
                        <td
                          key={colIndex}
                          className="w-auto border-[1.5px] border-gray-300 p-2 text-ellipsis"
                        >
                          {key === "download" ? (
                            data[downloadKey] ? (
                              <i
                                className="fa-solid fa-download cursor-pointer text-lg"
                                onClick={() => handleDownload(data.id)}
                              ></i>
                            ) : (
                              ""
                            )
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
        </StickyScrollbarWrapper>
      </div>
    </div>
  );
};

export default DynamicTableDownload;

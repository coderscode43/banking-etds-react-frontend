import StickyScrollbarWrapper from "../component/StickyScrollbarWrapper";
import TableLoadingSkeleton from "../component/TableLoadingSkeleton";
import { TooltipWrapper } from "@/components/component/Tooltip";
import { useNavigate } from "react-router-dom";

const DynamicTableCheckBoxAction = ({
  entity,
  tableHead,
  tableData,
  autoResize,
  selectedRows,
  setSelectedRows,
  setSelectedRowsData,
  loading = false,
}) => {
  const navigate = useNavigate();

  // Skeleton loader rows count (adjust as needed)
  const skeletonRows = 100;

  const isAllSelected =
    tableData.length > 0 && selectedRows.length === tableData.length;

  // Toggle all rows
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(tableData.map((_, index) => index));
    } else {
      setSelectedRows([]);
    }
  };

  // Toggle individual row
  const handleSelectRow = (index, data) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index]
    );

    setSelectedRowsData((prevData) => {
      const isAlreadySelected = prevData.some((row) => row.id === data.id);

      if (isAlreadySelected) {
        return prevData.filter((row) => row.id !== data.id);
      } else {
        if ("srNo" in data) {
          delete data.srNo;
          data.selected = true;
        }
        return [...prevData, data];
      }
    });
  };

  // Inject a checkbox into table head
  const enhancedTableHead = [
    {
      label: (
        <input
          type="checkbox"
          onChange={handleSelectAll}
          checked={isAllSelected}
        />
      ),
      key: "__checkbox__",
    },
    ...tableHead,
  ];

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
                {enhancedTableHead.map(({ label }, index) => (
                  <th
                    key={index}
                    className={`sticky top-[56px] bg-[var(--secondary-color)] p-2 whitespace-nowrap text-white ${
                      index === enhancedTableHead.length - 1
                        ? "border-[var(--secondary-color)]"
                        : "border-gray-300"
                    }${
                      index === 0
                        ? "border-l-[var(--secondary-color)]" // left on first th
                        : "border-l-gray-300"
                    }${
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
                    colSpan={enhancedTableHead.length}
                    className="p-4 text-center text-[16px] font-semibold text-red-500"
                  >
                    No Data Found
                  </td>
                </tr>
              ) : (
                tableData.map((data, index) => {
                  const isChecked = selectedRows.includes(index);
                  return (
                    <tr
                      key={index}
                      className={`cursor-pointer bg-white text-center ${isChecked ? "bg-blue-100" : ""}`}
                      onDoubleClick={(e) => {
                        // Check if the clicked column is the last one
                        if (
                          e.target.cellIndex ===
                          enhancedTableHead.length - 1
                        ) {
                          return; // Do nothing if it's the last column
                        }
                        navigate(
                          `/home/detail/${entity}/${data.id}/detail${
                            entity.charAt(0).toUpperCase() + entity.slice(1)
                          }`
                        );
                      }}
                    >
                      {/* Checkbox cell */}
                      <td className="border-[1.5px] border-gray-300 p-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleSelectRow(index, data)}
                        />
                      </td>

                      {/* Other cells */}
                      {tableHead.map(({ key, formatter }, colIndex) => (
                        <td
                          key={colIndex}
                          className={`border-[1.5px] border-gray-300 p-2 text-ellipsis whitespace-nowrap ${autoResize ? "w-auto" : "max-w-[110px] min-w-[20px] overflow-hidden"}`}
                        >
                          {key === "action" ? (
                            <TooltipWrapper tooltipText="Detail">
                              <i
                                className="fa-solid fa-file-pen cursor-pointer text-lg"
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevents triggering row double-click
                                  if (entity !== "branch") {
                                    navigate(
                                      `/home/detail/${entity}/${data.id}/detail${
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
                  );
                })
              )}
            </tbody>
          </table>
        </StickyScrollbarWrapper>
      </div>
    </div>
  );
};

export default DynamicTableCheckBoxAction;

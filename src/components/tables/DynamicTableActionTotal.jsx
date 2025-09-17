import { useNavigate, useParams } from "react-router-dom";
import { TooltipWrapper } from "../component/Tooltip";

const DynamicTableAction = ({
  entity,
  layoutType,
  tableHead,
  tableData,
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

  return (
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
            {tableData.length === 0 ? (
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
                    onDoubleClick={() => {
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
                        className={`border-[1.5px] border-gray-300 p-2 text-ellipsis whitespace-nowrap ${autoResize ? "w-auto" : "max-w-[60px] min-w-[70px] overflow-hidden"}`}
                      >
                        {key === "action" ? (
                          <TooltipWrapper tooltipText="Action">
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
      </div>
    </div>
  );
};

export default DynamicTableAction;

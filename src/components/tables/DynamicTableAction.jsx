import { useNavigate } from "react-router-dom";

const DynamicTableAction = ({ entity, tableHead, tableData }) => {
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
          <thead className="bg-[var(--secondary-color)] whitespace-nowrap text-white">
            <tr className="border-[1.5px] border-[var(--secondary-color)]">
              {tableHead.map(({ label }, index) => (
                <th
                  key={index}
                  className={`p-2 ${
                    index === tableHead.length - 1
                      ? "border-r-[1.5px] border-[var(--secondary-color)]"
                      : "border-r-[1.5px] border-gray-300"
                  }`}
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
                  No data found
                </td>
              </tr>
            ) : (
              <>
                {tableData.map((data, index) => (
                  <tr
                    key={index}
                    className="cursor-pointer text-center hover:bg-gray-100"
                    onDoubleClick={() => {
                      if (entity !== "branch") {
                        navigate(
                          `/home/detail/${entity}/${data.id}/${data.fy}/${data.branchCode}/detail${
                            entity.charAt(0).toUpperCase() + entity.slice(1)
                          }`
                        );
                      }
                    }}
                  >
                    {tableHead.map(({ key }, colIndex) => (
                      <td
                        key={colIndex}
                        className="max-w-[70px] min-w-[100px] overflow-hidden border-[1.5px] border-gray-300 p-2 text-ellipsis whitespace-nowrap"
                      >
                        {key === "action" ? (
                          <i className="fa-solid fa-file-pen text-lg"></i>
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

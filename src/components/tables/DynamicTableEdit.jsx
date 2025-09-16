import { useNavigate } from "react-router-dom";

const DynamicTableEdit = ({ entity, tableHead, tableData }) => {
  const navigate = useNavigate();

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
                  No data found
                </td>
              </tr>
            ) : (
              tableData.map((data, index) => (
                <tr
                  key={index}
                  className="cursor-pointer text-center hover:bg-gray-100"
                  onDoubleClick={(e) => {
                    // Check if the clicked column is the last one
                    if (e.target.cellIndex === tableHead.length - 1) {
                      return; // Do nothing if it's the last column
                    }
                    if (entity === "branch") {
                      navigate(`/homeWOT/${data.branchCode}/2025-26/homepage`);
                    }
                  }}
                >
                  {tableHead.map(({ key, formatter }, colIndex) => (
                    <td
                      key={colIndex}
                      className="max-w-[70px] min-w-[100px] overflow-hidden border-[1.5px] border-gray-300 p-2 text-ellipsis whitespace-nowrap"
                    >
                      {key == "branchEdit" ? (
                        <i
                          onClick={() => {
                            navigate(
                              `/home/detail/${entity}/${data.id}/detail${
                                entity.charAt(0).toUpperCase() + entity.slice(1)
                              }`
                            );
                          }}
                          className="fa-solid fa-pen-to-square text-lg"
                        ></i>
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DynamicTableEdit;

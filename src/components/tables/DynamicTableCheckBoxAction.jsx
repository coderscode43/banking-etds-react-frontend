import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DynamicTableCheckBoxAction = ({ entity, tableHead, tableData }) => {
  const navigate = useNavigate();

  const [selectedRows, setSelectedRows] = useState([]);

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
  const handleSelectRow = (index) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index]
    );
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
      <div className="w-full overflow-clip rounded-md">
        <table className="w-full text-[14px]">
          <thead className="bg-[var(--secondary-color)] whitespace-nowrap text-white">
            <tr className="border-[1.5px] border-[var(--secondary-color)]">
              {enhancedTableHead.map(({ label }, index) => (
                <th
                  key={index}
                  className={`p-2 ${
                    index === enhancedTableHead.length - 1
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
                  colSpan={enhancedTableHead.length}
                  className="p-4 text-center text-[16px] font-semibold text-red-500"
                >
                  No data found
                </td>
              </tr>
            ) : (
              tableData.map((data, index) => {
                const isChecked = selectedRows.includes(index);
                return (
                  <tr
                    key={index}
                    className={`cursor-pointer bg-white text-center ${isChecked ? "bg-blue-100" : ""}`}
                    onDoubleClick={() => {
                      if (entity !== "branch") {
                        navigate(
                          `/home/detail/${entity}/${data.id}/detail${
                            entity.charAt(0).toUpperCase() + entity.slice(1)
                          }`
                        );
                      }
                    }}
                  >
                    {/* Checkbox cell */}
                    <td className="border-[1.5px] border-gray-300 p-2">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleSelectRow(index)}
                      />
                    </td>

                    {/* Other cells */}
                    {tableHead.map(({ key, formatter }, colIndex) => (
                      <td
                        key={colIndex}
                        className="max-w-[70px] min-w-[100px] overflow-hidden border-[1.5px] border-gray-300 p-2 text-ellipsis whitespace-nowrap"
                      >
                        {key === "action" ? (
                          <i className="fa-solid fa-file-pen text-lg"></i>
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
      </div>
    </div>
  );
};

export default DynamicTableCheckBoxAction;

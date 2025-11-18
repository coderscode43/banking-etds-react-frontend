import StickyScrollbarWrapper from "../component/StickyScrollbarWrapper";
import TableLoadingSkeleton from "../loader/TableLoadingSkeleton";

const DynamicTableCheckBoxInput = ({
  tableHead,
  tableData,
  updatedTableData,
  setUpdatedTableData,
  selectedRows,
  setSelectedRows,
  loading = false,
  loadingSkeletonRows,
}) => {
  // Skeleton loader rows count (adjust as needed)
  const skeletonRows = loadingSkeletonRows || 100;

  // Validation rules
  const validatePAN = (value) => /^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/.test(value);
  const numericFilter = (value) => value.replace(/\D+/g, "");

  const handleInputChange = (e, key, index) => {
    let val = e.target.value;

    if (key === "correctPan") {
      if (val.length > 10) return;
    } else if (key === "correctAmountPaid" || key === "correctTds") {
      val = numericFilter(val);
    }

    setUpdatedTableData((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [key]: val,
      };
      return updated;
    });
  };

  // Toggle individual row
  const handleSelectRow = (index) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index]
    );
  };

  return (
    <div className="relative w-full">
      <div className="w-full overflow-clip rounded-md border border-gray-200">
        <StickyScrollbarWrapper>
          <div className="custom-scrollbar max-h-[300px] overflow-y-auto">
            <table className="w-full text-[14px]">
              <thead
                className="bg-[var(--secondary-color)]"
                style={{
                  zIndex: "9",
                  position: "sticky",
                  top: "0",
                }}
              >
                <tr>
                  {tableHead.map(({ label, key }, index) => (
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
                        {label}{" "}
                        {/^correct/.test(key) && key !== "correctRemark" ? (
                          <span className="text-red-500">*</span>
                        ) : (
                          ""
                        )}
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
                  updatedTableData.map((data, index) => {
                    const isChecked = selectedRows.includes(index);
                    return (
                      <tr
                        key={index}
                        className={`cursor-pointer text-center ${isChecked ? "bg-blue-50" : "hover:bg-gray-100"}`}
                      >
                        {tableHead.map(({ key }, colIndex) => (
                          <td
                            key={colIndex}
                            className={`w-auto border-[1.5px] border-gray-300 p-2 text-ellipsis whitespace-nowrap`}
                          >
                            {key === "selectCorrections" ? (
                              <input /* Checkbox cell */
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleSelectRow(index)}
                              />
                            ) : /^correct/.test(key) ? (
                              <div className="flex flex-col">
                                <input /* Input Box cell */
                                  type="text"
                                  value={data[key] ?? ""}
                                  onChange={(e) =>
                                    handleInputChange(e, key, index)
                                  }
                                  className={`w-40 rounded-sm border border-gray-300 px-1 focus:outline-none ${
                                    !isChecked ? "bg-gray-100" : "bg-white"
                                  } ${
                                    key === "correctPan" &&
                                    data[key] &&
                                    !validatePAN(data[key])
                                      ? "border-red-500"
                                      : ""
                                  }`}
                                  disabled={!isChecked}
                                  maxLength={
                                    key === "correctPan" ? 10 : undefined
                                  }
                                  placeholder={
                                    key === "correctPan"
                                      ? "ABCDE1234F"
                                      : key === "correctAmountPaid"
                                        ? "Numbers only"
                                        : key === "correctTds"
                                          ? "Numbers only"
                                          : ""
                                  }
                                />
                                {key === "correctPan" &&
                                data[key] &&
                                !validatePAN(data[key]) ? (
                                  <p className="text-red-500">
                                    Invalid PAN Number
                                  </p>
                                ) : (
                                  ""
                                )}
                              </div>
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
        </StickyScrollbarWrapper>
      </div>
    </div>
  );
};

export default DynamicTableCheckBoxInput;

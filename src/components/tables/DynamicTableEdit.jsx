const DynamicTableEdit = ({ tableHead, tableData }) => {
  return (
    <div className="relative w-full">
      <div className="w-full overflow-clip rounded-md">
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
              tableData.map((data, index) => (
                <tr
                  key={index}
                  className="cursor-pointer text-center hover:bg-gray-100"
                  //   onDoubleClick={() => {
                  //     common.clientDetailsWithNavigate(
                  //       data.tan,
                  //       "processHome",
                  //       navigate
                  //     );
                  //   }}
                >
                  {tableHead.map(({ key }, colIndex) => (
                    <td
                      key={colIndex}
                      className="max-w-[70px] min-w-[100px] overflow-hidden border-[1.5px] border-gray-300 p-2 text-ellipsis whitespace-nowrap"
                    >
                      {data[key] ?? "-"}
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

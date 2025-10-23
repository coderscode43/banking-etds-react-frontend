import React from "react";

export const DetailGrid = ({ fields, data, columns = 1, onDownload }) => {
  const rows = [];
  let buffer = [];

  // Group fields into rows based on fullRow and columns
  fields.forEach((field) => {
    if (field.fullRow) {
      if (buffer.length) {
        rows.push(buffer);
        buffer = [];
      }
      rows.push([field]);
    } else {
      buffer.push(field);
      if (buffer.length === columns) {
        rows.push(buffer);
        buffer = [];
      }
    }
  });

  if (buffer.length) rows.push(buffer);

  return (
    <>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex w-full flex-wrap">
          {row.map((field, colIndex) =>
            field.show && !field.show(data)
              ? null
              : (() => {
                  // Compute display value
                  let displayValue = "";
                  if (field.combineKeys) {
                    displayValue = field.combineKeys
                      .map((k) => data[k])
                      .filter((v) => v != null)
                      .join("  ");
                  } else {
                    const raw = field.key ? data[field.key] : null;
                    displayValue = field.formatter
                      ? field.formatter(raw, data)
                      : raw != null
                        ? raw
                        : "";
                  }

                  const isFull = field.fullRow;

                  // Adjust container width for wideValue spanning multiple columns
                  const wideSpan = field.wideValue ? 2 : 1;
                  const wideColumnWidth = (100 / columns) * wideSpan;

                  const containerCls =
                    field.containerClassName || "flex p-0 space-y-2";
                  const containerStyle =
                    field.containerStyle ||
                    (isFull
                      ? { width: "100%" }
                      : {
                          flexBasis: `${wideColumnWidth}%`,
                          maxWidth: `${wideColumnWidth}%`,
                        });

                  const labelCls =
                    field.labelClassName ||
                    (isFull
                      ? "md:w-6/12 px-2 font-semibold text-[var(--primary-color)] text-sm flex items-start"
                      : field.wideValue
                        ? "w-3/12 px-2 font-semibold text-[var(--primary-color)] text-sm flex items-start"
                        : "w-1/2 px-2 font-semibold text-[var(--primary-color)] text-sm flex items-start");

                  const valueCls =
                    field.valueClassName ||
                    (isFull
                      ? "md:w-6/12 px-2 text-[var(--secondary-color)] text-sm flex items-start fontSize-[16px]"
                      : field.wideValue
                        ? "w-8/12 px-2 text-[var(--secondary-color)] text-sm flex items-start"
                        : "w-1/2 px-2 text-[var(--secondary-color)] text-sm flex items-start");

                  return (
                    <div
                      key={colIndex}
                      className={containerCls}
                      style={containerStyle}
                    >
                      <div className={labelCls}>
                        <label>{field.label}</label>
                      </div>
                      <div className={valueCls}>
                        {field.key === "fileName" &&
                        field.type === "download" &&
                        data[field.key] ? (
                          <>
                            : &nbsp;
                            {displayValue
                              .split("^")
                              .map((file) => file.trim())
                              .filter(Boolean)
                              .map((file, idx, arr) => (
                                <span key={idx}>
                                  {file}
                                  {idx < arr.length - 1 ? " ,  " : ""}
                                </span>
                              ))}
                            &nbsp;
                            <div className="rounded-md bg-blue-400 px-2 py-0.5 text-white">
                              <i
                                className="fa-solid fa-download cursor-pointer"
                                onClick={onDownload}
                              />
                            </div>
                          </>
                        ) : (
                          <span>: &nbsp;{displayValue}</span>
                        )}
                      </div>
                    </div>
                  );
                })()
          )}
        </div>
      ))}
    </>
  );
};

import React from "react";

export const DetailGrid = ({ fields, data, columns = 1 }) => {
  const rows = [];
  let buffer = [];

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

  // Calculate width percentage for columns (for inline style)
  const columnWidth = 100 / columns;

  return (
    <>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex w-full flex-wrap">
          {row.map((field, colIndex) => {
            // ✅ Add this conditional
            if (field.show && !field.show(data)) {
              return null;
            }
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

            // Container styles and classes
            const containerCls =
              field.containerClassName || "flex p-0 space-y-2";

            // Inline style for width, full row takes 100%
            const containerStyle =
              field.containerStyle ||
              (isFull
                ? { width: "100%" }
                : {
                    flexBasis: `${columnWidth}%`,
                    maxWidth: `${columnWidth}%`,
                  });

            // Label and value classes
            const labelCls =
              field.labelClassName ||
              (isFull
                ? "md:w-4/12 px-2 font-semibold text-[var(--primary-color)] text-sm flex items-start"
                : "w-1/2 px-2 font-semibold text-[var(--primary-color)] text-sm flex items-start");

            const valueCls =
              field.valueClassName ||
              (isFull
                ? "md:w-8/12 px-2 text-[var(--secondary-color)] text-sm flex items-start fontSize-[16px]"
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
                  <span>: &nbsp;{displayValue}</span>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
};

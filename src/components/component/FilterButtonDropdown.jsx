import { useState, useRef, useEffect } from "react";

export default function FilterButtonDropdown({
  extraColumns,
  checkedItems,
  setCheckedItems,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle all checkboxes
  const allChecked = checkedItems.size === extraColumns.length;

  const toggleAll = () => {
    if (allChecked) {
      setCheckedItems(new Set());
    } else {
      setCheckedItems(new Set(extraColumns));
    }
  };

  // Toggle a single checkbox
  const toggleItem = (item) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(item)) {
      newChecked.delete(item);
    } else {
      newChecked.add(item);
    }
    setCheckedItems(newChecked);
  };

  return (
    <div className="relative inline-block">
      {/* Make this relative and inline-block */}
      <button
        className="h-[38px] cursor-pointer rounded-sm bg-[#024dec] px-3 text-2xl font-black text-white"
        onClick={toggleDropdown}
      >
        <i className="fa-solid fa-table"></i>
      </button>
      {/* Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="custom-scrollbar absolute z-50 mt-1 max-h-[310px] w-62 overflow-x-hidden overflow-y-auto rounded-md border border-gray-200 bg-white p-1 text-sm text-gray-900 shadow-lg"
          style={{ top: "100%", right: 0 }} // place it right below the button
        >
          {/* Check All */}
          <div
            className="group flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-gray-100"
            onClick={() => toggleAll()}
          >
            <input
              type="checkbox"
              checked={allChecked}
              readOnly
              className="cursor-pointer"
            />
            <span>CheckAll</span>
          </div>

          {/* Divider */}
          <div className="my-1 h-px bg-gray-200" />

          {/* Items */}
          {extraColumns.map((column) => (
            <div
              key={column.key}
              className="group flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-gray-100"
              onClick={() => toggleItem(column.key)}
            >
              <input
                type="checkbox"
                checked={checkedItems.has(column.key)}
                className="cursor-pointer"
                id={`checkbox-${column.key}`}
              />
              <label
                htmlFor={`${column.key}`}
                className="capitalize select-none"
              >
                {column.label}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

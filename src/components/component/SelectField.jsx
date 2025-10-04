import ErrorMessage from "./ErrorMessage";

const SelectField = ({
  label,
  name,
  value,
  onChange,
  options = [],
  error,
  required = false,
}) => (
  <div className="w-full">
    <label className="font-semibold text-[var(--primary-color)]">
      {label} {required && <span className="text-red-600">*</span>}
    </label>
    <select
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className="custom-scrollbar mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
    >
      <option value="">Select {label}</option>
      {options.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
    <ErrorMessage error={error} />
  </div>
);

export default SelectField;

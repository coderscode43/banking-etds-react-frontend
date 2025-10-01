import ErrorMessage from "./ErrorMessage";

const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  required = false,
}) => (
  <div className="w-full">
    <label className="font-semibold text-[var(--primary-color)]">
      {label} {required && <span className="text-red-600">*</span>}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
      value={value}
      onChange={onChange}
    />
    <ErrorMessage error={error} />
  </div>
);

export default InputField;

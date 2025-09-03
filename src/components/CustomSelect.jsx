import Select from "react-select";
import { useOptions } from "../context/options";

export default function CustomSelect({
  value,
  setValue,
  placeholder,
  label,
  required,
}) {
  const { options } = useOptions();


  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-600 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>{" "}
      <Select
        options={options}
        value={value}
        onChange={setValue}
        placeholder={placeholder}
        isClearable
        styles={{
          control: (base, state) => ({
            ...base,
            border: "1px solid #d1d5db",
            borderRadius: "0.75rem",
            padding: "2px 8px",
            boxShadow: state.isFocused ? "0 0 0 2px #7dd3fc" : "none",
            outline: "none",
            "&:hover": {
              borderColor: "#d1d5db",
            },
          }),
          placeholder: (base) => ({
            ...base,
            color: "#9ca3af",
          }),
        }}
      />
    </div>
  );
}

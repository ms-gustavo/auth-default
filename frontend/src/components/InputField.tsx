import { InputFieldProps } from "../interfaces/interfaces";

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  id,
  value,
  required = false,
  onChange,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        value={value}
        maxLength={20}
        required={required}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;

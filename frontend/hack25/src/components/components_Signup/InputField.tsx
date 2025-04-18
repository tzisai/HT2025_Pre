import React from "react";

interface InputFieldProps {
  name: string;
  label: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  maxLength?: number;
  minLength?: number;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  type = "text",
  value,
  error,
  onChange,
  onBlur,
  maxLength,
  minLength,
}) => (
  <div className="mb-3">
    <label className="form-label">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={`form-control ${error ? "is-invalid" : ""}`}
      maxLength={maxLength}
      minLength={minLength}
    />
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

export default InputField;

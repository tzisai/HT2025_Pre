import React from "react";

interface PasswordFieldProps {
  name: string;
  label: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  maxLength?: number;
  minLength?: number;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  name,
  label,
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
      type="password"
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

export default PasswordField;

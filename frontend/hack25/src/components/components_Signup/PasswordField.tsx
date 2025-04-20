import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <div className="input-group">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`form-control ${error ? "is-invalid" : ""}`}
          maxLength={maxLength}
          minLength={minLength}
        />
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={togglePasswordVisibility}
          tabIndex={-1}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default PasswordField;

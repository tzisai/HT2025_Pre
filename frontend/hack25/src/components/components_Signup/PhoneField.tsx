import React from "react";

interface PhoneFieldProps {
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  maxLength?: number;
  minLength?: number;
}

const PhoneField: React.FC<PhoneFieldProps> = ({
  value,
  error,
  onChange,
  onBlur,
  maxLength,
  minLength,
}) => (
  <div className="mb-3">
    <label className="form-label">Teléfono</label>
    <input
      type="tel"
      name="phone"
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

export default PhoneField;

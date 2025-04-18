import React from "react";

interface TermsCheckboxProps {
  checked: boolean;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const TermsCheckbox: React.FC<TermsCheckboxProps> = ({
  checked,
  error,
  onChange,
  onBlur,
}) => (
  <div className="mb-3">
    <div className="form-check">
      <input
        type="checkbox"
        name="termsAccepted"
        checked={checked}
        onChange={onChange}
        onBlur={onBlur}
        className={`form-check-input ${error ? "is-invalid" : ""}`}
      />
      <label className="form-check-label">
        Acepto los términos, condiciones y la política de privacidad de Sophons.
      </label>
    </div>
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

export default TermsCheckbox;

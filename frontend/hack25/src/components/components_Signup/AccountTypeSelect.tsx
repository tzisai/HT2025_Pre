import React from "react";

interface AccountTypeSelectProps {
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
}

const AccountTypeSelect: React.FC<AccountTypeSelectProps> = ({
  value,
  error,
  onChange,
  onBlur,
}) => (
  <div className="mb-3">
    <label className="form-label">Tipo de cuenta</label>
    <select
      name="accountType"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={`form-control ${error ? "is-invalid" : ""}`}
    >
      <option value="">Seleccione una opción</option>
      <option value="Individual">Individual</option>
      <option value="Colectivo">Colectivo</option>
      <option value="Familiar">Familiar</option>
      <option value="Empresarial">Empresarial</option>
    </select>
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

export default AccountTypeSelect;

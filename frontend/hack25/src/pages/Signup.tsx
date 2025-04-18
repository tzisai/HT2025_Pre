import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../firebase/auth";
import { validateEmail } from "../utils/validateEmail";

import InputField from "../components/components_Signup/InputField";
import PasswordField from "../components/components_Signup/PasswordField";
import PhoneField from "../components/components_Signup/PhoneField";
import AccountTypeSelect from "../components/components_Signup/AccountTypeSelect";
import TermsCheckbox from "../components/components_Signup/TermsCheckbox";
import NavBar from "../components/NavBar";

const Signup: React.FC = () => {
  const [form, setForm] = useState({
    accountType: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Se valida uno a uno los campos al hacer blur
  const validate = async (name: string, value: string): Promise<string> => {
    switch (name) {
      case "firstName":
        if (!value) return "Nombre requerido.";
        break;
      case "lastName":
        if (!value || value.length < 2)
          return "Apellidos requeridos, al menos 2 caracteres.";
        break;
      case "email":
        if (
          !/\S+@\S+\.\S+/.test(value) ||
          value.length > 320 ||
          value.length < 6
        )
          return "Correo inválido.";
        try {
          const emailValidation = await validateEmail(value);
          if (!emailValidation.valid) return emailValidation.message;
        } catch (error: any) {
          return error.code === "auth/quota-exceeded"
            ? "Se excedió la cuota de verificación de correo. Intenta más tarde."
            : "Error al verificar correo. Intenta más tarde.";
        }
        break;
      case "phone":
        if (!/^\d{10}$/.test(value.replace(/[\s-]/g, "")) || value.length < 10)
          return "Teléfono inválido (10 dígitos).";
        break;
      case "password":
        if (!value || value.length < 6 || value.length > 4000)
          return "Contraseña debe tener al menos 6 caracteres, máximo 4000 caracteres.";
        break;
      case "confirmPassword":
        if (value !== form.password) return "Las contraseñas no coinciden.";
        break;
      case "accountType":
        if (!value) return "Tipo de cuenta requerido.";
        break;
      case "termsAccepted":
        if (!form.termsAccepted)
          return "Debes aceptar los términos y condiciones.";
        break;
      default:
        break;
    }
    return "";
  };

  const validateAll = async (): Promise<boolean> => {
    const newErrors: Record<string, string> = {};

    for (const [name, value] of Object.entries(form)) {
      if (typeof value === "string") {
        const error = await validate(name, value);
        if (error) newErrors[name] = error;
      }
      // Validación especial para el checkbox
      if (name === "termsAccepted" && !form.termsAccepted) {
        newErrors[name] = "Debes aceptar los términos y condiciones.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formIsValid = await validateAll();

    if (!formIsValid) return;

    try {
      await registerUser(
        form.email,
        form.password,
        form.firstName,
        form.lastName,
        form.phone,
        form.accountType
      );

      navigate("/");
    } catch (error: any) {
      console.error("Error al registrar usuario:", error);

      if (error.code === "auth/email-already-in-use") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Este correo ya está en uso. Intenta con otro.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Error al registrar. Intenta más tarde.",
        }));
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const target = e.target as HTMLInputElement;
    const checked = target.checked;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = async (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = await validate(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  return (
    <>
      <NavBar />

      <h1 className="text-2xl font-bold text-center my-4">Crear Cuenta</h1>
      <div className="max-w-md mx-auto mt-8 p-4 shadow-md border rounded">
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
          <AccountTypeSelect
            value={form.accountType}
            error={errors.accountType}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <InputField
            name="firstName"
            label="Nombre"
            value={form.firstName}
            error={errors.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={45}
            minLength={1}
          />
          <InputField
            name="lastName"
            label="Apellidos"
            value={form.lastName}
            error={errors.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={45}
            minLength={2}
          />
          <InputField
            name="email"
            label="Correo electrónico"
            type="email"
            value={form.email}
            error={errors.email}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={320}
            minLength={6}
          />
          <PhoneField
            value={form.phone}
            error={errors.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={20}
            minLength={10}
          />
          <PasswordField
            name="password"
            label="Contraseña"
            value={form.password}
            error={errors.password}
            onChange={handleChange}
            onBlur={handleBlur}
            minLength={6}
            maxLength={4000}
          />
          <PasswordField
            name="confirmPassword"
            label="Confirmar contraseña"
            value={form.confirmPassword}
            error={errors.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            minLength={6}
            maxLength={4000}
          />
          <TermsCheckbox
            checked={form.termsAccepted}
            error={errors.termsAccepted}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <button type="submit" className="btn btn-primary w-full mt-3">
            Registrarse
          </button>
        </form>
        <p className="mt-4 text-center">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="link-primary">
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </>
  );
};

export default Signup;

// Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/validateEmail";
import { loginUser } from "../firebase/auth";

import InputField from "../components/components_Signup/InputField";
import PasswordField from "../components/components_Signup/PasswordField";
import NavBar from "../components/NavBar";

interface LoginProps {
  setUser: (user: { name: string; email: string }) => void;
}

function Login({ setUser }: LoginProps) {
  const [inputPassword, setInputPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const navigate = useNavigate();

  const handleBlur = async (field: string, value: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = await validate(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const validate = async (name: string, value: string): Promise<string> => {
    const trimmedValue = value.trim();
    switch (name) {
      case "email":
        if (!/\S+@\S+\.\S+/.test(trimmedValue))
          return "Correo electrónico inválido.";
        try {
          const emailValidation = await validateEmail(trimmedValue);
          if (!emailValidation.valid) return emailValidation.message;
        } catch (error: any) {
          return error.code === "auth/quota-exceeded"
            ? "Se excedió la cuota de verificación de correo. Intenta más tarde."
            : "Error al verificar correo. Intenta más tarde.";
        }
        break;
      case "password":
        if (!trimmedValue || trimmedValue.length < 6)
          return "La contraseña debe tener al menos 6 caracteres.";
        break;
      default:
        break;
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = inputPassword.trim();

    const emailError = await validate("email", trimmedEmail);
    const passwordError = await validate("password", trimmedPassword);

    const newErrors: Record<string, string> = {};
    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    setTouched({ email: true, password: true });

    if (Object.keys(newErrors).length > 0) return;

    try {
      const user = await loginUser(trimmedEmail, trimmedPassword);
      setUser({ name: user.displayName || "", email: user.email || "" });
      navigate("/");
    } catch (error: any) {
      console.error("Error al iniciar sesión:", error);
      if (error.code === "auth/user-not-found") {
        setErrors((prev) => ({
          ...prev,
          email: "El correo no está registrado.",
        }));
      } else if (error.code === "auth/wrong-password") {
        setErrors((prev) => ({ ...prev, password: "Contraseña incorrecta." }));
      } else if (error.code === "auth/invalid-credential") {
        setErrors((prev) => ({
          ...prev,
          email: "Credenciales inválidas. Revisa el correo y la contraseña.",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          email:
            error.message ||
            "Error al iniciar sesión. Verifica tus credenciales.",
        }));
      }
    }
  };

  return (
    <>
      <NavBar />
      <h1 className="text-2xl font-semibold mb-4">Iniciar sesión</h1>
      <div className="max-w-md mx-auto mt-8 p-4 shadow-md border rounded">
        <form onSubmit={handleSubmit}>
          <InputField
            name="email"
            label="Email*"
            type="email"
            value={email}
            onChange={(e) => {
              const value = e.target.value;
              setEmail(value);
              validate("email", value).then((error) => {
                setErrors((prev) => ({ ...prev, email: error }));
              });
            }}
            onBlur={(e) => handleBlur("email", e.target.value)}
            error={touched.email && errors.email ? errors.email : undefined}
          />
          <PasswordField
            name="password"
            label="Contraseña*"
            value={inputPassword}
            onChange={(e) => {
              const value = e.target.value;
              setInputPassword(value);
              validate("password", value).then((error) => {
                setErrors((prev) => ({ ...prev, password: error }));
              });
            }}
            onBlur={(e) => handleBlur("password", e.target.value)}
            error={
              touched.password && errors.password ? errors.password : undefined
            }
          />
          <button
            type="submit"
            className="btn btn-primary w-full mt-3"
            disabled={!email || !inputPassword}
          >
            Iniciar sesión
          </button>
        </form>
        <p className="mt-4 text-center">
          ¿No tienes una cuenta?{" "}
          <a href="/signup" className="link-primary">
            Regístrate aquí
          </a>
        </p>
      </div>
    </>
  );
}

export default Login;

import { useState } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  setUser: (user: { name: string; email: string }) => void;
}

function Login({ setUser }: LoginProps) {
  const [inputPassword, setInputPassword] = useState(""); // Estado para la contraseña
  const [email, setEmail] = useState(""); // Estado para el email
  const [touched, setTouched] = useState({
    // Estado para los inputs
    email: false,
    password: false,
  });

  const navigate = useNavigate();

  // Se obtiene el valor del input de la contraseña
  const handlePasswordChange = (id: string, value: string) => {
    if (id === "InputPassword") {
      setInputPassword(value);
    }
  };

  // Se obtiene el valor del input del email
  const handleInputChange = (id: string, value: string) => {
    if (id === "InputEmail") {
      setEmail(value);
    }
  };

  // Se obtiene el valor del input para ver si fue correctamente ingresado o no
  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Expresión regular para validar el correo electrónico
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // Validación del formulario
  const isFormValid = inputPassword !== "" && emailRegex.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !inputPassword) return;
    setUser({ name: email, email });
    navigate("/");
  };

  return (
    <>
      <NavBar />
      <div>
        <h1>Iniciar sesión</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="InputEmail" className="form-label">
              Email*
            </label>
            <input
              type="email"
              className={`form-control ${
                // Verifica si el input fue correctamente ingresado o no
                touched.email && !emailRegex.test(email) ? "is-invalid" : ""
              }`}
              id="InputEmail"
              value={email}
              onChange={(e) => handleInputChange("InputEmail", e.target.value)}
              onBlur={() => handleBlur("email")}
            />
            {touched.email &&
              !emailRegex.test(email) && ( // Verifica si el input fue correctamente ingresado o no
                <div className="invalid-feedback">
                  Por favor, ingresa un correo válido.
                </div>
              )}
          </div>
          <div className="mb-3">
            <label htmlFor="InputPassword" className="form-label">
              Contraseña*
            </label>
            <input
              type="password"
              className={`form-control ${
                // Verifica si el input fue correctamente ingresado o no
                touched.password && inputPassword === "" ? "is-invalid" : ""
              }`}
              id="InputPassword"
              value={inputPassword}
              onChange={(e) =>
                handlePasswordChange("InputPassword", e.target.value)
              }
              onBlur={() => handleBlur("password")}
            />
            {touched.password &&
              inputPassword === "" && ( // Verifica si el input fue correctamente ingresado o no
                <div className="invalid-feedback">
                  La contraseña es obligatoria.
                </div>
              )}
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isFormValid}
          >
            Iniciar sesión
          </button>
        </form>
        <p>
          <br />
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

import { useState } from "react";
import NavBar from "../components/NavBar";

function Signup() {
  const [inputPassword, setInputPassword] = useState(""); // Estado para la contraseña
  const [verifyPassword, setVerifyPassword] = useState(""); // Estado para la verificación de la contraseña
  const [email, setEmail] = useState(""); // Estado para el email
  const [termsAccepted, setTermsAccepted] = useState(false); // Estado para los términos y condiciones
  const [user, setUser] = useState(""); // Estado para el nombre
  const [touched, setTouched] = useState({
    // Estado para los inputs
    email: false,
    password: false,
    verifyPassword: false,
    user: false,
    termsAccepted: false,
  });

  // Se obtiene el valor del input de la contraseña y de la verificación de la contraseña
  const handlePasswordChange = (id: string, value: string) => {
    if (id === "InputPassword") {
      setInputPassword(value);
    } else if (id === "VerifyPassword") {
      setVerifyPassword(value);
    }
  };

  // Se obtiene el valor del input del nombre y del email
  const handleInputChange = (id: string, value: string) => {
    if (id === "user") {
      setUser(value);
    } else if (id === "InputEmail") {
      setEmail(value);
    }
  };

  // Se obtiene el valor del checkbox de términos y condiciones
  const handleTermsChange = () => {
    setTermsAccepted(!termsAccepted);
  };

  // Se obtiene el valor del input para ver si fue correctamente ingresado o no
  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Expresión regular para validar el correo electrónico
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // Validación del formulario
  const isFormValid =
    inputPassword === verifyPassword &&
    inputPassword !== "" &&
    verifyPassword !== "" &&
    emailRegex.test(email) &&
    user !== "" &&
    termsAccepted;

  return (
    <>
      <NavBar />
      <div>
        <h1>Crear cuenta</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="user" className="form-label">
              Nombre de ususario*
            </label>
            <input
              type="text"
              className={`form-control ${
                // Verifica si el input fue correctamente ingresado o no
                touched.user && user === "" ? "is-invalid" : ""
              }`}
              id="user"
              value={user}
              onChange={(e) => handleInputChange("user", e.target.value)}
              onBlur={() => handleBlur("user")} // Verifica si el input fue correctamente ingresado o no
            />
            {touched.user && user === "" && (
              <div className="invalid-feedback">El nombre es obligatorio.</div>
            )}
          </div>
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
              aria-describedby="emailHelp"
              onBlur={() => handleBlur("email")}
            />
            {touched.email &&
              !emailRegex.test(email) && ( // Verifica si el input fue correctamente ingresado o no
                <div className="invalid-feedback">
                  Por favor, ingresa un correo válido.
                </div>
              )}
            <div id="emailHelp" className="form-text">
              No compartiremos tu correo electronico con nadie más.
            </div>
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
            <label htmlFor="VerifyPassword" className="form-label">
              Verifica tu contraseña*
            </label>
            <input
              type="password"
              className={`form-control ${
                // Verifica si el input fue correctamente ingresado o no
                touched.verifyPassword && verifyPassword === ""
                  ? "is-invalid"
                  : ""
              }`}
              id="VerifyPassword"
              value={verifyPassword}
              onChange={(e) =>
                handlePasswordChange("VerifyPassword", e.target.value)
              }
              onBlur={() => handleBlur("verifyPassword")}
            />
            {touched.verifyPassword &&
              verifyPassword === "" && ( // Verifica si el input fue correctamente ingresado o no
                <div className="invalid-feedback">
                  Debes verificar tu contraseña.
                </div>
              )}
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className={`form-check-input ${
                // Verifica si el input fue correctamente ingresado o no
                touched.termsAccepted && !termsAccepted ? "is-invalid" : ""
              }`}
              id="TerminosCondiciones"
              checked={termsAccepted}
              onChange={handleTermsChange}
              onBlur={() => handleBlur("termsAccepted")}
            />
            <label className="form-check-label" htmlFor="TerminosCondiciones">
              Acepto los términos y condiciones de Sohpons
            </label>
            {touched.termsAccepted &&
              !termsAccepted && ( // Verifica si el input fue correctamente ingresado o no
                <div className="invalid-feedback">
                  Debes aceptar los términos y condiciones.
                </div>
              )}
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isFormValid}
          >
            Crear cuenta
          </button>
        </form>
        <p>
          <br />
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="link-primary">
            Inicia sesión
          </a>
        </p>
      </div>
    </>
  );
}

export default Signup;

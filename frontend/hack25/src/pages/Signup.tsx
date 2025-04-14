import { useState } from "react";
import NavBar from "../components/NavBar";
import { registerUser } from "../firebase/auth";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [tipo_cuenta, setTipoCuenta] = useState(""); // Estado para el tipo de cuenta
  const [inputPassword, setInputPassword] = useState(""); // Estado para la contraseña
  const [verifyPassword, setVerifyPassword] = useState(""); // Estado para la verificación de la contraseña
  const [apellidos, setApellidos] = useState(""); // Estado para el apellidos
  const [email, setEmail] = useState(""); // Estado para el email
  const [nombre, setNombre] = useState(""); // Estado para el nombre
  const [telefono, setTelefono] = useState(""); // Estado para el telefono
  const [termsAccepted, setTermsAccepted] = useState(false); // Estado para los términos y condiciones
  const [touched, setTouched] = useState({
    // Estado para los inputs
    tipo_cuenta: false,
    password: false,
    verifyPassword: false,
    apellidos: false,
    email: false,
    nombre: false,
    telefono: false,
    termsAccepted: false,
  });

  const handleTipoCuentaChange = (value: string) => {
    setTipoCuenta(value);
  };

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
    if (id === "nombre") {
      setNombre(value);
    } else if (id === "email") {
      setEmail(value);
    } else if (id === "apellidos") {
      setApellidos(value);
    } else if (id === "telefono") {
      setTelefono(value);
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

  // Función para validar la contraseña
  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,4000}$/;
    return passwordRegex.test(password);
  };

  // Validación del formulario
  const isFormValid =
    tipo_cuenta !== "" &&
    inputPassword === verifyPassword &&
    inputPassword !== "" &&
    verifyPassword !== "" &&
    emailRegex.test(email) &&
    nombre !== "" &&
    apellidos !== "" &&
    telefono !== "" &&
    termsAccepted;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      setTouched({
        tipo_cuenta: true,
        password: true,
        verifyPassword: true,
        apellidos: true,
        email: true,
        nombre: true,
        telefono: true,
        termsAccepted: true,
      });
      return;
    }

    // Validar la contraseña
    if (!validatePassword(inputPassword)) {
      console.error(
        "La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula, un número y un carácter especial."
      );
      return;
    }

    try {
      await registerUser(
        email,
        inputPassword,
        nombre,
        apellidos,
        telefono,
        tipo_cuenta
      );
      navigate("/");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        console.error("Correo ya en uso");
        console.error("Este correo ya está registrado.");
      } else {
        console.error("Error al registrar el usuario:", error);
      }
    }
  };

  return (
    <>
      <NavBar />
      <div>
        <h1>Crear cuenta</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="tipo_cuenta" className="form-label">
              Tipo de cuenta
            </label>
            <select
              id="tipo_cuenta"
              className={`form-select ${
                touched.tipo_cuenta && tipo_cuenta === "" ? "is-invalid" : ""
              }`}
              value={tipo_cuenta}
              onChange={(e) => handleTipoCuentaChange(e.target.value)}
              onBlur={() => handleBlur("tipo_cuenta")}
            >
              <option value="">--Selecciona el tipo de cuenta--</option>
              <option value="Individual">Individual</option>
              <option value="Colectivo">Colectivo</option>
              <option value="Familiar">Familiar</option>
              <option value="Empresarial">Empresarial</option>
            </select>
            {touched.tipo_cuenta && tipo_cuenta === "" && (
              <div className="invalid-feedback">
                El tipo de cuenta es obligatorio.
              </div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre de usuario
            </label>
            <input
              type="text"
              className={`form-control ${
                // Verifica si el input fue correctamente ingresado o no
                touched.nombre && nombre === "" ? "is-invalid" : ""
              }`}
              id="nombre"
              value={nombre}
              onChange={(e) => handleInputChange("nombre", e.target.value)}
              onBlur={() => handleBlur("nombre")} // Verifica si el input fue correctamente ingresado o no
            />
            {touched.nombre && nombre === "" && (
              <div className="invalid-feedback">El nombre es obligatorio.</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="apellidos" className="form-label">
              Apellidos
            </label>
            <input
              type="text"
              className={`form-control ${
                // Verifica si el input fue correctamente ingresado o no
                touched.apellidos && apellidos === "" ? "is-invalid" : ""
              }`}
              id="apellidos"
              value={apellidos}
              onChange={(e) => handleInputChange("apellidos", e.target.value)}
              onBlur={() => handleBlur("apellidos")} // Verifica si el input fue correctamente ingresado o no
            />
            {touched.apellidos && apellidos === "" && (
              <div className="invalid-feedback">
                Los apellidos son obligatorios.
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">
              Numero de telefono
            </label>
            <input
              type="text"
              className={`form-control ${
                // Verifica si el input fue correctamente ingresado o no
                touched.telefono && telefono === "" ? "is-invalid" : ""
              }`}
              id="telefono"
              value={telefono}
              onChange={(e) => handleInputChange("telefono", e.target.value)}
              onBlur={() => handleBlur("telefono")} // Verifica si el input fue correctamente ingresado o no
            />
            {touched.telefono && telefono === "" && (
              <div className="invalid-feedback">
                El numero de telefono es obligatorio.
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className={`form-control ${
                // Verifica si el input fue correctamente ingresado o no
                touched.email && !emailRegex.test(email) ? "is-invalid" : ""
              }`}
              id="email"
              value={email}
              onChange={(e) => handleInputChange("email", e.target.value)}
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
              Contraseña
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

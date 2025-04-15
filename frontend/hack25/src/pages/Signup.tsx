import { useState } from "react";
import NavBar from "../components/NavBar";
import { registerUser } from "../firebase/auth";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  // Estados para los valores del formulario
  const [tipo_cuenta, setTipoCuenta] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Estado para campos tocados
  const [touched, setTouched] = useState({
    tipo_cuenta: false,
    password: false,
    verifyPassword: false,
    apellidos: false,
    email: false,
    nombre: false,
    telefono: false,
    termsAccepted: false,
  });

  // Errores personalizados del backend (como email ya registrado)
  const [customErrors, setCustomErrors] = useState({
    emailInUse: false,
    passwordInvalid: false,
  });

  // Expresiones regulares para validaciones
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phoneRegex = /^\d{10,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W]{6,4000}$/;

  // Manejador para cambios en las contraseñas
  const handlePasswordChange = (id: string, value: string) => {
    setCustomErrors((prev) => ({ ...prev, passwordInvalid: false }));
    id === "InputPassword" ? setInputPassword(value) : setVerifyPassword(value);
  };

  // Manejador para cambios en los inputs de texto
  const handleInputChange = (id: string, value: string) => {
    setCustomErrors((prev) => ({ ...prev, emailInUse: false }));
    const setters: any = {
      nombre: setNombre,
      email: setEmail,
      apellidos: setApellidos,
      telefono: setTelefono,
    };
    if (setters[id]) setters[id](value);
  };

  // Marca un campo como "tocado" cuando pierde el foco
  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Valida si la contraseña cumple con los requisitos
  const validatePassword = (password: string) => passwordRegex.test(password);

  // Devuelve true si la contraseña es inválida
  const isPasswordInvalid = () =>
    (touched.password && !validatePassword(inputPassword)) ||
    customErrors.passwordInvalid;

  // Devuelve true si la verificación de contraseña es inválida
  const isVerifyPasswordInvalid = () =>
    touched.verifyPassword && verifyPassword !== inputPassword;

  // Validación general del formulario
  const isFormValid =
    tipo_cuenta &&
    validatePassword(inputPassword) &&
    inputPassword === verifyPassword &&
    emailRegex.test(email) &&
    nombre &&
    apellidos &&
    phoneRegex.test(telefono) &&
    termsAccepted;

  // Manejador del submit del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCustomErrors({ emailInUse: false, passwordInvalid: false });

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
      const errorCode = error?.code || error?.response?.data?.error?.message;

      if (errorCode === "auth/email-already-in-use") {
        setCustomErrors((prev) => ({ ...prev, emailInUse: true }));
        setTouched((prev) => ({ ...prev, email: true }));
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
          {/* Tipo de cuenta */}
          <div className="mb-3">
            <label htmlFor="tipo_cuenta" className="form-label">
              Tipo de cuenta
            </label>
            <select
              id="tipo_cuenta"
              className={`form-select ${
                touched.tipo_cuenta && !tipo_cuenta ? "is-invalid" : ""
              }`}
              value={tipo_cuenta}
              onChange={(e) => setTipoCuenta(e.target.value)}
              onBlur={() => handleBlur("tipo_cuenta")}
            >
              <option value="">--Selecciona el tipo de cuenta--</option>
              <option value="Individual">Individual</option>
              <option value="Colectivo">Colectivo</option>
              <option value="Familiar">Familiar</option>
              <option value="Empresarial">Empresarial</option>
            </select>
            {touched.tipo_cuenta && !tipo_cuenta && (
              <div className="invalid-feedback">
                El tipo de cuenta es obligatorio.
              </div>
            )}
          </div>

          {/* Nombre */}
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre de usuario
            </label>
            <input
              type="text"
              className={`form-control ${
                touched.nombre && !nombre ? "is-invalid" : ""
              }`}
              id="nombre"
              value={nombre}
              onChange={(e) => handleInputChange("nombre", e.target.value)}
              onBlur={() => handleBlur("nombre")}
            />
            {touched.nombre && !nombre && (
              <div className="invalid-feedback">El nombre es obligatorio.</div>
            )}
          </div>

          {/* Apellidos */}
          <div className="mb-3">
            <label htmlFor="apellidos" className="form-label">
              Apellidos
            </label>
            <input
              type="text"
              className={`form-control ${
                touched.apellidos && !apellidos ? "is-invalid" : ""
              }`}
              id="apellidos"
              value={apellidos}
              onChange={(e) => handleInputChange("apellidos", e.target.value)}
              onBlur={() => handleBlur("apellidos")}
            />
            {touched.apellidos && !apellidos && (
              <div className="invalid-feedback">
                Los apellidos son obligatorios.
              </div>
            )}
          </div>

          {/* Teléfono */}
          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">
              Número de teléfono
            </label>
            <input
              type="text"
              className={`form-control ${
                touched.telefono && !phoneRegex.test(telefono)
                  ? "is-invalid"
                  : ""
              }`}
              id="telefono"
              value={telefono}
              onChange={(e) => handleInputChange("telefono", e.target.value)}
              onBlur={() => handleBlur("telefono")}
            />
            {touched.telefono && !phoneRegex.test(telefono) && (
              <div className="invalid-feedback">
                Ingresa un número de teléfono válido de al menos 10 dígitos.
              </div>
            )}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className={`form-control ${
                (touched.email && (!email || !emailRegex.test(email))) ||
                customErrors.emailInUse
                  ? "is-invalid"
                  : ""
              }`}
              id="email"
              value={email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
            />
            {touched.email && (!email || !emailRegex.test(email)) && (
              <div className="invalid-feedback">
                {email === ""
                  ? "El correo es obligatorio."
                  : "Por favor, ingresa un correo válido."}
              </div>
            )}
            {customErrors.emailInUse && (
              <div className="invalid-feedback">
                Este correo ya está registrado.
              </div>
            )}
            <div id="emailHelp" className="form-text">
              No compartiremos tu correo electrónico con nadie más.
            </div>
          </div>

          {/* Contraseña */}
          <div className="mb-3">
            <label htmlFor="InputPassword" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className={`form-control ${
                isPasswordInvalid() ? "is-invalid" : ""
              }`}
              id="InputPassword"
              value={inputPassword}
              onChange={(e) =>
                handlePasswordChange("InputPassword", e.target.value)
              }
              onBlur={() => handleBlur("password")}
            />
            {isPasswordInvalid() && (
              <div className="invalid-feedback">
                La contraseña debe tener al menos 6 caracteres, una mayúscula,
                una minúscula, un número y un carácter especial.
              </div>
            )}
          </div>

          {/* Verificar contraseña */}
          <div className="mb-3">
            <label htmlFor="VerifyPassword" className="form-label">
              Verifica tu contraseña
            </label>
            <input
              type="password"
              className={`form-control ${
                touched.verifyPassword &&
                (!verifyPassword || verifyPassword !== inputPassword)
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
            {touched.verifyPassword && !verifyPassword && (
              <div className="invalid-feedback">
                Debes verificar tu contraseña.
              </div>
            )}
            {touched.verifyPassword &&
              verifyPassword &&
              verifyPassword !== inputPassword && (
                <div className="invalid-feedback">
                  Las contraseñas no coinciden.
                </div>
              )}
          </div>

          {/* Términos y condiciones */}
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className={`form-check-input ${
                touched.termsAccepted && !termsAccepted ? "is-invalid" : ""
              }`}
              id="TerminosCondiciones"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
              onBlur={() => handleBlur("termsAccepted")}
            />
            <label className="form-check-label" htmlFor="TerminosCondiciones">
              Acepto los términos y condiciones de Sohpons
            </label>
            {touched.termsAccepted && !termsAccepted && (
              <div className="invalid-feedback">
                Debes aceptar los términos y condiciones.
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Crear cuenta
          </button>
        </form>
        <p className="mt-3">
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

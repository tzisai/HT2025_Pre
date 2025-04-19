import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa"; // Icono de usuario
import { logoutUser } from "../firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseApp"; // Ajusta la ruta si es necesario
import "./NavBar.css"; 
import logo from "../assets/sophos_web.svg"; // Ajustá la ruta según tu estructura

function NavBar() {
  let navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de inicio de sesión

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe(); // Limpia el listener cuando se desmonta
  }, []);

  const handleOnClick = (text: string) => {
    navigate("/" + text);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsLoggedIn(false); // Actualiza el estado después de cerrar sesión
      navigate("/login");
    } catch (error) {
      console.error("Error cerrando sesión:", error);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-aspect">
        <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img
            src={logo}
            alt="Logo"
            className="logo-img"
          />
          <span className="ms-2">NovAureum</span>
        </a>


          {/* Botón de hamburguesa para colapsar en pantallas pequeñas */}
          <button
            className="navbar-toggler custom-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="toggler-bar"></span>
            <span className="toggler-bar"></span>
            <span className="toggler-bar"></span>
          </button>

          {/* Menú colapsable */}
          <div className="collapse navbar-collapse" id="navbarScroll">
            {/* Links de navegación */}
            <ul className="navbar-nav my-2 my-lg-0 navbar-nav-scroll">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active text-act" : "nav-link"
                  }
                  aria-current="page"
                  to="/"
                >
                  <div className="text-bt-nav">Home</div>
                </NavLink>
              </li>
              <li className="nav-item text-bt-nav">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active text-act" : "nav-link"
                  }
                  to="/about"
                >
                  About us
                </NavLink>
              </li>
              <li className="nav-item dropdown text-bt-nav">
                <a
                  className="nav-link"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Services
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "dropdown-item" : "dropdown-item"
                      }
                      to="/servicio1"
                    >
                      Nova-IA
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "dropdown-item text-primary" : "dropdown-item"
                      }
                      to="/servicio2"
                    >
                     CEFA
                    </NavLink>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "dropdown-item text-primary" : "dropdown-item"
                      }
                      to="/servicio3"
                    >
                      Service 3
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>

            {/* Botones a la derecha (login / cuenta / ícono) */}
            <div className="d-flex ms-auto flex-column flex-lg-row align-items-lg-center gap-2 mt-3 mt-lg-0">
              {!isLoggedIn ? (
                <>
                <div className="boton-container">
                  <button
                    className="btn boton-isa"
                    type="button"
                    onClick={() => handleOnClick("signup")}
                  >
                    Create Account
                  </button>
                  <button
                    className="btn boton-isa"
                    type="button"
                    onClick={() => handleOnClick("login")}
                  >
                    Log-in
                  </button>
                  </div>
                </>
              ) : (
                <div className="dropdown">
                  <button
                    className="btn btn-outline-secondary rounded-circle p-2"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ backgroundColor: "#f8f9fa" }}
                  >
                    <FaUserCircle size={30} />
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Cerrar sesión
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;

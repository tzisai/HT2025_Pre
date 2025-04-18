import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa"; // Icono de usuario
import { logoutUser } from "../firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseApp"; // Ajusta la ruta si es necesario

function NavBar() {
  let navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Aquí gestionamos el estado de inicio de sesión

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe(); // Limpia el listener cuando se desmonta
  }, []);

  let text = "";
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
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand">NovAureum</a>
          {/* Boton para colapsar la barra de navegacion para pantallas pequeñas*/}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* Barra de navegacion que se ve en pantalla grande */}
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active text-primary" : "nav-link"
                  }
                  aria-current="page"
                  to="/"
                >
                  Home {/* Pagina de inicio */}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active text-primary" : "nav-link"
                  }
                  to="/about"
                >
                  About us {/* Pagina de acerca de */}
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Services {/* Pagina de servicios, desplegado para verlos */}
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "dropdown-item text-primary"
                          : "dropdown-item"
                      }
                      to="/servicio1"
                    >
                      Service 1
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "dropdown-item text-primary"
                          : "dropdown-item"
                      }
                      to="/servicio2"
                    >
                      Service 2
                    </NavLink>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "dropdown-item text-primary"
                          : "dropdown-item"
                      }
                      to="/servicio3"
                    >
                      Service 3
                    </NavLink>
                  </li>
                </ul>
              </li>
              {!isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => handleOnClick("signup")}
                    >
                      Create Account {/* Pagina de crear cuenta */}
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => handleOnClick("login")}
                    >
                      Log-in {/* Pagina de inicio de sesion */}
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item dropdown">
                  <button
                    className="btn btn-outline-secondary rounded-circle p-2"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ backgroundColor: "#f8f9fa" }}
                  >
                    <FaUserCircle size={30} /> {/* Icono de usuario */}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Cerrar sesión
                      </button>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;

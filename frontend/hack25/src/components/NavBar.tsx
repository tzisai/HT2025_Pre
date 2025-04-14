import { Link, NavLink, useNavigate } from "react-router-dom";

function NavBar() {
  let navigate = useNavigate();
  let text = "";
  const handleOnClick = (text: string) => {
    navigate("/" + text);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand">NovAureum</a>
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
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;

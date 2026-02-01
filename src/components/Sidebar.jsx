import { Link, useNavigate, useLocation } from "react-router-dom";
import { getUsuario, logout } from "../services/auth";
import "./Sidebar.css";

function Sidebar() {
  const usuario = getUsuario();
  const navigate = useNavigate();
  const location = useLocation();

  function sair() {
    logout();
    navigate("/");
  }

  return (
    <aside className="gov-sidebar">
      <nav className="gov-sidebar-nav">
        <ul className="gov-sidebar-menu">
          <li>
            <Link
              to="/"
              className={
                location.pathname === "/"
                  ? "gov-menu-item active"
                  : "gov-menu-item"
              }
            >
              Acesso
            </Link>
          </li>

          <li>
            <Link
              to="/registro"
              className={
                location.pathname === "/registro"
                  ? "gov-menu-item active"
                  : "gov-menu-item"
              }
            >
              Registro
            </Link>
          </li>

          {usuario ? (
            <>
              <li>
                <Link
                  to="/painel"
                  className={
                    location.pathname === "/painel"
                      ? "gov-menu-item active"
                      : "gov-menu-item"
                  }
                >
                  Painel
                </Link>
              </li>

              <li>
                <button
                  onClick={sair}
                  className="gov-menu-item gov-menu-button"
                >
                  Encerrar sessão
                </button>
              </li>
            </>
          ) : null}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;

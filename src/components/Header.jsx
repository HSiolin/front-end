import { useState } from "react";
import "./Header.css";

function Header() {
  const [logoError, setLogoError] = useState(false);

  return (
    <header className="gov-header">
      <div className="gov-header-container">
        <div className="gov-header-brand">
          <div className="gov-logo">
          
              <div className="gov-logo-fallback">
                <span className="gov-logo-text">GOV.BR</span>
              </div>
         
          </div>
          <div className="gov-header-title">
            <h1>Sistema de Acessos</h1>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
  
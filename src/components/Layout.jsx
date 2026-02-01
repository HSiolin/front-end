import Header from "./Header";
import Sidebar from "./Sidebar";
import "./Layout.css";

function Layout({ children }) {
  return (
    <div className="gov-app">
      <Header />
      <div className="gov-main-container">
        <Sidebar />
        <main className="gov-main-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;

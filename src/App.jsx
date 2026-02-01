import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Acesso from "./pages/Acesso";
import Registro from "./pages/Registro";
import Painel from "./pages/Painel";

const PrivateRoute = ({ children }) => {
  return localStorage.getItem("user") ? children : <Navigate to="/" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Acesso />} />
        <Route path="/registro" element={<Registro />} />
        <Route
          path="/painel"
          element={
            <PrivateRoute>
              <Painel />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

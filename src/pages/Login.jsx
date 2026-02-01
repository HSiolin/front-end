import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/login", { email, senha });

      localStorage.setItem("user", response.data.email);
      toast.success("Login realizado com sucesso!");
      navigate("/painel");
    } catch (error) {
      toast.error(error.response?.data?.message || "Erro no login");
    }
  };

  return (
    <div>
      <h2>Acesso</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <button type="submit">Acessar</button>
      </form>
    </div>
  );
}

export default Login;

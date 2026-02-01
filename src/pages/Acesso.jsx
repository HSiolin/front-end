import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../services/api";
import { login } from "../services/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Acesso.css";

function Acesso() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  const [enviando, setEnviando] = useState(false);

  function atualizarCampo(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleLogin(e) {
    e.preventDefault();
    setEnviando(true);

    try {
      const { data } = await api.post("/login", form);

      if (!data.success) {
        toast.error("Credenciais inválidas.");
        return;
      }

      login(data.email);
      toast.success("Login realizado com sucesso!");

      setTimeout(() => {
        navigate("/painel");
      }, 1200);
    } catch (erro) {
      console.error("Erro no login:", erro);
      toast.error(erro.response?.data?.message || "Erro ao acessar o sistema.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <Layout>
      <ToastContainer />

      <div className="gov-page-container">
        <h1 className="gov-page-title">Acesso ao Sistema</h1>
        <p className="gov-page-subtitle">
          Informe suas credenciais para acessar o sistema
        </p>

        <form onSubmit={handleLogin} className="gov-form">
          <div className="gov-form-group">
            <label htmlFor="email" className="gov-form-label">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              className="gov-form-input"
              placeholder="seu.email@exemplo.gov.br"
              value={form.email}
              onChange={atualizarCampo}
              required
            />
          </div>

          <div className="gov-form-group">
            <label htmlFor="senha" className="gov-form-label">Senha</label>
            <input
              id="senha"
              name="senha"
              type="password"
              className="gov-form-input"
              placeholder="Digite sua senha"
              value={form.senha}
              onChange={atualizarCampo}
              required
            />
          </div>

          <button
            type="submit"
            className="gov-button gov-button-primary"
            disabled={enviando}
          >
            {enviando ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Acesso;

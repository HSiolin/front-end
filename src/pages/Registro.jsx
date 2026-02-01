import { useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Registro.css";

function Registro() {
  const [email, setEmail] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleRegistro(e) {
    e.preventDefault();
    setCarregando(true);

    try {
      const response = await api.post("/registrar", {
        email,
        dt_nascimento: dataNascimento,
        senha,
      });

      if (response.data.success) {
        toast.success(response.data.message || "Cadastro realizado com sucesso!");

        setEmail("");
        setDataNascimento("");
        setSenha("");
      } else {
        toast.error(response.data.message || "Não foi possível cadastrar.");
      }
    } catch (error) {
      console.error("Erro ao registrar:", error);
      toast.error(error.response?.data?.message || "Erro ao registrar usuário.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <Layout>
      <ToastContainer />

      <div className="gov-page-container">
        <h1 className="gov-page-title">Cadastro de Usuário</h1>
        <p className="gov-page-subtitle">
          Preencha os dados abaixo para criar sua conta
        </p>

        <form onSubmit={handleRegistro} className="gov-form">
          <div className="gov-form-group">
            <label htmlFor="email" className="gov-form-label">E-mail</label>
            <input
              id="email"
              type="email"
              className="gov-form-input"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="gov-form-group">
            <label htmlFor="dataNascimento" className="gov-form-label">
              Data de Nascimento
            </label>
            <input
              id="dataNascimento"
              type="date"
              className="gov-form-input"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              required
            />
          </div>

          <div className="gov-form-group">
            <label htmlFor="senha" className="gov-form-label">Senha</label>
            <input
              id="senha"
              type="password"
              className="gov-form-input"
              placeholder="Mínimo 6 caracteres"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            className="gov-button gov-button-primary"
            disabled={carregando}
          >
            {carregando ? "Registrando..." : "Registrar"}
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Registro;

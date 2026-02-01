import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Painel.css";

/**
 * Formata datas para pt-BR sem deixar o fuso bagunçar o dia
 */
function formatarDataBR(data) {
  if (!data) return "";

  if (typeof data === "string" && data.includes("/")) return data;

  const [ano, mes, dia] = data.split("T")[0].split("-");
  if (ano && mes && dia) return `${dia}/${mes}/${ano}`;

  return new Date(`${data}T12:00:00`).toLocaleDateString("pt-BR");
}

function Painel() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarUsuarios() {
      try {
        const { data } = await api.get("/usuarios");

        if (data.success) {
          setUsuarios(data.data);
        } else {
          toast.warning("Não foi possível obter os usuários.");
        }
      } catch (erro) {
        console.error("Erro ao buscar usuários:", erro);
        toast.error("Erro ao carregar lista de usuários.");
      } finally {
        setCarregando(false);
      }
    }

    buscarUsuarios();
  }, []);

  return (
    <Layout>
      <ToastContainer />

      <div className="gov-page-container">
        <h1 className="gov-page-title">Painel de Usuários</h1>
        <p className="gov-page-subtitle">
          Lista de usuários cadastrados no sistema
        </p>

        {carregando ? (
          <div className="gov-loading">Carregando dados...</div>
        ) : (
          <div className="gov-table-container">
            <table className="gov-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>E-mail</th>
                  <th>Data de Nascimento</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="gov-table-empty">
                      Nenhum usuário cadastrado no momento
                    </td>
                  </tr>
                ) : (
                  usuarios.map((usuario) => (
                    <tr key={usuario.id}>
                      <td>{usuario.id}</td>
                      <td>{usuario.email}</td>
                      <td>{formatarDataBR(usuario.dt_nascimento)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Painel;

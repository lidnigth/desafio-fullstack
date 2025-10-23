import { useEffect, useState } from "react";
import TarefaForm from "./components/TarefaForm";
import TarefasList from "./components/TarefasList";
import "./App.css";

const API_URL = "http://localhost:3000/tarefas";

function App() {
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setTarefas(data))
      .catch((err) => console.error("Erro ao buscar tarefas:", err));
  }, []);

  const adicionarTarefa = async (nome) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome }),
    });
    const novaTarefa = await res.json();
    setTarefas([...tarefas, novaTarefa]);
  };

  const deletarTarefa = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
  };

  const editarTarefa = async (id, nome) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome }),
    });
    const tarefaAtualizada = await res.json();
    setTarefas(
      tarefas.map((tarefa) => (tarefa.id === id ? tarefaAtualizada : tarefa))
    );
  };

  return (
    <div>
      <h1 className="title">Lista de Tarefas</h1>
      <div className="container">
        <TarefaForm onAdd={adicionarTarefa} />
        <TarefasList
          tarefas={tarefas}
          onDeletar={deletarTarefa}
          onEditar={editarTarefa}
        />
      </div>
    </div>
  );
}

export default App;

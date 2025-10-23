import { useState } from "react";

function TarefaForm({ onAdd }) {
  const [nome, setNome] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome.trim()) {
      alert("Preencha o nome da tarefa.");
      return;
    }

    onAdd(nome);
    setNome("");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Digite uma tarefa"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="input"
      />
      <button type="submit" className="add">
        Adicionar
      </button>
    </form>
  );
}

export default TarefaForm;

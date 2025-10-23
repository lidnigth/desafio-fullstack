import { Trash2, Pencil } from "lucide-react";

function TarefasList({ tarefas, onDeletar, onEditar }) {
  return (
    <ul className="ul">
      {tarefas.map((tarefa) => (
        <li key={tarefa.id} className="li">
          <span className="listinha">{tarefa.nome}</span>
          <div className="botoes">
            <button
              className="button"
              onClick={() => {
                const onEdit = prompt("Novo nome:", tarefa.nome);
                if (onEdit === null) return;
                const nome = onEdit.trim();
                if (nome === "") return;
                onEditar(tarefa.id, nome);
              }}
            >
              <Pencil size={16} />
            </button>
            <button className="button" onClick={() => onDeletar(tarefa.id)}>
              <Trash2 size={16} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TarefasList;

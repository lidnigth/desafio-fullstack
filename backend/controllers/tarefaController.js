const tarefaService = require("../services/tarefaService");

function getTarefas(req, res) {
  tarefaService.listarTarefas((err, rows) => {
    if (err) return res.status(500).json({ error: "Erro ao buscar tarefas" });
    res.json(rows);
  });
}

function postTarefa(req, res) {
  const { nome } = req.body;

  if (!nome || typeof nome !== "string" || nome.trim() === "") {
    return res.status(400).json({ error: "O nome da tarefa é obrigatório" });
  }

  const dataCriacao = new Date().toISOString();
  tarefaService.inserirTarefa(nome.trim(), dataCriacao, (err, tarefaCriada) => {
    if (err) return res.status(500).json({ error: "Erro ao inserir tarefa" });
    res.status(201).json(tarefaCriada);
  });
}

function deleteTarefa(req, res) {
  const { id } = req.params;

  tarefaService.deletarTarefa(id, (err, changes) => {
    if (err) return res.status(500).json({ error: "Erro ao deletar tarefa" });

    if (changes === 0) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }

    res.json({ message: `Tarefa ${id} deletada com sucesso` });
  });
}

module.exports = { getTarefas, postTarefa, deleteTarefa };
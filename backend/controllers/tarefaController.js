const tarefaService = require("../services/tarefaService");

async function getTarefas(req, res) {
  try {
    const rows = await tarefaService.listarTarefas;
    res.json(rows);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar tarefas" });
  }
}

async function postTarefa(req, res) {
  try {
    const { nome } = req.body;

    if (!nome || typeof nome !== "string" || nome.trim() === "") {
      return res.status(400).json({ error: "O nome da tarefa é obrigatório" });
    }

    const dataCriacao = new Date().toISOString();
    const tarefaCriada = await tarefaService.inserirTarefa(
      nome.trim(),
      dataCriacao
    );
    return res.status(201).json(tarefaCriada);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao inserir tarefa" });
  }
}

async function deleteTarefa(req, res) {
  try {
    const { id } = req.params;
    const changes = await tarefaService.deletarTarefa(id);
    if (changes === 0) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }
    res.json({ message: `Tarefa ${id} deletada com sucesso` });
  } catch (err) {
    return res.status(500).json({ error: "Erro ao deletar tarefa" });
  }
}

async function putTarefa(req, res) {
  try {
    const { nome } = req.body;
    const { id } = req.params;
    if (!nome || typeof nome !== "string" || nome.trim() === "") {
      return res.status(400).json({ error: "O nome da tarefa é obrigatório" });
    }

    const tarefaAtualizada = await tarefaService.atualizarTarefa(
      id,
      nome.trim()
    );
    return res.status(200).json(tarefaAtualizada);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao atualizar tarefa" });
  }
}

module.exports = { getTarefas, postTarefa, deleteTarefa, putTarefa };

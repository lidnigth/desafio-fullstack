const db = require("../database");

function listarTarefas(callback) {
  db.all("SELECT * FROM tarefas", callback);
}

function inserirTarefa(nome, dataCriacao, callback) {
  db.run(
    "INSERT INTO tarefas (nome, dataCriacao) VALUES (?, ?)",
    [nome, dataCriacao],
    function (err) {
      if (err) return callback(err);
      
      callback(null, { id: this.lastID, nome, dataCriacao });
    }
  );
}

function deletarTarefa(id, callback) {
  db.run("DELETE FROM tarefas WHERE id = ?",
    [id],
    function (err) {
    if (err) return callback(err);
    if (this.changes === 0) {
      return callback(new Error("Tarefa não encontrada"));
    }
    callback(null, { id });
  });
}

function atualizarTarefa(id, nome, callback) {
  db.run(
    "UPDATE tarefas SET nome = ? WHERE id = ?",
    [nome, id],
    function (err) {
      if (err) return callback(err)

      if (this.changes === 0) {
        return callback(new Error("Tarefa não encontrada"));
      }

      callback(null, { id, nome });
    }
  );
}

module.exports = { listarTarefas, inserirTarefa, deletarTarefa, atualizarTarefa };
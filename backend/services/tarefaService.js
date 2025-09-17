const db = require("../database");

function listarTarefas(callback) {
  db.all("SELECT * FROM tarefas", callback);
}

function inserirTarefa(nome, dataCriacao, callback) {
  db.run(
    "INSERT INTO tarefas (nome, dataCriacao) VALUES (?, ?)",
    [nome, dataCriacao],
    function (err) {
      callback(err, { id: this.lastID, nome, dataCriacao });
    }
  );
}

function deletarTarefa(id, callback) {
  db.run("DELETE FROM tarefas WHERE id = ?", [id], function (err) {
    callback(err, this.changes);
  });
}

module.exports = { listarTarefas, inserirTarefa, deletarTarefa };
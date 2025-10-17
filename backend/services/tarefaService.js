const db = require("../database");

function listarTarefas(req, res) {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM tarefas", (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function inserirTarefa(nome, dataCriacao) {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO tarefas (nome, dataCriacao) VALUES (?, ?)",
      [nome, dataCriacao],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, nome, dataCriacao });
      }
    );
  });
}

function deletarTarefa(id) {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM tarefas WHERE id = ?", [id], function (err) {
      if (err) reject(err);
      else resolve(this.changes);
    });
  });
}

function atualizarTarefa(id, nome) {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE tarefas SET nome = ? WHERE id = ?",
      [nome, id],
      function (err) {
        if (this.changes === 0) resolve(null);
        else resolve({ id, nome });
      }
    );
  });
}

module.exports = {
  listarTarefas,
  inserirTarefa,
  deletarTarefa,
  atualizarTarefa,
};

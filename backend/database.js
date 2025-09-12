const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./tarefas.db");

db.serialize(() => {
    db.run (`
        CREATE TABLE IF NOT EXISTS tarefas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            dataCriacao TEXT NOT NULL
    )
    `, (err) => {
        if (err) {
        console.log("Erro ao criar tabela:", err.message);
        } else {
            console.log("Tabela 'tarefas' pronta!");
        }
    });
});

module.exports = db;
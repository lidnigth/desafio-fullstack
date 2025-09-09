const express = require("express");
const cors = require("cors");

const app = express();
const db = require("./database.js");

function inserirTarefa(nome) {
    const data = new Date().toISOString();
    db.run(
        `INSERT INTO tarefas (nome, dataCriacao) VALUES (?, ?),`
        [nome, data],
        function(err) {
            if (err) {
                console.log("Erro ao inserir tarefa:", err.message);
            } else {
                console.log(`Tarefa inserida com id ${this.lastID}`);
            }
        }
    );
}

function listarTarefas() {
    db.all("SELECT * FROM tarefas", (err, rows) => {
        if (err) {
            console.log("Erro ao listar tarefas:", err.message);
        } else {
            console.log("Tarefas cadastradas:", rows);
        }
    });
}

// inserirTarefa("Minha primeira tarefa");
// listarTarefas();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
res.send("Deu certo? Se sim, to aparecendo");
});

app.listen(PORT, () => {
console.log(`Servidor rodando em http://localhost:${PORT}`);
})
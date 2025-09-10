const express = require("express");
const cors = require("cors");

const app = express();
const db = require("./database.js");

function inserirTarefa(nome) {
    const data = new Date().toLocaletring("pt-BR", { timeZone: "America/Fortaleza" });
    db.run(
        `INSERT INTO tarefas (nome, dataCriacao) VALUES (?, ?)`,
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

app.get("/tarefas", (req, res) => {
    db.all("SELECT * FROM tarefas", (err, rows) => {
        if (err) {
            console.log("Erro ao buscar tarefas: ", err.message);
            res.status(500).json({error: "Erro ao buscar tarefas"});
        } else {
            res.json(rows);
        }
    });
});

app.post("/tarefas", (req, res) => {
    const { nome } = req.body;
    
    if (!nome || typeof nome!== "string" || nome.trim() === "") {
        return res.status(400).json({ error: "O nome da tarefa é obrigatório" });
    }
    
    const dataCriacao = new Date().toISOString("pt-BR", { timeZone: "America/Fortaleza" });

    db.run(`
        INSERT INTO tarefas (nome, dataCriacao) VALUES (?, ?)`,
        [nome.trim(), dataCriacao],
        function(err) {
            if (err) {
                console.error("Erro ao inserir tarefa: ", err.message);
                return res.status(500).json({ error: "Erro ao inserir tarefa" });
            }

            const tarefaCriada = { id: this.lastID, nome: nome.trim(), dataCriacao }
            return res.status(201).json(tarefaCriada);
        });
    });

app.delete("/tarefas/id:", (req, res) => {
    const { id } = req.params;

    db.run("DELETE FROM tarefas WHERE id = ?", [id],
        function(err) {
            if (err) {
                console.error("Erro ao deletar tarefa: ", err.message);
                return res.status(500).json({ error: "Erro ao deletar tarefa" });
            }

            if (this.changes === 0) {
                return res.status(404).json({ error: "Tarefa não encontrada" });
            }

            res.json({ message: `Tarefa ${id} deletada com sucesso` });
        });
});

app.listen(PORT, () => {
console.log(`Servidor rodando em http://localhost:${PORT}`);
});
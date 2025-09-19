const API_URL = "http://localhost:3000/tarefas";

const but = document.getElementById("butAdicionar");
const input = document.getElementById("tarefasInput");
const lista = document.getElementById("listaTarefas");

function carregarTarefas() {
    lista.innerHTML = "";

    fetch(API_URL)
    .then(res => res.json())
    .then(tarefas => {

        tarefas.forEach(tarefa => {
            const li = document.createElement("li");
            li.textContent = tarefa.nome;

            const butDel = document.createElement("button");
            butDel.textContent = "Excluir";

            butDel.onclick = function () {
                deletarTarefa(tarefa.id);
            };

            li.appendChild(butDel);
            lista.appendChild(li);
        });
    });
}

but.onclick = function () {
    const nome = input.value.trim();
    if (!nome) return;

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify ({ nome: nome })   
    }) .then(() => {
        input.value = "";
        carregarTarefas();
    });
}

function deletarTarefa(id) {
    fetch(API_URL + "/" + id, { method: "DELETE" })
    .then(() => carregarTarefas());
}

carregarTarefas();
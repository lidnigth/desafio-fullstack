const API_URL = "http://localhost:3000/tarefas";

const but = document.getElementById("butAdicionar");
const input = document.getElementById("tarefasInput");
const lista = document.getElementById("listaTarefas");

function carregarTarefas() {
  lista.innerHTML = "";

  fetch(API_URL)
    .then((res) => res.json())
    .then((tarefas) => {
      tarefas.forEach((tarefa) => {
        const li = document.createElement("li");
        const dataBonita = new Date(tarefa.dataCriacao).toLocaleString("pt-BR");
        li.textContent = tarefa.nome + " - " + dataBonita;

        const butDel = document.createElement("button");
        butDel.textContent = "Excluir";
        butDel.className = "but-excluir";
        butDel.onclick = function () {
          deletarTarefa(tarefa.id);
        };

        const butEdi = document.createElement("button");
        butEdi.textContent = "Editar";
        butEdi.className = "but-editar";
        butEdi.onclick = function () {
          const newNome = prompt("Digite a nova tarefa:", tarefa.nome);
          if (!newNome) return;
          atualizarTarefa(tarefa.id, newNome);
        };

        li.appendChild(butEdi);
        li.appendChild(butDel);
        lista.appendChild(li);

        const divAcoes = document.createElement("div");
        divAcoes.appendChild(butEdi);
        divAcoes.appendChild(butDel);

        li.appendChild(divAcoes);
      });
    });
}

but.onclick = function () {
  const nome = input.value.trim();
  if (!nome) return;

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome: nome }),
  }).then(() => {
    input.value = "";
    carregarTarefas();
  });
};

function deletarTarefa(id) {
  fetch(API_URL + "/" + id, { method: "DELETE" }).then(() => carregarTarefas());
}

function atualizarTarefa(id, newNome) {
  fetch(API_URL + "/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome: newNome }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Erro ao atualizar tarefa");
      return res.json();
    })
    .then(() => carregarTarefas())
    .catch((err) => console.error("Erro ao atualizar:", err));
}

carregarTarefas();

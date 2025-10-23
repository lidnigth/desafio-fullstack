# Desafio Fullstack - Lista de tarefas

Aplicação simples de uma lista de tarefas utilizando as seguintes tecnologias: **Node.js + Express + SQLite3** no backend e **React + CSS** no frontend.

## Como rodar o projeto localmente pelo terminal:

1. Clonar o repositório
   `git clone https://github.com/lidnigth/desafio-fullstack.git`
   `cd desafio-fullstack`

2. Instalar dependências backend (node_modules)
   `cd backend`
   `npm install`

3. Rodar servidor
   `npx nodemon server.js`, `npm start` ou `node server.js`
   O servidor rodará em: http://localhost:3000 (+ /tarefas)

4. Instalar dependências do frontend
   `cd frontend`
   `npm install`

5. Rodar frontend
   `npm start`
   O React iniciará em: https://localhost:3003

## Banco de Dados (SQLite):

- O arquivo tarefas.bd é criado automaticamente ao iniciar o backend
- A tabela tarefas é criada caso não exista
- Não é necessário rodar comandos SQL manuais

## Rotas da API:

GET /tarefas -> lista todas as tarefas
POST /tarefas -> adiciona uma nova tarefa
PUT /tarefas/:id -> atualiza o nome de uma tarefa
DELETE /tarefas/:id -> deleta uma tarefa

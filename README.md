# Desafio Fullstack - Lista de tarefas

Aplicação simples de uma lista de tarefas utilizando as seguintes tecnologias: **Node.js + Express + SQLite3** no backend e **HTML + CSS + JS** no frontend.

## Como rodar o projeto localmente pelo terminal:

1. Clonar o repositório
`git clone https://github.com/lidnigth/desafio-fullstack.git`
`cd desafio-fullstack`

2. Instalar dependências (node_modules)
`cd backend`
`npm install`

3. Rodar servidor
`npx nodemon server.js` ou `npm start` (se tiver postman) ou
`node server.js`
O servidor rodará em: http://localhost:3000 (+ /tarefas)

4. Abrir o frontend
Abrir o arquivo html (frontend/index.html) no navegador (pode ser por meio da extensão Live Server do VSCode - Open with Live Server)

## Observações adicionais e sobre a configuração do Banco de Dados:

- O projeto usa **SQLite3**
- Ao rodar o backend, o arquivo tarefas.bd será criado automaticamente
- A tabela tarefas é criado caso não exista
- Portanto, não é necessário comandos adicionais
- A API possui quatro rotas: GET /tarefas, POST /tarefas, DELETE /tarefas/:id e PUT /tarefas/:id

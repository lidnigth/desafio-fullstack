const express = require("express");
const cors = require("cors");

const app = express();
const tarefaRoutes = require("./routes/tarefaRoutes");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Foi?"));

app.use("/tarefas", tarefaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
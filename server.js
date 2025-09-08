const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
res.send("Deu certo? Se sim, to aparecendo");
});

app.listen(PORT, () => {
console.log(`Servidor rodando em http://localhost:${PORT}`);
})
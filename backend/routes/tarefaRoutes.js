const express = require("express");
const router = express.Router();
const tarefaController = require("../controllers/tarefaController");

router.get("/", tarefaController.getTarefas);
router.post("/", tarefaController.postTarefa);
router.delete("/:id", tarefaController.deleteTarefa);
router.put("/:id", tarefaController.putTarefa);

module.exports = router;
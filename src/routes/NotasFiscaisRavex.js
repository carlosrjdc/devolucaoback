const express = require("express");
const NotasFiscaisRavexController = require("../../controllers/NotasFiscaisRavexController.js");

const router = express.Router();

//READ
router.post("/notasfiscais/:data", NotasFiscaisRavexController.inputDadosGeral);
router.put(
  "/atualizarnotafiscal/:id",
  NotasFiscaisRavexController.atualizarDados
);
router.get("/buscarnfsemaberto", NotasFiscaisRavexController.buscarDados);
router.get("/buscarnfs/:id", NotasFiscaisRavexController.buscarNotas);
router.get("/parcial/:id/:nf", NotasFiscaisRavexController.notasParciais);
router.delete("/deletarnf/:id", NotasFiscaisRavexController.deletarRegistro);

module.exports = router;

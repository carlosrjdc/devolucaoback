const express = require("express");
const ConferenciaController = require("../../controllers/ConferenciaController.js");

const router = express.Router();

//READ
router.post("/itensconferencia/:id/:nf", ConferenciaController.buscarProdutos);
router.get("/nfporviagem/:id", ConferenciaController.relacionarNotas);

module.exports = router;

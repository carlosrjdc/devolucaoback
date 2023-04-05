const express = require("express");
const DemandaController = require("../../controllers/DemandaController.js");

const router = express.Router();

//READ
router.post("/cadastrarDemanda", DemandaController.cadastrarDemanda);
router.post(
  "/cadastrarDemandanova/:id/:nf/:demanda",
  DemandaController.cadastrarProdutos
);
router.get(
  "/buscardemandasnaofinalizada",
  DemandaController.buscarDemandasEmAberto
);

router.get("/buscarid/:id", DemandaController.buscarDemandaporId);
router.get("/buscarreferencia/:id/:nf", DemandaController.buscarReferencia);
router.get("/demandaagrupada/:id", DemandaController.buscarDemandaagrupada);
router.put("/atualizardemanda/:id", DemandaController.atualizarDados);
router.get("/verificar/:id/:nf", DemandaController.buscarItens);

module.exports = router;
